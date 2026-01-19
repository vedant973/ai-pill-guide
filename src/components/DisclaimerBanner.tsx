import { motion } from "framer-motion";
import { AlertCircle, X } from "lucide-react";
import { useState } from "react";

export function DisclaimerBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="bg-warning/10 border border-warning/30 rounded-xl p-4"
    >
      <div className="flex items-start gap-3">
        <AlertCircle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
        <div className="flex-1">
          <h4 className="font-medium text-warning-foreground">Medical Disclaimer</h4>
          <p className="text-sm text-muted-foreground mt-1">
            This AI-powered tool is for educational and informational purposes only. 
            It does not replace professional medical advice, diagnosis, or treatment. 
            Always consult a qualified healthcare provider before taking any medication.
          </p>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
}
