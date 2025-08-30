import React, { useState, useCallback } from "react";
import ImpText from "./ImpText";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  UploadCloud,
  Loader,
  ServerCrash,
  Wand2,
  ChevronDown,
  Download
} from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function App() {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState("");
  const [summaryLength, setSummaryLength] = useState("medium");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles[0]) {
      setFile(acceptedFiles[0]);
      setFileName(acceptedFiles[0].name);
      setError("");
      setSummary("");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
    },
    maxFiles: 1,
  });

  const handleSummarize = async () => {
    if (!file) {
      setError("Please upload a file first.");
      return;
    }
    setLoading(true);
    setError("");
    setSummary("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("summaryLength", summaryLength);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/summarize`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setSummary(response.data.summary);
    } catch (err) {
      setError("Failed to generate summary. Please check the server or file.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setFileName("");
    setSummary("");
    setError("");
  };

  return (
    <div className="min-h-screen relative text-gray-200 flex flex-col items-center justify-center px-4 py-8 font-sans animated-gradient-bg overflow-hidden">
      <ShootingStars />
      <div className="w-full max-w-3xl mx-auto relative z-10">
        <Header />
        <main className="mt-10">
          {/* File Dropzone */}
          <div
            {...getRootProps()}
            className={`w-full p-8 sm:p-10 border-2 border-dashed rounded-2xl transition-all duration-300 cursor-pointer
              shadow-lg
              ${
                isDragActive
                  ? "border-indigo-400 bg-gray-800/40"
                  : "border-gray-700 hover:border-indigo-500 hover:bg-gray-800/30"
              }
              ${file ? "border-emerald-500 bg-gray-800/30" : ""}`}
          >
            <input {...getInputProps()} />
            <FileDropzoneContent
              isDragActive={isDragActive}
              fileName={fileName}
              handleRemoveFile={handleRemoveFile}
            />
          </div>

          {/* Controls Section */}
          <Controls
            summaryLength={summaryLength}
            setSummaryLength={setSummaryLength}
            handleSummarize={handleSummarize}
            loading={loading}
            isFileSelected={!!file}
            summary={summary}
            setSummary={setSummary}
          />

          {/* Summary Display */}
          <SummaryDisplay summary={summary} loading={loading} error={error} />
        </main>
      </div>
    </div>
  );
}

// ===================== HEADER =====================
const Header = () => (
  <header className="text-center relative -mt-20">
    <motion.h1
      className="text-6xl sm:text-7xl md:text-8xl font-extrabold text-transparent bg-clip-text 
                 bg-gradient-to-r from-[#3A7CA5] via-[#1B263B] to-[#800000]
                 drop-shadow-[0_0_25px_rgba(255,255,255,0.25)] tracking-tight"
      initial={{ y: -60, opacity: 0, scale: 0.85 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      SummarMuse
    </motion.h1>

    <motion.div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-2 
                 bg-gradient-to-r from-[#3A7CA5] via-[#1B263B] to-[#800000] 
                 rounded-full opacity-50 blur-2xl"
      initial={{ scaleX: 0, opacity: 0 }}
      animate={{ scaleX: 1, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    />

    <motion.p
      className="text-gray-200 mt-5 text-lg sm:text-xl md:text-2xl font-medium"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      Turn lengthy documents into concise summaries instantly.
    </motion.p>
  </header>
);

// ===================== DROPZONE =====================
const FileDropzoneContent = ({ isDragActive, fileName, handleRemoveFile }) => {
  if (fileName) {
    return (
      <div className="flex flex-col items-center justify-center text-center">
        <FileText className="w-14 h-14 sm:w-16 sm:h-16 text-emerald-400 drop-shadow" />
        <p className="mt-3 text-base sm:text-lg text-gray-200 font-medium break-all">
          {fileName}
        </p>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleRemoveFile();
          }}
          className="mt-3 text-sm text-red-400 hover:text-red-300 transition-colors underline"
        >
          Remove File
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <UploadCloud className="w-14 h-14 sm:w-16 sm:h-16 text-gray-500" />
      <p className="mt-3 text-base sm:text-lg text-gray-300 font-medium">
        {isDragActive
          ? "Drop the file here..."
          : "Drag & drop a file here, or click to select"}
      </p>
      <p className="text-xs sm:text-sm text-gray-500 mt-2">
        PDF, PNG, JPG supported
      </p>
    </div>
  );
};

// ===================== CONTROLS =====================
const Controls = ({
  summaryLength,
  setSummaryLength,
  handleSummarize,
  loading,
  isFileSelected,
  summary,
  setSummary,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const options = ["short", "medium", "long"];

  return (
    <motion.div
      className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      {/* Generate Summary Button */}
      <button
        onClick={handleSummarize}
        disabled={loading || !isFileSelected}
        className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3
          bg-gradient-to-r from-[#1a2a6c] via-black to-[#6b0f1a]
          text-white font-semibold rounded-xl shadow-lg
          hover:scale-105 transition-all duration-300
          disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? <Loader className="animate-spin" /> : <Wand2 />}
        <span>{loading ? "Summarizing..." : "Summarize Now"}</span>
      </button>

      {/* Delete Summary Button */}
      {summary && (
        <button
          onClick={() => setSummary("")}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3
            bg-gradient-to-r from-[#1a2a6c] via-black to-[#6b0f1a]
            text-white font-semibold rounded-xl shadow-lg
            hover:scale-105 transition-all duration-300"
        >
          🗑 Delete Summary
        </button>
      )}

      {/* Custom Animated Dropdown */}
      <div className="relative w-full sm:w-56">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex justify-between items-center px-5 py-3 rounded-xl
            bg-gradient-to-r from-[#1a2a6c] via-black to-[#6b0f1a]
            text-white font-semibold shadow-lg hover:scale-[1.02]
            transition-all duration-300"
        >
          {summaryLength === "short"
            ? "Short Summary"
            : summaryLength === "medium"
            ? "Medium Summary"
            : "Long Summary"}
          <ChevronDown
            className={`w-5 h-5 transition-transform ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 right-0 mt-2 bg-gray-900 border border-gray-700
                rounded-xl shadow-lg z-20 overflow-hidden"
            >
              {options.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setSummaryLength(option);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-5 py-3 transition-colors font-semibold ${
                    summaryLength === option
                      ? "bg-gradient-to-r from-[#1a2a6c] via-black to-[#6b0f1a] text-white"
                      : "text-gray-300 hover:bg-gray-800"
                  }`}
                >
                  {option === "short"
                    ? "Short Summary"
                    : option === "medium"
                    ? "Medium Summary"
                    : "Long Summary"}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// ===================== SUMMARY DISPLAY =====================
const SummaryDisplay = ({ summary, loading, error }) => {
  const handleDownload = (type) => {
    if (!summary) return;

    if (type === "txt") {
      const blob = new Blob([summary], { type: "text/plain" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "summary.txt";
      link.click();
    } else if (type === "pdf") {
      const blob = new Blob([summary], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "summary.pdf";
      link.click();
    }
  };

  return (
    <div className="mt-10">
      <AnimatePresence>
        {error && (
          <motion.div
            className="w-full p-4 bg-red-500/20 border border-red-400/60 text-red-300 rounded-lg flex items-center gap-3 shadow-md"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <ServerCrash />
            <span>{error}</span>
          </motion.div>
        )}
        {summary && (
          <motion.div
            className="w-full p-6 bg-gray-800/70 border border-gray-700 rounded-2xl prose prose-invert prose-p:text-gray-300 shadow-lg overflow-x-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-xl sm:text-2xl font-bold text-gray-100 mb-4">
              Summary
            </h2>
            <ImpText text={summary} />

            {/* Download Buttons */}
            <div className="flex flex-wrap gap-4 mt-6">
              <button
                onClick={() => handleDownload("txt")}
                className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-[#1a2a6c] via-black to-[#6b0f1a] text-white font-semibold rounded-xl shadow-lg hover:scale-105 transition-all duration-300"
              >
                <Download className="w-5 h-5" />
                Download TXT
              </button>
              <button
                onClick={() => handleDownload("pdf")}
                className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-[#1a2a6c] via-black to-[#6b0f1a] text-white font-semibold rounded-xl shadow-lg hover:scale-105 transition-all duration-300"
              >
                <Download className="w-5 h-5" />
                Download PDF
              </button>
            </div>
          </motion.div>
        )}
        {loading && (
          <div className="flex flex-col items-center justify-center text-center mt-14">
            <Loader className="w-10 h-10 sm:w-12 sm:h-12 text-[#1a2a6c] animate-spin" />
            <p className="text-gray-400 mt-4 text-sm sm:text-base">
              Reading your document...
            </p>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ===================== SHOOTING STARS =====================
const ShootingStars = () => {
  const stars = Array.from({ length: 12 });
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {stars.map((_, idx) => (
        <div
          key={idx}
          className="absolute w-0.5 h-0.5 bg-white rounded-full animate-shooting"
          style={{
            top: `${Math.random() * 80}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${1 + Math.random() * 1.5}s`,
          }}
        />
      ))}
    </div>
  );
};
