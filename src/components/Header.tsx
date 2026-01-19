import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Pill, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/scan", label: "Scan Prescription" },
  { path: "/about", label: "About Project" },
];

export function Header() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <motion.div
            whileHover={{ rotate: 15 }}
            className="flex h-10 w-10 items-center justify-center rounded-xl gradient-medical"
          >
            <Pill className="h-5 w-5 text-primary-foreground" />
          </motion.div>
          <span className="text-xl font-bold text-gradient">MedScript AI</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`relative text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === link.path
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              {link.label}
              {location.pathname === link.path && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 gradient-medical rounded-full"
                />
              )}
            </Link>
          ))}
          <Button variant="medical" size="sm" asChild>
            <Link to="/scan">Get Started</Link>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden border-t bg-background p-4"
        >
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className={`block py-3 text-sm font-medium transition-colors ${
                location.pathname === link.path
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Button variant="medical" size="sm" className="w-full mt-4" asChild>
            <Link to="/scan" onClick={() => setIsMenuOpen(false)}>
              Get Started
            </Link>
          </Button>
        </motion.nav>
      )}
    </motion.header>
  );
}
