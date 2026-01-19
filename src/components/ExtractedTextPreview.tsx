import { motion } from "framer-motion";
import { FileText, Sparkles, CheckCircle2 } from "lucide-react";

interface ExtractedItem {
  text: string;
  type: "medicine" | "dosage" | "frequency" | "duration" | "other";
  confidence: number;
}

interface ExtractedTextPreviewProps {
  items: ExtractedItem[];
  rawText: string;
}

export function ExtractedTextPreview({ items, rawText }: ExtractedTextPreviewProps) {
  const getTypeColor = (type: ExtractedItem["type"]) => {
    switch (type) {
      case "medicine":
        return "bg-primary/10 text-primary border-primary/30";
      case "dosage":
        return "bg-success/10 text-success border-success/30";
      case "frequency":
        return "bg-accent/10 text-accent border-accent/30";
      case "duration":
        return "bg-warning/10 text-warning border-warning/30";
      default:
        return "bg-muted text-muted-foreground border-muted";
    }
  };

  const getTypeLabel = (type: ExtractedItem["type"]) => {
    switch (type) {
      case "medicine":
        return "Medicine";
      case "dosage":
        return "Dosage";
      case "frequency":
        return "Frequency";
      case "duration":
        return "Duration";
      default:
        return "Other";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-3xl mx-auto"
    >
      <div className="rounded-2xl border bg-card shadow-card overflow-hidden">
        <div className="p-6 border-b bg-secondary/30">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-medical">
              <FileText className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                Extracted Text Preview
              </h3>
              <p className="text-sm text-muted-foreground">
                AI-detected text from your prescription
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <h4 className="text-sm font-medium text-muted-foreground mb-3">
              Identified Elements
            </h4>
            <div className="flex flex-wrap gap-2">
              {items.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className={`px-3 py-2 rounded-lg border ${getTypeColor(item.type)}`}
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3 w-3" />
                    <span className="text-xs font-medium uppercase tracking-wide">
                      {getTypeLabel(item.type)}
                    </span>
                  </div>
                  <div className="mt-1 font-medium">{item.text}</div>
                  <div className="text-xs opacity-70 mt-1">
                    {item.confidence}% confidence
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-3">
              Raw Extracted Text
            </h4>
            <div className="p-4 rounded-xl bg-muted/50 font-mono text-sm whitespace-pre-wrap">
              {rawText}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
