import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Download, RotateCcw } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StepIndicator } from "@/components/StepIndicator";
import { UploadZone } from "@/components/UploadZone";
import { ProcessingLoader } from "@/components/ProcessingLoader";
import { ExtractedTextPreview } from "@/components/ExtractedTextPreview";
import { MedicineCard } from "@/components/MedicineCard";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { Button } from "@/components/ui/button";
import { findMedicine, type Medicine } from "@/data/medicineDatabase";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const steps = [
  { number: 1, title: "Upload" },
  { number: 2, title: "Processing" },
  { number: 3, title: "Results" },
];

interface ExtractedItem {
  text: string;
  type: "medicine" | "dosage" | "frequency" | "duration" | "other";
  confidence: number;
}

interface MedicineResult {
  medicine: Medicine;
  extractedDosage?: string;
  extractedFrequency?: string;
  extractedDuration?: string;
  confidence: number;
}

interface AIExtractedMedicine {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  confidence: number;
}

interface AIAnalysisResult {
  medicines: AIExtractedMedicine[];
  rawText: string;
  overallConfidence: number;
}

// Convert file to base64
function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function ScanPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [processingStage, setProcessingStage] = useState(0);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [extractedData, setExtractedData] = useState<{
    items: ExtractedItem[];
    rawText: string;
  } | null>(null);
  const [medicineResults, setMedicineResults] = useState<MedicineResult[]>([]);
  const [aiMedicines, setAiMedicines] = useState<AIExtractedMedicine[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleImageUpload = useCallback((file: File) => {
    setUploadedFile(file);
  }, []);

  const processImage = async () => {
    if (!uploadedFile) return;

    setIsProcessing(true);
    setCurrentStep(2);
    setProcessingStage(0);

    try {
      // Convert image to base64
      const imageBase64 = await fileToBase64(uploadedFile);

      // Animate through stages while API processes
      const stageInterval = setInterval(() => {
        setProcessingStage((prev) => Math.min(prev + 1, 3));
      }, 1500);

      // Call the AI edge function
      const { data, error } = await supabase.functions.invoke('analyze-prescription', {
        body: { imageBase64 }
      });

      clearInterval(stageInterval);
      setProcessingStage(4);

      if (error) {
        console.error("Error analyzing prescription:", error);
        toast({
          title: "Analysis Failed",
          description: error.message || "Failed to analyze the prescription. Please try again.",
          variant: "destructive",
        });
        setCurrentStep(1);
        setIsProcessing(false);
        return;
      }

      const result = data as AIAnalysisResult;
      
      if (!result || !result.medicines) {
        toast({
          title: "No Medicines Found",
          description: "Could not extract any medicines from the prescription. Please try a clearer image.",
          variant: "destructive",
        });
        setCurrentStep(1);
        setIsProcessing(false);
        return;
      }

      // Store AI-extracted medicines
      setAiMedicines(result.medicines);

      // Convert AI result to extracted items format
      const items: ExtractedItem[] = [];
      result.medicines.forEach((med) => {
        items.push({ text: med.name, type: "medicine", confidence: med.confidence });
        if (med.dosage) items.push({ text: med.dosage, type: "dosage", confidence: med.confidence });
        if (med.frequency) items.push({ text: med.frequency, type: "frequency", confidence: med.confidence });
        if (med.duration) items.push({ text: med.duration, type: "duration", confidence: med.confidence });
      });

      setExtractedData({
        items,
        rawText: result.rawText || "Prescription text extracted successfully."
      });

      // Match with database for additional info
      const medicines: MedicineResult[] = [];
      result.medicines.forEach((aiMed) => {
        const found = findMedicine(aiMed.name);
        if (found) {
          medicines.push({
            medicine: found,
            extractedDosage: aiMed.dosage,
            extractedFrequency: aiMed.frequency,
            extractedDuration: aiMed.duration,
            confidence: aiMed.confidence,
          });
        }
      });

      setMedicineResults(medicines);
      setCurrentStep(3);

      toast({
        title: "Analysis Complete",
        description: `Found ${result.medicines.length} medicine(s) in your prescription.`,
      });

    } catch (err) {
      console.error("Error processing image:", err);
      toast({
        title: "Processing Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      setCurrentStep(1);
    } finally {
      setIsProcessing(false);
    }
  };

  const reset = () => {
    setCurrentStep(1);
    setProcessingStage(0);
    setUploadedFile(null);
    setExtractedData(null);
    setMedicineResults([]);
    setAiMedicines([]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 py-8 md:py-12">
        <div className="container mx-auto px-4">
          {/* Step Indicator */}
          <div className="mb-8">
            <StepIndicator steps={steps} currentStep={currentStep} />
          </div>

          <AnimatePresence mode="wait">
            {/* Step 1: Upload */}
            {currentStep === 1 && (
              <motion.div
                key="upload"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="text-center max-w-2xl mx-auto">
                  <h1 className="text-3xl md:text-4xl font-bold mb-4">
                    Upload Your Prescription
                  </h1>
                  <p className="text-muted-foreground">
                    Take a clear photo or upload an image of your handwritten
                    medical prescription. Our AI will analyze and extract the
                    medicine information.
                  </p>
                </div>

                <UploadZone onImageUpload={handleImageUpload} />

                {uploadedFile && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-center"
                  >
                    <Button
                      variant="medical"
                      size="lg"
                      onClick={processImage}
                      disabled={isProcessing}
                    >
                      Analyze Prescription
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </motion.div>
                )}

                <div className="max-w-2xl mx-auto">
                  <DisclaimerBanner />
                </div>
              </motion.div>
            )}

            {/* Step 2: Processing */}
            {currentStep === 2 && (
              <motion.div
                key="processing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <ProcessingLoader currentStage={processingStage} />
              </motion.div>
            )}

            {/* Step 3: Results */}
            {currentStep === 3 && (
              <motion.div
                key="results"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="text-center max-w-2xl mx-auto">
                  <h1 className="text-3xl md:text-4xl font-bold mb-4">
                    Medicine Analysis Results
                  </h1>
                  <p className="text-muted-foreground">
                    We identified {aiMedicines.length} medicine(s) from your
                    prescription. {medicineResults.length > 0 && `${medicineResults.length} matched with our database for detailed information.`}
                  </p>
                </div>

                <div className="max-w-3xl mx-auto">
                  <DisclaimerBanner />
                </div>

                {/* Extracted Text Summary */}
                {extractedData && (
                  <div className="max-w-3xl mx-auto">
                    <ExtractedTextPreview
                      items={extractedData.items}
                      rawText={extractedData.rawText}
                    />
                  </div>
                )}

                {/* Medicine Cards - Show database matches */}
                {medicineResults.length > 0 && (
                  <div className="max-w-3xl mx-auto space-y-6">
                    <h2 className="text-xl font-semibold text-center">Detailed Medicine Information</h2>
                    {medicineResults.map((result, index) => (
                      <MedicineCard
                        key={index}
                        medicine={result.medicine}
                        extractedDosage={result.extractedDosage}
                        extractedFrequency={result.extractedFrequency}
                        confidence={result.confidence}
                        index={index}
                      />
                    ))}
                  </div>
                )}

                {/* Show AI-extracted medicines not in database */}
                {aiMedicines.filter(m => !medicineResults.find(r => r.medicine.name.toLowerCase() === m.name.toLowerCase())).length > 0 && (
                  <div className="max-w-3xl mx-auto">
                    <h3 className="text-lg font-medium text-center text-muted-foreground mb-4">
                      Additional Medicines (Not in Database)
                    </h3>
                    <div className="space-y-4">
                      {aiMedicines
                        .filter(m => !medicineResults.find(r => r.medicine.name.toLowerCase() === m.name.toLowerCase()))
                        .map((med, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="p-4 rounded-xl border bg-card"
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-semibold">{med.name}</h4>
                                <p className="text-sm text-muted-foreground">
                                  {med.dosage && `${med.dosage} • `}
                                  {med.frequency && `${med.frequency} • `}
                                  {med.duration && med.duration}
                                </p>
                              </div>
                              <span className="text-sm text-muted-foreground">
                                {med.confidence}% confidence
                              </span>
                            </div>
                          </motion.div>
                        ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex flex-wrap justify-center gap-4">
                  <Button variant="outline" onClick={reset}>
                    <RotateCcw className="h-4 w-4" />
                    Scan Another
                  </Button>
                  <Button variant="medical">
                    <Download className="h-4 w-4" />
                    Download Report
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </div>
  );
}
