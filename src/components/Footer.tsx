import { Pill, Heart, Github, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t bg-secondary/30">
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-medical">
                <Pill className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-bold text-gradient">MedScript AI</span>
            </div>
            <p className="text-sm text-muted-foreground">
              AI-powered prescription reader for accurate medicine identification
              and healthcare guidance.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/scan" className="hover:text-primary transition-colors">
                  Scan Prescription
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary transition-colors">
                  About Project
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Disclaimer</h4>
            <p className="text-xs text-muted-foreground">
              This application is for educational purposes only and does not
              replace professional medical advice. Always consult a qualified
              healthcare provider for medical decisions.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Made with <Heart className="h-4 w-4 text-destructive fill-destructive" /> for Final Year Project
          </p>
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
