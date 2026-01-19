export interface Medicine {
  name: string;
  genericName: string;
  category: string;
  diseases: string[];
  dosageForm: string;
  commonDosage: string;
  intakeGuidelines: string;
  sideEffects: string[];
  overuseEffects: string[];
  warnings: string[];
  precautions: string[];
}

export const medicineDatabase: Medicine[] = [
  {
    name: "Paracetamol",
    genericName: "Acetaminophen",
    category: "Analgesic / Antipyretic",
    diseases: ["Fever", "Headache", "Body Pain", "Common Cold", "Flu"],
    dosageForm: "Tablet / Syrup",
    commonDosage: "500mg - 1000mg every 4-6 hours",
    intakeGuidelines: "Can be taken with or without food. Take with a full glass of water.",
    sideEffects: ["Nausea", "Skin rash", "Allergic reactions (rare)"],
    overuseEffects: ["Liver damage", "Acute liver failure", "Kidney problems"],
    warnings: ["Do not exceed 4g per day", "Avoid alcohol consumption", "Consult doctor if pregnant"],
    precautions: ["Check for paracetamol in other medications", "Reduce dose for liver impairment"]
  },
  {
    name: "Amoxicillin",
    genericName: "Amoxicillin Trihydrate",
    category: "Antibiotic (Penicillin)",
    diseases: ["Bacterial Infections", "Respiratory Infections", "Ear Infections", "Urinary Tract Infections", "Skin Infections"],
    dosageForm: "Capsule / Tablet / Syrup",
    commonDosage: "250mg - 500mg every 8 hours",
    intakeGuidelines: "Take with or without food. Complete the full course as prescribed.",
    sideEffects: ["Diarrhea", "Nausea", "Skin rash", "Stomach pain"],
    overuseEffects: ["Antibiotic resistance", "Severe allergic reactions", "Clostridium difficile infection"],
    warnings: ["Allergic to penicillin - avoid", "May reduce effectiveness of birth control pills"],
    precautions: ["Inform doctor about kidney disease", "Store away from moisture"]
  },
  {
    name: "Omeprazole",
    genericName: "Omeprazole Magnesium",
    category: "Proton Pump Inhibitor",
    diseases: ["Gastric Ulcer", "GERD", "Acid Reflux", "Heartburn", "Zollinger-Ellison Syndrome"],
    dosageForm: "Capsule / Tablet",
    commonDosage: "20mg - 40mg once daily",
    intakeGuidelines: "Take before meals, preferably in the morning. Swallow whole, do not crush.",
    sideEffects: ["Headache", "Nausea", "Diarrhea", "Stomach pain", "Flatulence"],
    overuseEffects: ["Vitamin B12 deficiency", "Bone fractures", "Magnesium deficiency", "Kidney problems"],
    warnings: ["Long-term use requires monitoring", "May interact with blood thinners"],
    precautions: ["Inform doctor about liver disease", "Not recommended for children under 1 year"]
  },
  {
    name: "Metformin",
    genericName: "Metformin Hydrochloride",
    category: "Antidiabetic (Biguanide)",
    diseases: ["Type 2 Diabetes", "Prediabetes", "PCOS"],
    dosageForm: "Tablet",
    commonDosage: "500mg - 1000mg twice daily",
    intakeGuidelines: "Take with meals to reduce stomach upset. Start with low dose.",
    sideEffects: ["Nausea", "Diarrhea", "Stomach upset", "Metallic taste"],
    overuseEffects: ["Lactic acidosis (rare but serious)", "Vitamin B12 deficiency"],
    warnings: ["Avoid alcohol", "Stop before contrast imaging procedures", "Monitor kidney function"],
    precautions: ["Not for Type 1 diabetes", "Elderly patients need dose adjustment"]
  },
  {
    name: "Atorvastatin",
    genericName: "Atorvastatin Calcium",
    category: "Statin (Cholesterol-lowering)",
    diseases: ["High Cholesterol", "Hyperlipidemia", "Cardiovascular Disease Prevention"],
    dosageForm: "Tablet",
    commonDosage: "10mg - 80mg once daily",
    intakeGuidelines: "Can be taken any time of day, with or without food. Take at same time daily.",
    sideEffects: ["Muscle pain", "Joint pain", "Diarrhea", "Nausea"],
    overuseEffects: ["Rhabdomyolysis (muscle breakdown)", "Liver damage", "Memory problems"],
    warnings: ["Avoid grapefruit juice", "Report unexplained muscle pain immediately"],
    precautions: ["Regular liver function tests required", "Not recommended during pregnancy"]
  },
  {
    name: "Lisinopril",
    genericName: "Lisinopril Dihydrate",
    category: "ACE Inhibitor",
    diseases: ["Hypertension", "Heart Failure", "Post-Heart Attack", "Diabetic Nephropathy"],
    dosageForm: "Tablet",
    commonDosage: "5mg - 40mg once daily",
    intakeGuidelines: "Take at the same time each day. Can be taken with or without food.",
    sideEffects: ["Dry cough", "Dizziness", "Headache", "Fatigue"],
    overuseEffects: ["Severe hypotension", "Kidney failure", "Hyperkalemia"],
    warnings: ["Not safe during pregnancy", "May cause angioedema"],
    precautions: ["Monitor blood pressure regularly", "Stay hydrated"]
  },
  {
    name: "Azithromycin",
    genericName: "Azithromycin Dihydrate",
    category: "Antibiotic (Macrolide)",
    diseases: ["Respiratory Infections", "Skin Infections", "Ear Infections", "STIs"],
    dosageForm: "Tablet / Suspension",
    commonDosage: "500mg day 1, then 250mg days 2-5",
    intakeGuidelines: "Take 1 hour before or 2 hours after meals for best absorption.",
    sideEffects: ["Diarrhea", "Nausea", "Abdominal pain", "Vomiting"],
    overuseEffects: ["Antibiotic resistance", "Heart rhythm problems", "Liver toxicity"],
    warnings: ["May prolong QT interval", "Inform doctor of heart conditions"],
    precautions: ["Complete full course", "Avoid antacids within 2 hours"]
  },
  {
    name: "Cetirizine",
    genericName: "Cetirizine Hydrochloride",
    category: "Antihistamine",
    diseases: ["Allergies", "Hay Fever", "Urticaria", "Allergic Rhinitis", "Itching"],
    dosageForm: "Tablet / Syrup",
    commonDosage: "10mg once daily",
    intakeGuidelines: "Can be taken with or without food. Usually taken in the evening.",
    sideEffects: ["Drowsiness", "Dry mouth", "Headache", "Fatigue"],
    overuseEffects: ["Excessive sedation", "Urinary retention", "Confusion"],
    warnings: ["May cause drowsiness - avoid driving", "Avoid alcohol"],
    precautions: ["Reduce dose for kidney impairment", "Use caution in elderly"]
  },
  {
    name: "Ibuprofen",
    genericName: "Ibuprofen",
    category: "NSAID (Anti-inflammatory)",
    diseases: ["Pain", "Inflammation", "Arthritis", "Menstrual Cramps", "Fever"],
    dosageForm: "Tablet / Capsule / Suspension",
    commonDosage: "200mg - 400mg every 4-6 hours",
    intakeGuidelines: "Take with food or milk to prevent stomach upset.",
    sideEffects: ["Stomach upset", "Nausea", "Dizziness", "Headache"],
    overuseEffects: ["Stomach ulcers", "Kidney damage", "Heart problems", "GI bleeding"],
    warnings: ["Avoid in last trimester of pregnancy", "May increase heart attack risk"],
    precautions: ["Not for long-term use", "Avoid if asthmatic"]
  },
  {
    name: "Amlodipine",
    genericName: "Amlodipine Besylate",
    category: "Calcium Channel Blocker",
    diseases: ["Hypertension", "Angina", "Coronary Artery Disease"],
    dosageForm: "Tablet",
    commonDosage: "5mg - 10mg once daily",
    intakeGuidelines: "Take at the same time each day. Can be taken with or without food.",
    sideEffects: ["Swelling of ankles", "Flushing", "Headache", "Fatigue"],
    overuseEffects: ["Severe hypotension", "Heart palpitations", "Fainting"],
    warnings: ["May worsen heart failure symptoms initially", "Grapefruit may increase effects"],
    precautions: ["Start with lower dose in elderly", "Monitor blood pressure regularly"]
  }
];

export function findMedicine(name: string): Medicine | undefined {
  const normalizedName = name.toLowerCase().trim();
  return medicineDatabase.find(
    med => 
      med.name.toLowerCase().includes(normalizedName) ||
      med.genericName.toLowerCase().includes(normalizedName) ||
      normalizedName.includes(med.name.toLowerCase())
  );
}

export function searchMedicines(query: string): Medicine[] {
  const normalizedQuery = query.toLowerCase().trim();
  return medicineDatabase.filter(
    med =>
      med.name.toLowerCase().includes(normalizedQuery) ||
      med.genericName.toLowerCase().includes(normalizedQuery) ||
      med.diseases.some(d => d.toLowerCase().includes(normalizedQuery))
  );
}
