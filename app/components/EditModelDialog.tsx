"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface EditModelDialogProps {
  title?: string;
  modelName: string;
  onClose: () => void;
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function UploadIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-muted-foreground opacity-40">
      <path d="M12 16V4M12 4L8 8M12 4L16 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 14V18C4 19.1 4.9 20 6 20H18C19.1 20 20 19.1 20 18V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FileUploadBox({ label }: { label: string }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center py-2 px-4 min-h-[80px] bg-muted/30 border border-dashed border-border/60 rounded cursor-pointer hover:border-border transition-colors">
      <UploadIcon />
      <span className="text-xs font-medium text-foreground/90 leading-4 text-center mt-1">
        {label}
      </span>
    </div>
  );
}

function ChevronDownIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-muted-foreground">
      <path d="M3 5L6 8L9 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M6 2V10M2 6H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function FieldLabel({ label, required }: { label: string; required?: boolean }) {
  return (
    <div className="flex items-start">
      {required && (
        <span className="text-sm font-medium text-grape-accent leading-5 mr-0.5">*</span>
      )}
      <span className="text-sm font-medium text-foreground leading-5">{label}</span>
    </div>
  );
}

function SelectField({ placeholder }: { placeholder: string }) {
  return (
    <button className="flex items-center justify-between w-full max-w-[480px] h-8 px-2 border border-border rounded text-left">
      <span className="text-xs text-muted-foreground/60 leading-4">{placeholder}</span>
      <ChevronDownIcon />
    </button>
  );
}

function OptionButton({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center min-w-[52px] h-8 px-3 rounded-lg text-[13px] font-medium leading-4 whitespace-nowrap transition-colors ${
        selected
          ? "bg-grape-accent/10 border border-grape-accent text-grape-accent"
          : "border border-border/60 text-foreground hover:border-border"
      }`}
    >
      {label}
    </button>
  );
}

export default function EditModelDialog({ title = "Edit", modelName, onClose }: EditModelDialogProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [name, setName] = useState(modelName);
  const [license, setLicense] = useState<"personal" | "project">("personal");
  const [aiGenerate, setAiGenerate] = useState<"yes" | "no">("yes");
  const [pricing, setPricing] = useState<string>("free");
  const [customPrice, setCustomPrice] = useState("");
  const [tags] = useState<string[]>(["morden"]);
  const [agreed, setAgreed] = useState(false);

  const handleClose = useCallback(() => onClose(), [onClose]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") handleClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [handleClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-5" onClick={handleClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <div
        ref={panelRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[1040px] max-h-full flex flex-col bg-background rounded-lg shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-2 border-b border-border shrink-0">
          <div className="flex items-center gap-2 px-4">
            <span className="text-[13px] font-medium text-foreground leading-5">{title}</span>
          </div>
          <button
            onClick={handleClose}
            className="flex items-center justify-center w-10 h-10 rounded text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto">
          <div className="flex flex-col gap-6 px-10 py-6">

            {/* Model Files */}
            <div className="flex flex-col gap-4">
              <div>
                <FieldLabel label="Model Files" required />
                <p className="text-[13px] text-muted-foreground leading-4 mt-1">
                  Add up single or an archive ZIP, RAR, 7z file pre format ; Max Size : 1000MB
                </p>
              </div>
              <div className="flex gap-4">
                {[".d5a", ".skp", ".obj", ".fbx", ".3dsmax"].map((fmt) => (
                  <FileUploadBox key={fmt} label={fmt} />
                ))}
              </div>
            </div>

            {/* Model Images */}
            <div className="flex flex-col gap-4">
              <div>
                <FieldLabel label="Model Images" required />
                <p className="text-[13px] text-muted-foreground leading-4 mt-1">
                  Add up max 10 images and choose one as the thumbnail cover.
                </p>
              </div>
              <div className="grid grid-cols-5 gap-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="relative aspect-[3/2] rounded bg-muted overflow-hidden"
                  >
                    {i === 0 && (
                      <div className="absolute top-1 left-1 px-1 py-0.5 rounded-sm bg-black/70 text-[11px] font-semibold text-white leading-[14px]">
                        Cover
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex flex-col items-center justify-center py-4 px-4 bg-muted/30 border border-dashed border-border/60 rounded cursor-pointer hover:border-border transition-colors">
                <UploadIcon />
                <span className="text-xs font-medium text-foreground/90 leading-4 mt-1">
                  Browse or Drag &amp; Drop
                </span>
                <span className="text-xs text-muted-foreground/60 leading-4 mt-1 text-center">
                  Supported formats : .png, .jpg, .jpeg, .webp; Max Size : 50MB
                </span>
              </div>
            </div>

            {/* Name */}
            <div className="flex flex-col gap-2">
              <FieldLabel label="Name" required />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="your model name"
                className="w-full max-w-[480px] h-10 px-3 bg-muted/30 rounded-lg text-[13px] text-foreground placeholder:text-muted-foreground/60 leading-4 outline-none focus:ring-1 focus:ring-ring"
              />
            </div>

            {/* Category */}
            <div className="flex flex-col gap-2">
              <FieldLabel label="Category" required />
              <SelectField placeholder="Please Select" />
            </div>

            {/* Style */}
            <div className="flex flex-col gap-2">
              <FieldLabel label="Style" />
              <SelectField placeholder="Please Select" />
            </div>

            {/* Tags */}
            <div className="flex flex-col gap-2">
              <FieldLabel label="Tags" />
              <div className="flex items-center gap-2 flex-wrap">
                {tags.map((tag) => (
                  <div
                    key={tag}
                    className="flex items-center gap-1 h-6 px-2 bg-accent rounded text-xs text-foreground"
                  >
                    {tag}
                    <button className="flex items-center justify-center w-4 h-4 text-muted-foreground hover:text-foreground">
                      <CloseIcon />
                    </button>
                  </div>
                ))}
                <button className="flex items-center gap-1 h-6 px-2 border border-border rounded text-xs text-foreground hover:bg-accent transition-colors">
                  <PlusIcon />
                  Add
                </button>
              </div>
            </div>

            {/* License */}
            <div className="flex flex-col gap-2">
              <FieldLabel label="License" />
              <div className="flex items-center gap-2">
                <OptionButton label="Personal" selected={license === "personal"} onClick={() => setLicense("personal")} />
                <OptionButton label="Project" selected={license === "project"} onClick={() => setLicense("project")} />
              </div>
            </div>

            {/* AI Generate */}
            <div className="flex flex-col gap-2">
              <FieldLabel label="AI Generate" />
              <div className="flex items-center gap-2">
                <OptionButton label="Yes" selected={aiGenerate === "yes"} onClick={() => setAiGenerate("yes")} />
                <OptionButton label="No" selected={aiGenerate === "no"} onClick={() => setAiGenerate("no")} />
              </div>
            </div>

            {/* Pricing */}
            <div className="flex flex-col gap-4">
              <div>
                <FieldLabel label="Pricing" required />
                <p className="text-[13px] text-muted-foreground leading-4 mt-1">
                  It&apos;s recommended to upload .d5a format.
                </p>
              </div>
              <div className="flex items-center gap-2">
                {["free", "$4.9", "$5.9", "$6.9"].map((opt) => (
                  <OptionButton
                    key={opt}
                    label={opt === "free" ? "Free" : opt}
                    selected={pricing === opt}
                    onClick={() => setPricing(opt)}
                  />
                ))}
                <div className="flex items-center h-8 px-2 bg-muted/30 rounded-lg">
                  <span className="text-xs text-muted-foreground/60 mr-1">$</span>
                  <input
                    type="text"
                    value={customPrice}
                    onChange={(e) => {
                      setCustomPrice(e.target.value);
                      setPricing("custom");
                    }}
                    placeholder="Custom"
                    className="w-14 bg-transparent text-xs text-muted-foreground leading-4 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Agreement */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setAgreed(!agreed)}
                className={`flex items-center justify-center w-5 h-5 rounded-sm border shrink-0 transition-colors ${
                  agreed ? "bg-grape-accent border-grape-accent" : "bg-muted/60 border-border/60"
                }`}
              >
                {agreed && (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2.5 6L5 8.5L9.5 3.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
              <span className="text-xs text-foreground/80 leading-4">
                By uploading, you agree to the{" "}
                <span className="text-grape-accent font-medium cursor-pointer">
                  Technical Service Agreement
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 p-4 border-t border-border shrink-0">
          <button
            onClick={handleClose}
            className="flex items-center justify-center h-10 px-4 border border-border rounded text-sm font-semibold text-foreground hover:bg-accent transition-colors"
          >
            Cancel
          </button>
          <button className="flex items-center justify-center h-10 px-4 bg-grape-accent rounded text-sm font-semibold text-white hover:bg-grape-accent/90 transition-colors">
            Publish
          </button>
        </div>
      </div>
    </div>
  );
}
