import { motion } from "framer-motion";
import { 
  Pill, 
  AlertTriangle, 
  Clock, 
  Activity, 
  Shield, 
  ChevronDown,
  Utensils,
  Info
} from "lucide-react";
import { useState } from "react";
import type { Medicine } from "@/data/medicineDatabase";

interface MedicineCardProps {
  medicine: Medicine;
  extractedDosage?: string;
  extractedFrequency?: string;
  confidence: number;
  index: number;
}

export function MedicineCard({ 
  medicine, 
  extractedDosage, 
  extractedFrequency, 
  confidence,
  index 
}: MedicineCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="rounded-2xl border bg-card shadow-card overflow-hidden"
    >
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl gradient-medical shrink-0">
              <Pill className="h-7 w-7 text-primary-foreground" />
            </div>
            <div>
              <h3 className="text-xl font-bold">{medicine.name}</h3>
              <p className="text-sm text-muted-foreground">{medicine.genericName}</p>
              <span className="inline-block mt-2 px-3 py-1 text-xs font-medium rounded-full bg-secondary text-secondary-foreground">
                {medicine.category}
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Confidence</div>
            <div className={`text-lg font-bold ${confidence >= 80 ? "text-success" : confidence >= 60 ? "text-warning" : "text-destructive"}`}>
              {confidence}%
            </div>
          </div>
        </div>
      </div>

      {/* Quick Info Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-6 pb-4">
        <div className="p-3 rounded-xl bg-secondary/50">
          <Activity className="h-4 w-4 text-primary mb-1" />
          <div className="text-xs text-muted-foreground">Treats</div>
          <div className="text-sm font-medium truncate">{medicine.diseases[0]}</div>
        </div>
        <div className="p-3 rounded-xl bg-secondary/50">
          <Clock className="h-4 w-4 text-primary mb-1" />
          <div className="text-xs text-muted-foreground">Dosage</div>
          <div className="text-sm font-medium">{extractedDosage || medicine.commonDosage.split(" ")[0]}</div>
        </div>
        <div className="p-3 rounded-xl bg-secondary/50">
          <Utensils className="h-4 w-4 text-primary mb-1" />
          <div className="text-xs text-muted-foreground">Form</div>
          <div className="text-sm font-medium">{medicine.dosageForm.split("/")[0]}</div>
        </div>
        <div className="p-3 rounded-xl bg-secondary/50">
          <Info className="h-4 w-4 text-primary mb-1" />
          <div className="text-xs text-muted-foreground">Frequency</div>
          <div className="text-sm font-medium">{extractedFrequency || "As prescribed"}</div>
        </div>
      </div>

      {/* Intake Guidelines */}
      <div className="mx-6 p-4 rounded-xl bg-primary/5 border border-primary/20 mb-4">
        <div className="flex items-center gap-2 text-primary font-medium mb-2">
          <Utensils className="h-4 w-4" />
          How to Take
        </div>
        <p className="text-sm text-foreground">{medicine.intakeGuidelines}</p>
      </div>

      {/* Expandable Details */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-3 flex items-center justify-between bg-muted/50 hover:bg-muted transition-colors"
      >
        <span className="text-sm font-medium">View Detailed Information</span>
        <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </button>

      {isExpanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="px-6 py-4 space-y-4 border-t"
        >
          {/* Diseases Treated */}
          <div>
            <h4 className="font-medium flex items-center gap-2 mb-2">
              <Activity className="h-4 w-4 text-primary" />
              Conditions Treated
            </h4>
            <div className="flex flex-wrap gap-2">
              {medicine.diseases.map((disease, i) => (
                <span key={i} className="px-3 py-1 text-xs rounded-full bg-secondary text-secondary-foreground">
                  {disease}
                </span>
              ))}
            </div>
          </div>

          {/* Side Effects */}
          <div>
            <h4 className="font-medium flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-warning" />
              Common Side Effects
            </h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              {medicine.sideEffects.map((effect, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-warning" />
                  {effect}
                </li>
              ))}
            </ul>
          </div>

          {/* Overuse Effects */}
          <div className="p-4 rounded-xl bg-destructive/5 border border-destructive/20">
            <h4 className="font-medium flex items-center gap-2 mb-2 text-destructive">
              <AlertTriangle className="h-4 w-4" />
              Effects of Overuse / Incorrect Usage
            </h4>
            <ul className="text-sm space-y-1">
              {medicine.overuseEffects.map((effect, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-destructive" />
                  {effect}
                </li>
              ))}
            </ul>
          </div>

          {/* Warnings */}
          <div>
            <h4 className="font-medium flex items-center gap-2 mb-2">
              <Shield className="h-4 w-4 text-primary" />
              Warnings & Precautions
            </h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              {[...medicine.warnings, ...medicine.precautions].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
