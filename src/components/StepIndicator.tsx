import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface Step {
  number: number;
  title: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-2 md:gap-4">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center">
          <div className="flex items-center gap-2">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className={`flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full text-sm font-semibold transition-all duration-300 ${
                step.number < currentStep
                  ? "gradient-medical text-primary-foreground"
                  : step.number === currentStep
                  ? "border-2 border-primary bg-primary/10 text-primary"
                  : "border-2 border-muted bg-muted text-muted-foreground"
              }`}
            >
              {step.number < currentStep ? (
                <Check className="h-4 w-4" />
              ) : (
                step.number
              )}
            </motion.div>
            <span
              className={`hidden md:block text-sm font-medium ${
                step.number <= currentStep
                  ? "text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              {step.title}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`mx-2 md:mx-4 h-0.5 w-8 md:w-16 rounded-full transition-colors ${
                step.number < currentStep
                  ? "gradient-medical"
                  : "bg-muted"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
