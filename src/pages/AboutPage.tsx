import { motion } from "framer-motion";
import { 
  Brain, 
  Code, 
  Database, 
  FileText, 
  Github, 
  GraduationCap,
  Layers,
  Lightbulb,
  Target,
  Users,
  Workflow,
  Zap
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const objectives = [
  "Develop an AI-based OCR system for handwritten prescription recognition",
  "Create a comprehensive medicine database with disease mappings",
  "Build an intuitive user interface for prescription analysis",
  "Provide safety information including side effects and warnings",
  "Implement NLP techniques for medicine name matching"
];

const techStack = [
  {
    category: "Frontend",
    items: ["React.js", "TypeScript", "Tailwind CSS", "Framer Motion"]
  },
  {
    category: "Backend",
    items: ["Python", "Flask/FastAPI", "REST API"]
  },
  {
    category: "AI/ML",
    items: ["TensorFlow", "PyTorch", "CNN + RNN OCR", "NLP"]
  },
  {
    category: "Database",
    items: ["SQLite/MongoDB", "Medicine Dataset", "WHO/FDA Structure"]
  }
];

const architecture = [
  {
    icon: FileText,
    title: "Image Input",
    description: "User uploads or captures prescription image"
  },
  {
    icon: Zap,
    title: "Preprocessing",
    description: "Grayscale conversion, noise removal, thresholding"
  },
  {
    icon: Brain,
    title: "OCR Engine",
    description: "Deep learning model extracts handwritten text"
  },
  {
    icon: Layers,
    title: "NLP Processing",
    description: "Medicine name matching and entity extraction"
  },
  {
    icon: Database,
    title: "Database Query",
    description: "Fetch medicine details from comprehensive database"
  },
  {
    icon: Target,
    title: "Result Display",
    description: "Present structured medicine information to user"
  }
];

const teamMembers = [
  { name: "Student 1", role: "Frontend Development & UI/UX" },
  { name: "Student 2", role: "AI/ML Model Development" },
  { name: "Student 3", role: "Backend & Database" },
  { name: "Student 4", role: "Testing & Documentation" }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="gradient-hero py-20 md:py-28">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto text-center"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <GraduationCap className="h-4 w-4" />
                Final Year Engineering Project
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                About This Project
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                A comprehensive AI-powered solution for reading and analyzing 
                handwritten medical prescriptions, developed as a Final Year 
                Engineering Project in Artificial Intelligence & Machine Learning.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Project Overview */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="grid md:grid-cols-2 gap-8 items-center"
              >
                <div>
                  <h2 className="text-3xl font-bold mb-4">Project Overview</h2>
                  <p className="text-muted-foreground mb-4">
                    Handwritten prescriptions are often difficult to read, leading to 
                    medication errors and patient safety concerns. This project addresses 
                    this critical healthcare challenge using AI and deep learning.
                  </p>
                  <p className="text-muted-foreground">
                    Our system uses state-of-the-art OCR technology combined with 
                    natural language processing to accurately read and interpret 
                    handwritten text, then matches identified medicines with a 
                    comprehensive database to provide detailed information.
                  </p>
                </div>
                <div className="p-6 rounded-2xl border bg-card shadow-card">
                  <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-primary" />
                    Problem Statement
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    "To develop an AI-based system that can accurately read handwritten 
                    medical prescriptions and provide comprehensive medicine information 
                    including disease usage, dosage guidelines, and safety warnings, 
                    thereby reducing medication errors and improving patient safety."
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Objectives */}
        <section className="py-16 md:py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-3xl font-bold mb-8 text-center">Project Objectives</h2>
              <div className="space-y-4">
                {objectives.map((objective, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4 p-4 rounded-xl bg-card border"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full gradient-medical text-primary-foreground font-bold text-sm shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-foreground pt-1">{objective}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* System Architecture */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-5xl mx-auto"
            >
              <h2 className="text-3xl font-bold mb-4 text-center">System Architecture</h2>
              <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
                The system follows a modular pipeline architecture for processing prescriptions
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {architecture.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="relative p-6 rounded-2xl border bg-card"
                    >
                      <div className="absolute -top-3 -left-3 h-8 w-8 rounded-full gradient-medical flex items-center justify-center text-primary-foreground font-bold text-sm">
                        {index + 1}
                      </div>
                      <Icon className="h-8 w-8 text-primary mb-4" />
                      <h3 className="font-semibold mb-2">{step.title}</h3>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Technology Stack */}
        <section className="py-16 md:py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-3">
                <Code className="h-8 w-8 text-primary" />
                Technology Stack
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {techStack.map((category, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 rounded-2xl border bg-card"
                  >
                    <h3 className="font-semibold text-lg mb-4 text-primary">
                      {category.category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {category.items.map((item, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 text-sm rounded-full bg-secondary text-secondary-foreground"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-3">
                <Users className="h-8 w-8 text-primary" />
                Project Team
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {teamMembers.map((member, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 rounded-2xl border bg-card text-center"
                  >
                    <div className="h-16 w-16 rounded-full gradient-medical mx-auto mb-4 flex items-center justify-center">
                      <span className="text-2xl font-bold text-primary-foreground">
                        {member.name.split(" ")[1]}
                      </span>
                    </div>
                    <h3 className="font-semibold">{member.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{member.role}</p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-12 p-6 rounded-2xl border bg-card text-center">
                <Workflow className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Project Guide</h3>
                <p className="text-muted-foreground">
                  Prof. [Guide Name]
                  <br />
                  Department of Computer Science & Engineering (AI/ML)
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* References */}
        <section className="py-16 md:py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-3xl font-bold mb-8 text-center">References & Resources</h2>
              
              <div className="space-y-4">
                <div className="p-4 rounded-xl border bg-card">
                  <h3 className="font-semibold mb-2">Datasets</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• IAM Handwriting Database</li>
                    <li>• Open-source Medicine Datasets</li>
                    <li>• WHO/FDA Drug Information Structure</li>
                  </ul>
                </div>
                
                <div className="p-4 rounded-xl border bg-card">
                  <h3 className="font-semibold mb-2">Research Papers</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Handwritten Text Recognition Using Deep Learning</li>
                    <li>• Medical Named Entity Recognition with BERT</li>
                    <li>• CNN-RNN Hybrid Models for OCR</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl border bg-card">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Github className="h-4 w-4" />
                    Open Source Libraries
                  </h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• TensorFlow / PyTorch</li>
                    <li>• Tesseract OCR</li>
                    <li>• OpenCV</li>
                    <li>• spaCy / NLTK</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
