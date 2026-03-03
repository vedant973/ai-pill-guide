import { useState, useCallback, useRef } from "react";
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
import { PrescriptionReport } from "@/components/PrescriptionReport";
import { Button } from "@/components/ui/button";
import { findMedicine, type Medicine } from "@/data/medicineDatabase";
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
  sideEffects?: string[];
  overdoseEffects?: string[];
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
  const reportRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleDownloadReport = () => {
    if (!reportRef.current) return;
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Prescription Analysis Report</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            body { margin: 0; padding: 0; font-family: sans-serif; }
            @media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }
          </style>
        </head>
        <body>${reportRef.current.innerHTML}</body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 500);
  };

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

      // Call the AI edge function via direct fetch
      const fnUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/analyze-prescription`;
      const fnKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

      let result: AIAnalysisResult;
      try {
        const response = await fetch(fnUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${fnKey}`,
            "apikey": fnKey,
          },
          body: JSON.stringify({ imageBase64 }),
        });

        if (!response.ok) {
          const errBody = await response.json().catch(() => ({}));
          throw new Error(errBody.error || `Server error: ${response.status}`);
        }

        result = await response.json();
      } catch (fetchErr) {
        clearInterval(stageInterval);
        console.error("Edge function error:", fetchErr);
        toast({
          title: "Analysis Failed",
          description: fetchErr instanceof Error ? fetchErr.message : "Failed to analyze the prescription. Please try again.",
          variant: "destructive",
        });
        setCurrentStep(1);
        setIsProcessing(false);
        return;
      }

      clearInterval(stageInterval);
      setProcessingStage(4);

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
        title: "Analysis Failed",
        description: err instanceof Error ? err.message : "An unexpected error occurred. Please try again.",
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
                  <div className="max-w-3xl mx-auto space-y-6">
                    <h2 className="text-xl font-semibold text-center">Additional Medicines</h2>
                    {aiMedicines
                      .filter(m => !medicineResults.find(r => r.medicine.name.toLowerCase() === m.name.toLowerCase()))
                      .map((med, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="rounded-2xl border bg-card shadow-card overflow-hidden"
                        >
                          {/* Header */}
                          <div className="p-6 pb-4">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex items-start gap-4">
                                <div className="flex h-14 w-14 items-center justify-center rounded-xl gradient-medical shrink-0">
                                  <svg className="h-7 w-7 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                                </div>
                                <div>
                                  <h3 className="text-xl font-bold">{med.name}</h3>
                                  <p className="text-sm text-muted-foreground">
                                    {med.dosage && `${med.dosage}`}{med.frequency && ` • ${med.frequency}`}{med.duration && ` • ${med.duration}`}
                                  </p>
                                  <span className="inline-block mt-2 px-3 py-1 text-xs font-medium rounded-full bg-secondary text-secondary-foreground">
                                    AI Extracted
                                  </span>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-sm text-muted-foreground">Confidence</div>
                                <div className={`text-lg font-bold ${med.confidence >= 80 ? "text-success" : med.confidence >= 60 ? "text-warning" : "text-destructive"}`}>
                                  {med.confidence}%
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Side Effects — always shown */}
                          <div className="mx-6 mb-6 grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="p-4 rounded-xl bg-warning/10 border border-warning/30">
                              <h4 className="font-medium flex items-center gap-2 mb-2 text-warning">
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                Common Side Effects
                              </h4>
                              {med.sideEffects && med.sideEffects.length > 0 ? (
                                <ul className="text-sm space-y-1">
                                  {med.sideEffects.map((effect, i) => (
                                    <li key={i} className="flex items-center gap-2 text-foreground">
                                      <span className="h-1.5 w-1.5 rounded-full bg-warning shrink-0" />
                                      {effect}
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                <p className="text-sm text-muted-foreground italic">Side effects data not available for this medicine.</p>
                              )}
                            </div>
                            <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/30">
                              <h4 className="font-medium flex items-center gap-2 mb-2 text-destructive">
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                Overdose / Overuse Effects
                              </h4>
                              {med.overdoseEffects && med.overdoseEffects.length > 0 ? (
                                <ul className="text-sm space-y-1">
                                  {med.overdoseEffects.map((effect, i) => (
                                    <li key={i} className="flex items-center gap-2 text-foreground">
                                      <span className="h-1.5 w-1.5 rounded-full bg-destructive shrink-0" />
                                      {effect}
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                <p className="text-sm text-muted-foreground italic">Overdose effects data not available for this medicine.</p>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                  </div>
                )}

                {/* Hidden Printable Report */}
                <div className="hidden">
                  <PrescriptionReport
                    ref={reportRef}
                    medicineResults={medicineResults}
                    aiMedicines={aiMedicines}
                    rawText={extractedData?.rawText || ""}
                    scanDate={new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                  />
                </div>

                {/* Actions */}
                <div className="flex flex-wrap justify-center gap-4">
                  <Button variant="outline" onClick={reset}>
                    <RotateCcw className="h-4 w-4" />
                    Scan Another
                  </Button>
                  <Button variant="medical" onClick={handleDownloadReport}>
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
