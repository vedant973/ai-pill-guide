import { motion } from "framer-motion";
import { Scan, Brain, FileText, CheckCircle } from "lucide-react";

const stages = [
  { icon: Scan, label: "Preprocessing Image", description: "Applying filters and enhancement" },
  { icon: Brain, label: "AI OCR Processing", description: "Extracting handwritten text" },
  { icon: FileText, label: "Analyzing Prescription", description: "Identifying medicines and dosages" },
  { icon: CheckCircle, label: "Generating Report", description: "Compiling medicine information" },
];

interface ProcessingLoaderProps {
  currentStage: number;
}

export function ProcessingLoader({ currentStage }: ProcessingLoaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-2xl mx-auto py-8"
    >
      <div className="text-center mb-8">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="inline-flex h-20 w-20 items-center justify-center rounded-full gradient-medical mb-4"
        >
          <Brain className="h-10 w-10 text-primary-foreground" />
        </motion.div>
        <h2 className="text-2xl font-bold">Analyzing Your Prescription</h2>
        <p className="text-muted-foreground mt-2">
          Our AI is processing your handwritten prescription
        </p>
      </div>

      <div className="space-y-4">
        {stages.map((stage, index) => {
          const Icon = stage.icon;
          const isActive = index === currentStage;
          const isComplete = index < currentStage;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 ${
                isActive
                  ? "border-primary bg-primary/5 shadow-card"
                  : isComplete
                  ? "border-success/30 bg-success/5"
                  : "border-muted bg-card"
              }`}
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full transition-colors ${
                  isActive
                    ? "gradient-medical animate-pulse"
                    : isComplete
                    ? "bg-success"
                    : "bg-muted"
                }`}
              >
                <Icon
                  className={`h-6 w-6 ${
                    isActive || isComplete
                      ? "text-primary-foreground"
                      : "text-muted-foreground"
                  }`}
                />
              </div>
              <div className="flex-1">
                <p
                  className={`font-medium ${
                    isActive
                      ? "text-primary"
                      : isComplete
                      ? "text-success"
                      : "text-muted-foreground"
                  }`}
                >
                  {stage.label}
                </p>
                <p className="text-sm text-muted-foreground">
                  {stage.description}
                </p>
              </div>
              {isActive && (
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="h-3 w-3 rounded-full bg-primary"
                />
              )}
              {isComplete && (
                <CheckCircle className="h-5 w-5 text-success" />
              )}
            </motion.div>
          );
        })}
      </div>

      <motion.div
        className="mt-8 h-2 rounded-full bg-muted overflow-hidden"
      >
        <motion.div
          className="h-full gradient-medical"
          initial={{ width: "0%" }}
          animate={{ width: `${((currentStage + 1) / stages.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>
    </motion.div>
  );
}
