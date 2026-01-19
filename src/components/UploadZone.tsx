import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Camera, Image, X, FileImage } from "lucide-react";
import { Button } from "./ui/button";

interface UploadZoneProps {
  onImageUpload: (file: File) => void;
}

export function UploadZone({ onImageUpload }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragOut = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  }, []);

  const handleFile = (file: File) => {
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
        setFileName(file.name);
      };
      reader.readAsDataURL(file);
      onImageUpload(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const clearPreview = () => {
    setPreview(null);
    setFileName(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl mx-auto"
    >
      <AnimatePresence mode="wait">
        {preview ? (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative rounded-2xl border-2 border-primary/30 bg-card p-4 shadow-elevated"
          >
            <button
              onClick={clearPreview}
              className="absolute top-2 right-2 z-10 rounded-full bg-destructive/90 p-2 text-destructive-foreground hover:bg-destructive transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
            <img
              src={preview}
              alt="Prescription preview"
              className="w-full rounded-xl object-contain max-h-80"
            />
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FileImage className="h-4 w-4" />
                <span className="truncate max-w-[200px]">{fileName}</span>
              </div>
              <span className="text-xs text-success font-medium">Ready to analyze</span>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="upload"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onDragEnter={handleDragIn}
            onDragLeave={handleDragOut}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`relative rounded-2xl border-2 border-dashed p-8 md:p-12 text-center transition-all duration-300 ${
              isDragging
                ? "border-primary bg-primary/5 scale-[1.02]"
                : "border-muted-foreground/25 bg-card hover:border-primary/50 hover:bg-secondary/50"
            }`}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleInputChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              id="file-upload"
            />
            
            <motion.div
              animate={{ y: isDragging ? -5 : 0 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary">
                <Upload className={`h-8 w-8 transition-colors ${isDragging ? "text-primary" : "text-muted-foreground"}`} />
              </div>
              
              <div>
                <p className="text-lg font-semibold">
                  {isDragging ? "Drop your prescription here" : "Upload Prescription Image"}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Drag & drop or click to select a file
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
                <Button variant="medical" size="sm" asChild>
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Image className="h-4 w-4 mr-2" />
                    Choose File
                  </label>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Camera className="h-4 w-4 mr-2" />
                    Take Photo
                  </label>
                </Button>
              </div>

              <p className="text-xs text-muted-foreground mt-4">
                Supports JPG, PNG, HEIC • Max 10MB
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
