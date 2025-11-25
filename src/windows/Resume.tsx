import React, { useState, useEffect } from "react";
import WindowWrapper from "#hoc/windowWrapper";
import { Document, Page, pdfjs } from "react-pdf";
import {
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
  Download,
} from "lucide-react";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css"; // <- optional but nice

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

type ResumeProps = {
  name: string;
};

const Resume: React.FC<ResumeProps> = ({ name }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.1);
  const [loadError, setLoadError] = useState<string | null>(null);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageNumber(1);
    setLoadError(null);
  };

  const onDocumentLoadError = (error: Error) => {
    console.error("PDF load error:", error);
    setLoadError(
      "Failed to load PDF file. Make sure myresume.pdf exists in public folder."
    );
  };

  const canPrev = pageNumber > 1;
  const canNext = numPages ? pageNumber < numPages : false;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && canPrev) {
        setPageNumber((p) => p - 1);
      } else if (e.key === "ArrowRight" && canNext) {
        setPageNumber((p) => p + 1);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [canPrev, canNext]);

  return (
    <div className="bg-[#050608] w-full h-full rounded-bl-lg rounded-br-lg text-[#E5E7EB] border border-white/10 shadow-[0_18px_45px_rgba(0,0,0,0.65)] overflow-hidden">
      <div className="px-4 py-2 bg-[#0b0d10] border-b border-white/10 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 text-white/60">
          <span className="text-[11px] truncate max-w-[180px]">
            {name}-resume.pdf
          </span>
        </div>
        <a href="/myresume.pdf">
          <Download className="icon" />
        </a>
        <div className="flex items-center gap-2">
          <button
            disabled={!canPrev}
            onClick={() => canPrev && setPageNumber((p) => p - 1)}
            className={`h-7 w-7 rounded-md flex items-center justify-center border border-white/10 ${
              canPrev ? "hover:bg-white/10" : "opacity-30 cursor-not-allowed"
            }`}
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>

          <span className="text-[11px] text-white/70 min-w-[80px] text-center">
            {pageNumber} / {numPages ?? "—"}
          </span>

          <button
            disabled={!canNext}
            onClick={() => canNext && setPageNumber((p) => p + 1)}
            className={`h-7 w-7 rounded-md flex items-center justify-center border border-white/10 ${
              canNext ? "hover:bg-white/10" : "opacity-30 cursor-not-allowed"
            }`}
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          <div className="ml-3 flex items-center gap-1.5">
            <button
              onClick={() => setScale((s) => Math.max(0.6, s - 0.1))}
              className="h-7 w-7 rounded-md flex items-center justify-center border border-white/10 hover:bg-white/10"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] text-white/70 w-10 text-center">
              {Math.round(scale * 100)}%
            </span>
            <button
              onClick={() => setScale((s) => Math.min(2, s + 0.1))}
              className="h-7 w-7 rounded-md flex items-center justify-center border border-white/10 hover:bg-white/10"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Content area */}
      <div className="bg-[#050608] h-[calc(100%-44px)] flex items-center justify-center overflow-auto p-4">
        <div className="bg-[#111217] rounded-lg border border-white/5 shadow-inner px-4 py-4">
          <Document
            file="/myresume.pdf"
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading={
              <div className="text-xs text-white/60 px-4 py-8">
                Loading PDF…
              </div>
            }
            error={
              <div className="text-xs text-red-400 px-4 py-8">
                {loadError || "Failed to load PDF."}
              </div>
            }
          >
            <Page
              pageNumber={pageNumber}
              scale={scale}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          </Document>
        </div>
      </div>
    </div>
  );
};

const ResumeWindow = WindowWrapper(Resume, "resume");
export default ResumeWindow;
