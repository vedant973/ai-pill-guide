import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Scan, 
  Brain, 
  Shield, 
  Clock, 
  FileText, 
  ArrowRight,
  Pill,
  Activity,
  Sparkles,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const features = [
  {
    icon: Brain,
    title: "AI-Powered OCR",
    description: "Deep learning models accurately read handwritten prescriptions with high precision."
  },
  {
    icon: Pill,
    title: "Medicine Identification",
    description: "Automatically identifies medicine names and matches them with our comprehensive database."
  },
  {
    icon: Activity,
    title: "Disease Mapping",
    description: "Discover what conditions each medicine treats and understand your prescription better."
  },
  {
    icon: Shield,
    title: "Safety Information",
    description: "Get detailed warnings, side effects, and precautions for each identified medicine."
  }
];

const steps = [
  {
    number: "01",
    title: "Upload Prescription",
    description: "Take a photo or upload an image of your handwritten prescription"
  },
  {
    number: "02",
    title: "AI Processing",
    description: "Our deep learning model extracts and interprets the handwritten text"
  },
  {
    number: "03",
    title: "Get Insights",
    description: "Receive detailed medicine information, dosages, and safety guidelines"
  }
];

const stats = [
  { value: "95%+", label: "OCR Accuracy" },
  { value: "500+", label: "Medicines in DB" },
  { value: "< 10s", label: "Processing Time" },
  { value: "24/7", label: "Availability" }
];

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-hero py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Sparkles className="h-4 w-4" />
                Final Year Engineering Project
              </span>
              
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                Read Handwritten
                <br />
                <span className="text-gradient">Medical Prescriptions</span>
                <br />
                with AI
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                Upload a doctor's prescription and let our AI-powered system extract medicine names, 
                dosages, and provide comprehensive health information.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button variant="medical" size="xl" asChild>
                  <Link to="/scan">
                    <Scan className="h-5 w-5" />
                    Scan Prescription
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/about">
                    Learn More
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </section>

      {/* Stats Section */}
      <section className="py-12 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-gradient">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Powerful AI Features
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our system combines computer vision, deep learning, and natural language processing 
              to deliver accurate prescription analysis.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-2xl bg-card border shadow-card hover:shadow-elevated transition-shadow"
                >
                  <div className="h-12 w-12 rounded-xl gradient-medical flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 md:py-28 bg-secondary/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to understand your prescription better
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative"
              >
                <div className="text-6xl font-bold text-primary/10 mb-4">
                  {step.number}
                </div>
                <h3 className="font-semibold text-xl mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
                
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary/30 to-transparent -translate-x-8" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Technology Stack
              </h2>
              <p className="text-muted-foreground">
                Built with modern AI/ML technologies for accurate results
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl border bg-card">
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  AI / ML Components
                </h3>
                <ul className="space-y-3">
                  {[
                    "CNN + RNN based OCR for handwritten text",
                    "Transformer architecture for sequence modeling",
                    "NLP for medicine name matching",
                    "Image preprocessing pipeline"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 rounded-2xl border bg-card">
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Development Stack
                </h3>
                <ul className="space-y-3">
                  {[
                    "React + TypeScript Frontend",
                    "Tailwind CSS for responsive UI",
                    "Python Backend (Flask/FastAPI)",
                    "TensorFlow / PyTorch Models"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 gradient-medical">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Ready to Analyze Your Prescription?
            </h2>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
              Upload your handwritten prescription and get detailed medicine information in seconds.
            </p>
            <Button variant="secondary" size="xl" asChild>
              <Link to="/scan">
                <Scan className="h-5 w-5" />
                Start Scanning Now
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
