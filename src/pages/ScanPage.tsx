import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Download, RotateCcw } from "lucide-react";
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

const steps = [
  { number: 1, title: "Upload" },
  { number: 2, title: "Extracted Text" },
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
  confidence: number;
}

// Simulated OCR extraction (would be replaced with actual AI backend call)
function simulateOCR(): Promise<{ items: ExtractedItem[]; rawText: string }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        items: [
          { text: "Paracetamol", type: "medicine", confidence: 92 },
          { text: "500mg", type: "dosage", confidence: 88 },
          { text: "Twice daily", type: "frequency", confidence: 85 },
          { text: "Amoxicillin", type: "medicine", confidence: 89 },
          { text: "250mg", type: "dosage", confidence: 91 },
          { text: "Three times daily", type: "frequency", confidence: 82 },
          { text: "5 days", type: "duration", confidence: 78 },
          { text: "Omeprazole", type: "medicine", confidence: 86 },
          { text: "20mg", type: "dosage", confidence: 90 },
          { text: "Before breakfast", type: "other", confidence: 75 },
        ],
        rawText: `Rx

Patient: John Doe
Date: 15/01/2026

1. Tab. Paracetamol 500mg
   - Twice daily for fever
   - After food

2. Cap. Amoxicillin 250mg
   - Three times daily
   - For 5 days
   - With water

3. Tab. Omeprazole 20mg
   - Once daily
   - Before breakfast

Dr. Smith
Reg. No: 12345`,
      });
    }, 500);
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

  const handleImageUpload = useCallback((file: File) => {
    setUploadedFile(file);
  }, []);

  const processImage = async () => {
    if (!uploadedFile) return;

    // Start processing animation
    setCurrentStep(2);
    setProcessingStage(0);

    // Simulate processing stages
    for (let i = 0; i < 4; i++) {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setProcessingStage(i + 1);
    }

    // Get OCR results
    const data = await simulateOCR();
    setExtractedData(data);

    // Match medicines
    const medicines: MedicineResult[] = [];
    const medicineItems = data.items.filter((item) => item.type === "medicine");

    medicineItems.forEach((item, index) => {
      const found = findMedicine(item.text);
      if (found) {
        const dosageItem = data.items.find(
          (i, idx) =>
            i.type === "dosage" &&
            idx > data.items.indexOf(item) &&
            (index === medicineItems.length - 1 ||
              idx < data.items.indexOf(medicineItems[index + 1]))
        );
        const freqItem = data.items.find(
          (i, idx) =>
            i.type === "frequency" &&
            idx > data.items.indexOf(item) &&
            (index === medicineItems.length - 1 ||
              idx < data.items.indexOf(medicineItems[index + 1]))
        );

        medicines.push({
          medicine: found,
          extractedDosage: dosageItem?.text,
          extractedFrequency: freqItem?.text,
          confidence: item.confidence,
        });
      }
    });

    setMedicineResults(medicines);
    setCurrentStep(3);
  };

  const reset = () => {
    setCurrentStep(1);
    setProcessingStage(0);
    setUploadedFile(null);
    setExtractedData(null);
    setMedicineResults([]);
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
            {currentStep === 2 && processingStage < 4 && (
              <motion.div
                key="processing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <ProcessingLoader currentStage={processingStage} />
              </motion.div>
            )}

            {/* Step 2: Extracted Text Preview (shown briefly) */}
            {currentStep === 2 && processingStage >= 4 && extractedData && (
              <motion.div
                key="extracted"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <ExtractedTextPreview
                  items={extractedData.items}
                  rawText={extractedData.rawText}
                />
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
                    We identified {medicineResults.length} medicine(s) from your
                    prescription. Here's the detailed information.
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

                {/* Medicine Cards */}
                <div className="max-w-3xl mx-auto space-y-6">
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
