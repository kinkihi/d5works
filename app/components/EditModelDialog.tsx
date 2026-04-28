"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { toast } from "sonner";

interface EditModelDialogProps {
  title?: string;
  modelName: string;
  onClose: () => void;
}

const CATEGORIES: Record<string, string[]> = {
  "Architecture": ["Residential Buildings", "Commercial Buildings", "Interior Spaces", "Landscape & Outdoor", "Public Buildings"],
  "Furniture": ["Living Room", "Bedroom", "Dining Room", "Office", "Outdoor"],
  "Vehicles": ["Cars", "Trucks", "Motorcycles", "Aircraft", "Boats"],
  "Plants & Nature": ["Trees", "Flowers", "Grass & Ground Cover", "Rocks & Terrain", "Water Features"],
  "People & Characters": ["Realistic", "Stylized", "Silhouettes", "Groups", "Single"],
  "Lighting": ["Indoor", "Outdoor", "Decorative", "Technical", "Natural"],
  "Decorations": ["Wall Art", "Sculptures", "Vases", "Rugs & Carpets", "Accessories"],
};

const STYLES = [
  "Modern", "Contemporary", "Minimalist", "Industrial", "Scandinavian",
  "Bohemian", "Traditional", "Art Deco", "Mid-Century Modern", "Rustic",
  "Mediterranean", "Japandi", "Coastal", "French Country", "Transitional",
  "Eclectic", "Hollywood Regency",
];

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1" />
      <path d="M8 7V11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="8" cy="5.25" r="0.75" fill="currentColor" />
    </svg>
  );
}

function SmallCloseIcon() {
  return (
    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
      <path d="M2 2L6 6M6 2L2 6" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
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

function LoadingIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="animate-spin">
      <path d="M8 1.5C4.41 1.5 1.5 4.41 1.5 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M11.25 2.5H6.25C5.56 2.5 5 3.06 5 3.75V16.25C5 16.94 5.56 17.5 6.25 17.5H13.75C14.44 17.5 15 16.94 15 16.25V6.25L11.25 2.5Z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11.25 2.5V6.25H15" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TrashOverlayIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M13.5 3.5H2.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.5 6.5V10.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.5 6.5V10.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12.5 4V13C12.5 13.1326 12.4473 13.2598 12.3536 13.3536C12.2598 13.4473 12.1326 13.5 12 13.5H4C3.86739 13.5 3.74021 13.4473 3.64645 13.3536C3.55268 13.2598 3.5 13.1326 3.5 13V4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10.5 3V2.5C10.5 2.23478 10.3946 1.98043 10.2071 1.79289C10.0196 1.60536 9.76522 1.5 9.5 1.5H6.5C6.23478 1.5 5.98043 1.60536 5.79289 1.79289C5.60536 1.98043 5.5 2.23478 5.5 2.5V3" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SlidersIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M2.5 5.5H8.5" stroke="currentColor" strokeLinecap="round" />
      <path d="M7.5 10.5H13.5" stroke="currentColor" strokeLinecap="round" />
      <path d="M11.5 5.5H13.5" stroke="currentColor" strokeLinecap="round" />
      <path d="M2.5 10.5H4.5" stroke="currentColor" strokeLinecap="round" />
      <path d="M11.5 5.5C11.5 6.32843 10.8284 7 10 7C9.17157 7 8.5 6.32843 8.5 5.5C8.5 4.67157 9.17157 4 10 4C10.8284 4 11.5 4.67157 11.5 5.5Z" stroke="currentColor" />
      <path d="M7.5 10.5C7.5 11.3284 6.82843 12 6 12C5.17157 12 4.5 11.3284 4.5 10.5C4.5 9.67157 5.17157 9 6 9C6.82843 9 7.5 9.67157 7.5 10.5Z" stroke="currentColor" />
    </svg>
  );
}

function UploadIcon24() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-muted-foreground">
      <path d="M12 16V4M12 4L8 8M12 4L16 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 14V18C4 19.1 4.9 20 6 20H18C19.1 20 20 19.1 20 18V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function StarFallIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M5.86475 1.36426L7.3921 4.33691L10.3647 5.86426L7.3921 7.39161L5.86475 10.3643L4.3374 7.39161L1.36475 5.86426L4.3374 4.33691L5.86475 1.36426Z" stroke="currentColor" strokeLinejoin="round" />
      <path d="M9.79639 10.7961L10.4752 12.1173L11.7964 12.7961L10.4752 13.475L9.79639 14.7961L9.11756 13.475L7.79639 12.7961L9.11756 12.1173L9.79639 10.7961Z" stroke="currentColor" strokeLinejoin="round" />
      <path d="M13.0493 6.54907L13.5584 7.53996L14.5493 8.04907L13.5584 8.55819L13.0493 9.54907L12.5402 8.55819L11.5493 8.04907L12.5402 7.53996L13.0493 6.54907Z" stroke="currentColor" strokeLinejoin="round" />
    </svg>
  );
}

function ModelFileCard({
  file,
  onRemove,
  onUpload,
}: {
  file: { format: string; status: string; filename?: string; progress?: number };
  onRemove: () => void;
  onUpload: (f: File) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [hovered, setHovered] = useState(false);

  const formatToAccept: Record<string, string> = {
    ".d5a": ".d5a,.zip",
    ".skp": ".skp",
    ".obj": ".obj",
    ".fbx": ".fbx",
    ".3ds": ".3ds",
  };

  if (file.status === "uploading") {
    return (
      <div className="flex flex-1 min-w-0 h-[80px] rounded-lg overflow-hidden relative">
        <div className="absolute inset-0 bg-black/[0.03] dark:bg-white/[0.03] backdrop-blur-[50px] flex flex-col items-center justify-center gap-2 py-1">
          <div className="text-foreground/60">
            <LoadingIcon />
          </div>
          <div className="text-xs text-foreground/60 text-center leading-4">
            <p>Uploading</p>
            <p>{file.progress ?? 0}%</p>
          </div>
        </div>
      </div>
    );
  }

  if (file.status === "uploaded") {
    return (
      <div
        className="flex flex-1 min-w-0 h-[80px] rounded-lg overflow-hidden relative border border-black/[0.06] dark:border-white/[0.06]"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="absolute top-1 left-1 z-10 flex items-center px-1 py-0.5 rounded backdrop-blur-[50px] bg-black/[0.04] dark:bg-[rgba(26,29,34,0.72)] border border-black/[0.08] dark:border-white/[0.1]">
          <span className="text-[11px] font-medium text-foreground/80 leading-[14px]">{file.format}</span>
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 p-2">
          <div className="text-muted-foreground opacity-40">
            <FileIcon />
          </div>
          <span className="text-xs text-foreground/80 text-center leading-4 truncate w-full">
            {file.filename}
          </span>
        </div>
        {hovered && (
          <div className="absolute inset-0 z-20 bg-black/30 flex items-end p-2">
            <button
              onClick={(e) => { e.stopPropagation(); onRemove(); }}
              className="flex items-center justify-center w-6 h-6 rounded backdrop-blur-[50px] bg-white/80 dark:bg-[rgba(26,29,34,0.72)] text-black dark:text-white"
            >
              <TrashOverlayIcon />
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className="flex flex-1 flex-col items-center justify-center min-w-0 h-[80px] bg-black/[0.03] dark:bg-white/[0.03] border border-dashed border-black/10 dark:border-white/10 rounded-lg cursor-pointer hover:border-black/20 dark:hover:border-white/20 transition-colors"
      onClick={() => fileInputRef.current?.click()}
    >
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept={formatToAccept[file.format] || "*"}
        onChange={(e) => {
          const selected = e.target.files?.[0];
          if (selected) onUpload(selected);
          e.target.value = "";
        }}
      />
      <UploadIcon />
      <span className="text-xs font-medium text-foreground/90 text-center leading-4 mt-1">
        {file.format}
      </span>
    </div>
  );
}

function BackArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M10 4L6 8L10 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CoverThumbnailSetting({
  images,
  selectedImageIndex,
  onSelectImage,
  onBack,
  onSave,
}: {
  images: { id: string; isCover: boolean }[];
  selectedImageIndex: number;
  onSelectImage: (index: number) => void;
  onBack: () => void;
  onSave: () => void;
}) {
  const cropAreaRef = useRef<HTMLDivElement>(null);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [isScaling, setIsScaling] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, ox: 0, oy: 0 });
  const scaleStart = useRef({ x: 0, y: 0, startScale: 1, corner: "" as string });

  const handleImageMouseDown = useCallback((e: React.MouseEvent) => {
    if (isScaling) return;
    e.preventDefault();
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY, ox: offsetX, oy: offsetY };
  }, [offsetX, offsetY, isScaling]);

  const handleCornerMouseDown = useCallback((e: React.MouseEvent, corner: string) => {
    e.preventDefault();
    e.stopPropagation();
    setIsScaling(true);
    scaleStart.current = { x: e.clientX, y: e.clientY, startScale: scale, corner };
  }, [scale]);

  useEffect(() => {
    if (!isDragging && !isScaling) return;
    const handleMove = (e: MouseEvent) => {
      if (isDragging) {
        const dx = e.clientX - dragStart.current.x;
        const dy = e.clientY - dragStart.current.y;
        setOffsetX(Math.max(-150, Math.min(150, dragStart.current.ox + dx)));
        setOffsetY(Math.max(-120, Math.min(120, dragStart.current.oy + dy)));
      }
      if (isScaling) {
        const { corner } = scaleStart.current;
        const dx = e.clientX - scaleStart.current.x;
        const dy = e.clientY - scaleStart.current.y;
        const sign = (corner === "br" || corner === "tr") ? 1 : -1;
        const delta = (dx * sign + dy * (corner === "br" || corner === "bl" ? 1 : -1)) / 2;
        const newScale = Math.max(0.5, Math.min(2, scaleStart.current.startScale + delta / 200));
        setScale(newScale);
      }
    };
    const handleUp = () => { setIsDragging(false); setIsScaling(false); };
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
    };
  }, [isDragging, isScaling]);

  const mockImg = "/mock-cover.png";

  const previewStyle = {
    transform: `translate(${offsetX * 0.3}px, ${offsetY * 0.3}px) scale(${scale})`,
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-2 border-b border-border shrink-0">
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="flex items-center justify-center w-10 h-10 rounded text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          >
            <BackArrowIcon />
          </button>
          <span className="text-[13px] font-medium text-foreground leading-5">Cover Thumbnail Setting</span>
        </div>
        <button
          onClick={onBack}
          className="flex items-center justify-center w-10 h-10 rounded text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
        >
          <CloseIcon />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-5">
          {/* Left: Crop area (3 cols) */}
          <div className="col-span-3 flex flex-col gap-4 p-6 border-r border-border">
            <div className="flex flex-col gap-1">
              <span className="text-[14px] font-medium text-foreground leading-5">Scale or reposition</span>
              <span className="text-[13px] text-muted-foreground leading-4">
                Do not include watermarks, QR codes, or prohibited content.
              </span>
            </div>

            {/* Crop editor */}
            <div
              ref={cropAreaRef}
              className="relative w-full aspect-[3/2] rounded-lg overflow-hidden cursor-move select-none"
              onMouseDown={handleImageMouseDown}
            >
              {/* Background image (draggable + scalable) */}
              <img
                src={mockImg}
                alt=""
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                draggable={false}
                style={{ transform: `translate(${offsetX}px, ${offsetY}px) scale(${scale})` }}
              />

              {/* Dark overlay with cutout via clip-path (dims area outside crop mask) */}
              <div className="absolute inset-0 pointer-events-none" style={{
                background: "rgba(0,0,0,0.45)",
                clipPath: "polygon(0% 0%, 0% 100%, 24% 100%, 24% 11%, 76% 11%, 76% 89%, 24% 89%, 24% 100%, 100% 100%, 100% 0%)",
              }} />

              {/* Crop mask white border */}
              <div
                className="absolute border-2 border-white rounded pointer-events-none"
                style={{ left: "24%", top: "11%", right: "24%", bottom: "11%" }}
              />

              {/* Four corner L-bracket handles at the outer edges of the entire crop area */}
              {/* Top-left */}
              <div
                className="absolute top-1 left-1 w-5 h-5 cursor-nwse-resize z-10"
                onMouseDown={(e) => handleCornerMouseDown(e, "tl")}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="absolute inset-0">
                  <path d="M2 14V4C2 2.895 2.895 2 4 2H14" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              {/* Top-right */}
              <div
                className="absolute top-1 right-1 w-5 h-5 cursor-nesw-resize z-10"
                onMouseDown={(e) => handleCornerMouseDown(e, "tr")}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="absolute inset-0">
                  <path d="M6 2H16C17.105 2 18 2.895 18 4V14" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              {/* Bottom-left */}
              <div
                className="absolute bottom-1 left-1 w-5 h-5 cursor-nesw-resize z-10"
                onMouseDown={(e) => handleCornerMouseDown(e, "bl")}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="absolute inset-0">
                  <path d="M14 18H4C2.895 18 2 17.105 2 16V6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              {/* Bottom-right */}
              <div
                className="absolute bottom-1 right-1 w-5 h-5 cursor-nwse-resize z-10"
                onMouseDown={(e) => handleCornerMouseDown(e, "br")}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="absolute inset-0">
                  <path d="M6 18H16C17.105 18 18 17.105 18 16V6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>

            {/* Change cover row */}
            <div className="flex flex-col gap-4">
              <span className="text-[14px] font-medium text-foreground leading-5">Change cover</span>
              <div className="flex gap-2 h-10">
                {images.map((img, i) => (
                  <button
                    key={img.id}
                    onClick={() => { onSelectImage(i); setOffsetX(0); setOffsetY(0); setScale(1); }}
                    className={`flex-1 min-w-0 rounded overflow-hidden relative ${
                      i === selectedImageIndex
                        ? "outline outline-2 outline-offset-1 outline-foreground/30"
                        : "opacity-60 hover:opacity-100"
                    } transition-opacity`}
                  >
                    <img src={mockImg} alt="" className="absolute inset-0 w-full h-full object-cover" draggable={false} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Preview (2 cols) */}
          <div className="col-span-2 flex flex-col gap-4 p-6">
            <span className="text-[14px] font-medium text-foreground leading-5">Preview</span>
            <div className="flex gap-4">
              {/* Preview card 1 — Light theme */}
              <div className="flex-1 flex flex-col gap-2 bg-white border border-black/[0.06] rounded-lg p-2">
                <div className="w-full aspect-square rounded-lg overflow-hidden relative bg-neutral-100">
                  <img
                    src={mockImg}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                    draggable={false}
                    style={previewStyle}
                  />
                </div>
                <div className="flex flex-col px-1 pb-1">
                  <span className="text-[14px] text-neutral-900 leading-4 truncate">Model Name</span>
                  <span className="text-[14px] font-semibold text-neutral-900 leading-5 mt-1">$6.90</span>
                </div>
              </div>
              {/* Preview card 2 — Dark theme */}
              <div className="flex-1 flex flex-col gap-2 bg-[#111419] border border-white/[0.06] rounded-lg p-2">
                <div className="w-full aspect-square rounded-lg overflow-hidden relative bg-white/[0.06]">
                  <img
                    src={mockImg}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                    draggable={false}
                    style={previewStyle}
                  />
                </div>
                <div className="flex flex-col px-1 pb-1">
                  <span className="text-[14px] text-white leading-4 truncate">Model Name</span>
                  <span className="text-[14px] font-semibold text-white leading-5 mt-1">$6.90</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-end gap-2 p-4 border-t border-border shrink-0">
        <button
          onClick={onBack}
          className="flex items-center justify-center h-8 px-3 border border-border rounded text-[13px] font-semibold text-foreground hover:bg-accent transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={onSave}
          className="flex items-center justify-center h-8 px-3 bg-grape-accent rounded text-[13px] font-semibold text-white hover:bg-grape-accent/90 transition-colors"
        >
          Save
        </button>
      </div>
    </div>
  );
}

function ModelImageCard({
  imageIndex,
  isCover,
  src,
  onSetCover,
  onRemove,
  onOpenCoverSetting,
}: {
  imageIndex: number;
  isCover: boolean;
  src?: string;
  onSetCover: () => void;
  onRemove: () => void;
  onOpenCoverSetting: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative w-[calc((100%_-_64px)/5)] h-[120px] rounded-lg overflow-hidden shrink-0"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {src ? (
        <img src={src} alt="" className="absolute inset-0 w-full h-full object-cover" draggable={false} />
      ) : (
        <div className={`absolute inset-0 bg-muted ${imageIndex % 2 === 0 ? "opacity-80" : "opacity-60"}`} />
      )}

      {isCover && (
        <div className="absolute top-1 left-1 z-10 flex items-center px-1 py-0.5 rounded-sm backdrop-blur-[50px] bg-white/80 dark:bg-[rgba(26,29,34,0.72)]">
          <span className="text-[11px] font-semibold text-black dark:text-white leading-[14px]">Cover</span>
        </div>
      )}

      {hovered && (
        <div className="absolute inset-0 z-20 bg-black/30 flex flex-col justify-end">
          <div className="flex items-center gap-1 p-2">
            <button
              onClick={(e) => { e.stopPropagation(); onRemove(); }}
              className="flex items-center justify-center w-6 h-6 rounded backdrop-blur-[50px] bg-white/80 dark:bg-[rgba(26,29,34,0.72)] text-black dark:text-white shrink-0"
            >
              <TrashOverlayIcon />
            </button>
            {!isCover && (
              <button
                onClick={(e) => { e.stopPropagation(); onSetCover(); }}
                className="flex flex-1 items-center justify-center h-6 rounded backdrop-blur-[50px] bg-white/80 dark:bg-[rgba(26,29,34,0.72)] text-black dark:text-white text-xs"
              >
                Set as cover
              </button>
            )}
            <button
              onClick={(e) => { e.stopPropagation(); onOpenCoverSetting(); }}
              className="flex items-center justify-center w-6 h-6 rounded backdrop-blur-[50px] bg-white/80 dark:bg-[rgba(26,29,34,0.72)] text-black dark:text-white shrink-0 ml-auto"
            >
              <SlidersIcon />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function ImageUploadButton({ onUpload }: { onUpload: (files: File[]) => void }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`flex flex-1 min-w-[calc((100%_-_64px)/5)] h-[120px] flex-col items-center justify-center gap-1 rounded-lg border border-dashed cursor-pointer transition-colors ${
        hovered
          ? "bg-black/[0.06] dark:bg-white/[0.06] border-black/10 dark:border-white/10"
          : "bg-black/[0.03] dark:bg-white/[0.03] border-black/10 dark:border-white/10"
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => fileInputRef.current?.click()}
    >
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept=".png,.jpg,.jpeg"
        multiple
        onChange={(e) => {
          const selected = e.target.files;
          if (selected && selected.length > 0) onUpload(Array.from(selected));
          e.target.value = "";
        }}
      />
      <div className={`transition-opacity ${hovered ? "opacity-100" : "opacity-40"}`}>
        <UploadIcon24 />
      </div>
      {hovered ? (
        <p className="text-xs font-medium text-foreground/90 text-center leading-4 px-4">
          The width and height of the image must be at least 1000 pixels
        </p>
      ) : (
        <div className="flex flex-col items-center gap-1">
          <span className="text-xs font-medium text-foreground/90 text-center leading-4">
            Browse or Drag &amp; Drop
          </span>
          <span className="text-xs text-muted-foreground/40 text-center leading-4 px-4">
            Supported formats : .png, .jpg ; Max Size : 15MB
          </span>
        </div>
      )}
    </div>
  );
}

function ChevronDown({ className = "" }: { className?: string }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={`text-muted-foreground shrink-0 ${className}`}>
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

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="shrink-0">
      <path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRightSmall() {
  return (
    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" className="shrink-0 opacity-40">
      <path d="M3 1.5L6 4L3 6.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FieldLabel({ label, required, info, tooltip }: {
  label: string;
  required?: boolean;
  info?: boolean;
  tooltip?: { title: string; body: string }[];
}) {
  const [showTip, setShowTip] = useState(false);
  const iconRef = useRef<HTMLSpanElement>(null);
  const [tipPos, setTipPos] = useState({ x: 0, y: 0 });

  const handleEnter = useCallback(() => {
    if (iconRef.current) {
      const rect = iconRef.current.getBoundingClientRect();
      setTipPos({ x: rect.left + rect.width / 2, y: rect.bottom + 8 });
    }
    setShowTip(true);
  }, []);

  return (
    <div className="flex items-center gap-1">
      <span className="relative text-sm font-medium text-foreground leading-5">
        {required && (
          <span
            className="absolute top-0 right-full pr-1 text-sm font-medium text-grape-accent leading-5"
            aria-hidden
          >
            *
          </span>
        )}
        {label}
      </span>
      {info && (
        <span
          ref={iconRef}
          className="inline-flex cursor-help"
          onMouseEnter={handleEnter}
          onMouseLeave={() => setShowTip(false)}
        >
          <InfoIcon />
          {showTip && tooltip && (
            <div
              className="fixed z-[9999] w-[320px] bg-foreground text-background rounded-lg p-4 shadow-xl"
              style={{ left: tipPos.x, top: tipPos.y, transform: "translateX(-50%)" }}
            >
              <div className="flex flex-col gap-3">
                {tooltip.map((section) => (
                  <div key={section.title} className="flex flex-col gap-0.5">
                    <span className="text-[12px] font-semibold leading-4">{section.title}</span>
                    <span className="text-[11px] opacity-70 leading-[15px] whitespace-pre-line">{section.body}</span>
                  </div>
                ))}
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-2 h-2 bg-foreground rotate-45" />
            </div>
          )}
        </span>
      )}
    </div>
  );
}

function useClickOutside(ref: React.RefObject<HTMLElement | null>, open: boolean, onClose: () => void) {
  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [ref, open, onClose]);
}

function CategorySelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const [hoveredParent, setHoveredParent] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);
  useClickOutside(ref, open, close);

  const parents = Object.keys(CATEGORIES);
  const activeParent = hoveredParent || parents[0];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => { setOpen(!open); setHoveredParent(null); }}
        className={`flex items-center justify-between w-full h-10 px-3 border rounded-lg text-left transition-colors ${
          open ? "border-grape-accent ring-2 ring-grape-accent/20" : "border-border"
        }`}
      >
        <span className={`text-xs leading-4 truncate ${value ? "text-foreground" : "text-muted-foreground/60"}`}>
          {value || "Please Select"}
        </span>
        <ChevronDown className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute z-50 top-full left-0 mt-1 w-full min-w-[420px] bg-popover border border-border rounded-lg shadow-lg overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150">
          <div className="flex">
            <div className="w-1/2 border-r border-border max-h-[280px] overflow-y-auto py-1">
              {parents.map(parent => (
                <button
                  key={parent}
                  onMouseEnter={() => setHoveredParent(parent)}
                  className={`flex items-center justify-between w-full px-3 py-2 text-[13px] text-left transition-colors ${
                    activeParent === parent ? "bg-grape text-grape-accent" : "text-foreground hover:bg-accent"
                  }`}
                >
                  <span>{parent}</span>
                  <ChevronRightSmall />
                </button>
              ))}
            </div>
            <div className="w-1/2 max-h-[280px] overflow-y-auto py-1">
              {CATEGORIES[activeParent]?.map(sub => (
                <button
                  key={sub}
                  onClick={() => { onChange(sub); setOpen(false); }}
                  className={`flex items-center justify-between w-full px-3 py-2 text-[13px] text-left transition-colors ${
                    value === sub ? "bg-grape text-grape-accent" : "text-foreground hover:bg-accent"
                  }`}
                >
                  <span>{sub}</span>
                  {value === sub && <CheckIcon />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StyleSelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);
  useClickOutside(ref, open, close);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center justify-between w-full h-10 px-3 border rounded-lg text-left transition-colors ${
          open ? "border-grape-accent ring-2 ring-grape-accent/20" : "border-border"
        }`}
      >
        {value ? (
          <span className="flex items-center gap-1.5 h-6 px-2 bg-grape rounded text-xs text-grape-accent">
            {value}
            <span
              role="button"
              onClick={(e) => { e.stopPropagation(); onChange(""); }}
              className="flex items-center justify-center w-3.5 h-3.5 rounded-sm hover:bg-grape-accent/20 cursor-pointer"
            >
              <SmallCloseIcon />
            </span>
          </span>
        ) : (
          <span className="text-xs text-muted-foreground/60 leading-4">Please Select</span>
        )}
        <ChevronDown className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute z-50 top-full left-0 mt-1 w-full bg-popover border border-border rounded-lg shadow-lg max-h-[280px] overflow-y-auto py-1 animate-in fade-in slide-in-from-top-1 duration-150">
          {STYLES.map(style => (
            <button
              key={style}
              onClick={() => { onChange(value === style ? "" : style); setOpen(false); }}
              className={`flex items-center justify-between w-full px-3 py-2 text-[13px] text-left transition-colors ${
                value === style ? "bg-grape text-grape-accent" : "text-foreground hover:bg-accent"
              }`}
            >
              <span>{style}</span>
              {value === style && <CheckIcon />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function RadioIcon({ selected }: { selected: boolean }) {
  if (selected) {
    return (
      <svg width="12" height="14" viewBox="0 0 16 16" fill="none" className="shrink-0">
        <circle cx="8" cy="8" r="7" stroke="#8d4eff" strokeWidth="2" />
        <circle cx="8" cy="8" r="4" fill="#8d4eff" />
      </svg>
    );
  }
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="shrink-0">
      <circle cx="8" cy="8" r="7" className="stroke-black/20 dark:stroke-white/20" strokeWidth="1.5" />
    </svg>
  );
}

function CheckboxIcon({ checked }: { checked: boolean }) {
  if (checked) {
    return (
      <svg width="16" height="16" viewBox="0 0 20 20" fill="none" className="shrink-0">
        <rect x="1" y="1" width="18" height="18" rx="2" fill="#8d4eff" />
        <path d="M6 10L9 13L14 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" className="shrink-0">
      <rect x="1.5" y="1.5" width="17" height="17" rx="2" className="stroke-black/30 dark:stroke-white/30 fill-black/10 dark:fill-white/10" strokeWidth="1" />
    </svg>
  );
}

function RadioCard({
  title,
  description,
  learnMoreUrl,
  selected,
  onClick,
}: {
  title: string;
  description: string;
  learnMoreUrl?: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-1 min-w-0 items-start p-2 rounded-lg text-left transition-colors ${
        selected
          ? "bg-grape border border-grape-accent"
          : "border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20"
      }`}
    >
      <div className="flex flex-col flex-1 min-w-0">
        <div className="flex items-center gap-2 py-1">
          <RadioIcon selected={selected} />
          <span className={`text-[13px] font-medium leading-4 ${
            selected ? "text-grape-accent" : "text-foreground"
          }`}>
            {title}
          </span>
        </div>
        <p className="text-[13px] text-muted-foreground leading-[18px] pl-5 py-1">
          {description}
          {learnMoreUrl && (
            <>
              {" "}
              <a href={learnMoreUrl} target="_blank" rel="noopener noreferrer" className="text-grape-accent underline">
                Learn more
              </a>
            </>
          )}
        </p>
      </div>
    </button>
  );
}

export default function EditModelDialog({ title = "Upload", modelName, onClose }: EditModelDialogProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const tagInputRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState(modelName);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [style, setStyle] = useState("");
  const [license, setLicense] = useState<"personal" | "project">("personal");
  const [aiDisclosure, setAiDisclosure] = useState<"none" | "contains">("none");
  const [pricing, setPricing] = useState<"free" | "pro" | "custom">("free");
  const [customPrice, setCustomPrice] = useState("");
  const [publishUnderBrand, setPublishUnderBrand] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [isAddingTag, setIsAddingTag] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [nameError, setNameError] = useState("");
  const [descError, setDescError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const isEdit = title === "Edit";
  const [modelFiles, setModelFiles] = useState(
    isEdit
      ? [
          { format: ".d5a", status: "uploaded" as const, filename: "filename.d5a / .zip" },
          { format: ".skp", status: "empty" as const },
          { format: ".obj", status: "empty" as const },
          { format: ".fbx", status: "empty" as const },
          { format: ".3ds", status: "empty" as const },
        ]
      : [
          { format: ".d5a", status: "empty" as const },
          { format: ".skp", status: "empty" as const },
          { format: ".obj", status: "empty" as const },
          { format: ".fbx", status: "empty" as const },
          { format: ".3ds", status: "empty" as const },
        ]
  );
  const [modelImages, setModelImages] = useState<{ id: string; isCover: boolean; src?: string }[]>(
    isEdit
      ? [
          { id: "1", isCover: true, src: "/mock-cover.png" },
          { id: "2", isCover: false },
          { id: "3", isCover: false },
          { id: "4", isCover: false },
          { id: "5", isCover: false },
          { id: "6", isCover: false },
          { id: "7", isCover: false },
          { id: "8", isCover: false },
          { id: "9", isCover: false },
        ]
      : []
  );
  const [coverSettingMode, setCoverSettingMode] = useState(false);
  const [coverSettingImageIndex, setCoverSettingImageIndex] = useState(0);
  const hasAutoFilled = useRef(false);
  const [uploadTipPhase, setUploadTipPhase] = useState<"banner" | "guidelines" | "dismissing" | "collapsed">(
    isEdit ? "collapsed" : "banner"
  );
  const [showGuidelinesPopover, setShowGuidelinesPopover] = useState(false);

  const validateName = useCallback((value: string) => {
    if (!value.trim()) return "Name is required";
    if (/[^\x00-\x7F]/.test(value)) return "Only English characters are allowed";
    if (value.length > 100) return `Name must be 100 characters or less (${value.length}/100)`;
    return "";
  }, []);

  const validateDescription = useCallback((value: string) => {
    if (value.length > 1500) return `Description must be 1,500 characters or less (${value.length}/1500)`;
    return "";
  }, []);

  const validateAll = useCallback(() => {
    const nErr = validateName(name);
    const dErr = validateDescription(description);
    setNameError(nErr);
    setDescError(dErr);
    return !nErr && !dErr;
  }, [name, description, validateName, validateDescription]);

  const autoFillOnFirstUpload = useCallback(() => {
    if (hasAutoFilled.current) return;
    hasAutoFilled.current = true;

    const prevName = name;
    const prevDesc = description;
    const prevTags = [...tags];

    setName("Draft Scene Pack");
    setDescription("A high-quality 3D scene pack featuring modern architectural elements, perfect for interior and exterior visualization projects.");
    setTags(prev => {
      const newTags = [...prev];
      if (!newTags.includes("modern")) newTags.push("modern");
      return newTags;
    });

    toast.custom((t) => (
      <div className="flex items-center w-full bg-background border border-border rounded-lg p-2 shadow-lg">
        <div className="flex flex-col flex-1 min-w-0">
          <div className="flex items-center gap-2 pl-1 pr-2 py-1">
            <StarFallIcon />
            <span className="text-xs font-medium text-foreground whitespace-nowrap">
              We&apos;ve filled in some details for you
            </span>
          </div>
          <p className="text-[11px] text-muted-foreground leading-4 pl-7 pr-2">
            Suggested title, description, and tags for the model, feel free to edit it.
          </p>
        </div>
        <div className="px-2 shrink-0">
          <button
            onClick={() => {
              setName(prevName);
              setDescription(prevDesc);
              setTags(prevTags);
              toast.dismiss(t);
            }}
            className="flex items-center justify-center h-6 px-2 bg-foreground text-background rounded text-xs font-medium"
          >
            Undo
          </button>
        </div>
      </div>
    ), { duration: 6000 });
  }, [name, description, tags]);

  const handleClose = useCallback(() => onClose(), [onClose]);

  const handleAddTag = useCallback(() => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags(prev => [...prev, trimmed]);
    }
    setTagInput("");
  }, [tagInput, tags]);

  const handleRemoveTag = useCallback((tag: string) => {
    setTags(prev => prev.filter(t => t !== tag));
  }, []);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") handleClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [handleClose]);

  useEffect(() => {
    if (isAddingTag) tagInputRef.current?.focus();
  }, [isAddingTag]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-5" onClick={handleClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <div
        ref={panelRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[1040px] max-h-full flex flex-col bg-background rounded-lg shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200"
      >
        {coverSettingMode ? (
          <CoverThumbnailSetting
            images={modelImages}
            selectedImageIndex={coverSettingImageIndex}
            onSelectImage={setCoverSettingImageIndex}
            onBack={() => setCoverSettingMode(false)}
            onSave={() => {
              const selectedId = modelImages[coverSettingImageIndex]?.id;
              if (selectedId) {
                setModelImages(prev => prev.map(img => ({
                  ...img,
                  isCover: img.id === selectedId,
                })));
              }
              setCoverSettingMode(false);
            }}
          />
        ) : (
        <>
        {/* Header */}
        <div className="flex items-center justify-between p-2 border-b border-border shrink-0">
          <div className="flex items-center gap-2 px-4">
            <span className="text-[14px] font-semibold text-foreground leading-5">{title}</span>
          </div>
          <div className="flex items-center gap-1">
            {(
              <button
                onClick={() => setShowGuidelinesPopover(true)}
                className="flex items-center justify-center w-10 h-10 rounded text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              >
                <InfoIcon />
              </button>
            )}
            <button
              onClick={handleClose}
              className="flex items-center justify-center w-10 h-10 rounded text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            >
              <CloseIcon />
            </button>
          </div>
        </div>

        {/* Upload Tip Banner — floats above content */}
        {uploadTipPhase === "banner" && (
          <div className="absolute left-6 right-6 top-[56px] z-30 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="bg-foreground text-background rounded-lg p-4 shadow-xl">
              <p className="text-[13px] font-semibold leading-5">Important for Uploader</p>
              <p className="text-[12px] opacity-70 leading-4 mt-1">
                Proof of creation is required for the content to pass review and be listed.
              </p>
              <button
                onClick={() => setUploadTipPhase("guidelines")}
                className="w-full mt-3 flex items-center justify-center h-8 bg-background text-foreground rounded text-[13px] font-semibold hover:opacity-90 transition-opacity"
              >
                Read
              </button>
            </div>
          </div>
        )}

        {/* Review Guidelines Panel — floats above content */}
        {uploadTipPhase === "guidelines" && (
          <div className="absolute left-6 right-6 top-[56px] z-30 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="bg-foreground text-background rounded-lg p-5 shadow-xl max-h-[60vh] overflow-y-auto">
              <p className="text-[14px] font-semibold leading-5">Review Guidelines</p>
              <p className="text-[12px] opacity-70 leading-4 mt-2">
                For uploaded source files (.d5a, .skp, .obj, .fbx, .max), you must upload a matching workspace screenshot in the &quot;Image Upload&quot; section below. Missing or wrong proof images will to rejection.
              </p>
              <div className="flex flex-col gap-3 mt-4">
                {[
                  { fmt: ".d5a", desc: "Upload a screenshot of the D5 viewport matching the cover image's camera angle." },
                  { fmt: ".skp", desc: "Open SketchUp with the model file visible, then capture a screenshot of the workspace showing the file name." },
                  { fmt: ".obj , .fbx", desc: "Open your modeling software with the .obj or .fbx file visible, then screenshot the workspace showing the file name. You may upload the file directly or packed in a ZIP / RAR / 7z archive." },
                  { fmt: ".max", desc: "Open 3ds Max with the .max file visible, then screenshot the workspace showing the file name. Upload the .max file packed in a ZIP / RAR / 7z archive." },
                ].map((item) => (
                  <div key={item.fmt} className="flex gap-3 items-start bg-white/[0.06] rounded-lg p-3">
                    <div className="w-[120px] h-[72px] rounded bg-white/[0.08] overflow-hidden shrink-0">
                      <img src="/mock-guideline.png" alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col gap-1 min-w-0">
                      <span className="text-[13px] font-semibold leading-5">{item.fmt}</span>
                      <span className="text-[12px] opacity-70 leading-4">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-end gap-2 mt-4">
                <a
                  href="https://d5-render.gitbook.io/d5-works/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center h-8 px-3 border border-white/20 rounded text-[12px] font-medium hover:bg-white/10 transition-colors"
                >
                  Help Center
                </a>
                <button
                  onClick={() => {
                    setUploadTipPhase("dismissing");
                    setTimeout(() => setUploadTipPhase("collapsed"), 200);
                  }}
                  className="flex items-center justify-center h-8 px-3 bg-background text-foreground rounded text-[12px] font-medium hover:opacity-90 transition-opacity"
                >
                  Got it
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Dismissing animation — mirrors the entrance */}
        {uploadTipPhase === "dismissing" && (
          <div className="absolute left-6 right-6 top-[56px] z-30 animate-out fade-out slide-out-to-top-2 duration-200 pointer-events-none">
            <div className="bg-foreground text-background rounded-lg p-5 shadow-xl overflow-hidden max-h-[60vh]">
              <p className="text-[14px] font-semibold leading-5">Review Guidelines</p>
            </div>
          </div>
        )}

        {/* Guidelines Popover (shown when clicking info icon) */}
        {showGuidelinesPopover && (
          <>
          <div className="fixed inset-0 z-40" onClick={() => setShowGuidelinesPopover(false)} />
          <div className="absolute top-14 right-2 z-50 w-[480px] animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-200">
            <div className="bg-foreground text-background rounded-lg p-5 shadow-2xl">
              <p className="text-[14px] font-semibold leading-5">Review Guidelines</p>
              <p className="text-[12px] opacity-70 leading-4 mt-2">
                For uploaded source files (.d5a, .skp, .obj, .fbx, .max), you must upload a matching workspace screenshot in the &quot;Image Upload&quot; section below. Missing or wrong proof images will to rejection.
              </p>
              <div className="flex flex-col gap-3 mt-4">
                {[
                  { fmt: ".d5a", desc: "Upload a screenshot of the D5 viewport matching the cover image's camera angle." },
                  { fmt: ".skp", desc: "Open SketchUp with the model file visible, then capture a screenshot of the workspace showing the file name." },
                  { fmt: ".obj , .fbx", desc: "Open your modeling software with the .obj or .fbx file visible, then screenshot the workspace showing the file name. You may upload the file directly or packed in a ZIP / RAR / 7z archive." },
                  { fmt: ".max", desc: "Open 3ds Max with the .max file visible, then screenshot the workspace showing the file name. Upload the .max file packed in a ZIP / RAR / 7z archive." },
                ].map((item) => (
                  <div key={item.fmt} className="flex gap-3 items-start bg-white/[0.06] rounded-lg p-3">
                    <div className="w-[120px] h-[72px] rounded bg-white/[0.08] overflow-hidden shrink-0">
                      <img src="/mock-guideline.png" alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col gap-1 min-w-0">
                      <span className="text-[13px] font-semibold leading-5">{item.fmt}</span>
                      <span className="text-[12px] opacity-70 leading-4">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-end gap-2 mt-4">
                <a
                  href="https://d5-render.gitbook.io/d5-works/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center h-8 px-3 border border-white/20 rounded text-[12px] font-medium hover:bg-white/10 transition-colors"
                >
                  Help Center
                </a>
                <button
                  onClick={() => setShowGuidelinesPopover(false)}
                  className="flex items-center justify-center h-8 px-3 bg-background text-foreground rounded text-[12px] font-medium hover:opacity-90 transition-opacity"
                >
                  Got it
                </button>
              </div>
            </div>
          </div>
          </>
        )}

        {/* Body */}
        <div className="flex-1 overflow-y-auto">
          <div className="flex flex-col gap-6 px-10 pt-6 pb-10">

            {/* Model Files */}
            <div className="flex flex-col gap-4">
              <div>
                <FieldLabel label="Model Files" required />
                <p className="text-[13px] text-muted-foreground leading-4 mt-1">
                  At least one of the following formats. Add up folder or an archive ZIP, RAR, 7z file pre format ; Max Size : 1000MB
                </p>
              </div>
              <div className="flex gap-4">
                {modelFiles.map((file) => (
                  <ModelFileCard
                    key={file.format}
                    file={file}
                    onRemove={() => {
                      setModelFiles(prev => prev.map(f =>
                        f.format === file.format ? { format: f.format, status: "empty" as const } : f
                      ));
                    }}
                    onUpload={(selected) => {
                      setModelFiles(prev => prev.map(f =>
                        f.format === file.format
                          ? { format: f.format, status: "uploaded" as const, filename: selected.name }
                          : f
                      ));
                    }}
                  />
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
              <div className="flex flex-wrap gap-4">
                {modelImages.map((image, index) => (
                  <ModelImageCard
                    key={image.id}
                    imageIndex={index}
                    isCover={image.isCover}
                    src={image.src}
                    onSetCover={() => {
                      setModelImages(prev => prev.map(img => ({
                        ...img,
                        isCover: img.id === image.id,
                      })));
                    }}
                    onRemove={() => {
                      setModelImages(prev => {
                        const next = prev.filter(img => img.id !== image.id);
                        if (image.isCover && next.length > 0) {
                          next[0] = { ...next[0], isCover: true };
                        }
                        return next;
                      });
                    }}
                    onOpenCoverSetting={() => {
                      setCoverSettingImageIndex(index);
                      setCoverSettingMode(true);
                    }}
                  />
                ))}
                {modelImages.length < 10 && (
                  <ImageUploadButton
                    onUpload={(files) => {
                      const isFirstUpload = modelImages.length === 0;
                      setModelImages(prev => {
                        const remaining = 10 - prev.length;
                        const toAdd = files.slice(0, remaining).map((f, i) => ({
                          id: `new-${Date.now()}-${i}`,
                          isCover: prev.length === 0 && i === 0,
                          src: URL.createObjectURL(f),
                        }));
                        return [...prev, ...toAdd];
                      });
                      if (isFirstUpload) autoFillOnFirstUpload();
                    }}
                  />
                )}
              </div>
            </div>

            {/* Name */}
            <div className="flex flex-col gap-2">
              <div>
                <FieldLabel label="Name" required />
                <p className="text-[13px] text-muted-foreground leading-4 mt-1">
                  English only. Up to 100 characters.
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (submitted) setNameError(validateName(e.target.value));
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      setSubmitted(true);
                      validateAll();
                    }
                  }}
                  placeholder="your model name"
                  className={`w-full h-10 px-2 bg-black/[0.03] dark:bg-white/[0.03] border rounded-lg text-[13px] text-foreground placeholder:text-muted-foreground/60 leading-4 outline-none transition-colors ${
                    nameError
                      ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                      : "border-transparent focus:border-grape-accent focus:ring-2 focus:ring-grape-accent/20"
                  }`}
                />
                {nameError && (
                  <p className="text-xs text-red-500 leading-4">{nameError}</p>
                )}
              </div>
            </div>

            {/* Category & Style */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex flex-1 flex-col gap-2 min-w-0">
                <FieldLabel label="Category" required />
                <CategorySelect value={category} onChange={setCategory} />
              </div>
              <div className="flex flex-1 flex-col gap-2 min-w-0">
                <FieldLabel label="Style" />
                <StyleSelect value={style} onChange={setStyle} />
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-2">
              <FieldLabel label="Description" />
              <div className="flex flex-col gap-1">
                <textarea
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    if (submitted) setDescError(validateDescription(e.target.value));
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      setSubmitted(true);
                      validateAll();
                    }
                  }}
                  placeholder="Describe the model's key features, style and intended use."
                  className={`w-full h-20 px-2 py-2 bg-black/[0.03] dark:bg-white/[0.03] border rounded-lg text-[13px] text-foreground placeholder:text-muted-foreground/60 leading-4 outline-none transition-colors resize-none ${
                    descError
                      ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                      : "border-transparent focus:border-grape-accent focus:ring-2 focus:ring-grape-accent/20"
                  }`}
                />
                <div className="flex items-center justify-between">
                  {descError ? (
                    <p className="text-xs text-red-500 leading-4">{descError}</p>
                  ) : <span />}
                  <span className={`text-xs leading-4 ${description.length > 1500 ? "text-red-500" : "text-muted-foreground/40"}`}>
                    {description.length}/1500
                  </span>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-col gap-2">
              <FieldLabel label="Tags" />
              <div className={`flex items-center gap-2 flex-wrap p-2 border rounded-lg transition-colors ${
                isAddingTag ? "border-grape-accent ring-2 ring-grape-accent/20" : "border-border"
              }`}>
                {tags.map((tag) => (
                  <div
                    key={tag}
                    className="flex items-center gap-1.5 h-6 px-2 bg-grape rounded text-xs text-grape-accent"
                  >
                    {tag}
                    <button
                      onClick={() => handleRemoveTag(tag)}
                      className="flex items-center justify-center w-3.5 h-3.5 rounded-sm hover:bg-grape-accent/20 transition-colors"
                    >
                      <SmallCloseIcon />
                    </button>
                  </div>
                ))}
                {isAddingTag ? (
                  <input
                    ref={tagInputRef}
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddTag();
                      }
                      if (e.key === "Escape") {
                        setTagInput("");
                        setIsAddingTag(false);
                      }
                    }}
                    onBlur={() => {
                      handleAddTag();
                      setIsAddingTag(false);
                    }}
                    placeholder="Add tag…"
                    className="h-6 px-1 bg-transparent text-xs text-foreground placeholder:text-muted-foreground/60 outline-none min-w-[80px] flex-1"
                  />
                ) : (
                  <button
                    onClick={() => setIsAddingTag(true)}
                    className="flex items-center gap-1 h-6 px-2 border border-dashed border-border rounded text-xs text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                  >
                    <PlusIcon />
                    Add
                  </button>
                )}
              </div>
            </div>

            {/* License */}
            <div className="flex flex-col gap-2">
              <FieldLabel label="License" required />
              <div className="flex flex-col md:flex-row gap-2">
                <RadioCard
                  title="Personal License"
                  description="Personal License allows the buyer to use the product in their personal name, but only for editing, not for resale, or for any commercial purpose."
                  learnMoreUrl="#"
                  selected={license === "personal"}
                  onClick={() => setLicense("personal")}
                />
                <RadioCard
                  title="Project License"
                  description="Project License allows the product to be used for commercial purposes. Please note that the Creator shall warrant the title, non-infringement, quiet enjoyment, and legality of the product, and bear corresponding liability for the breach hereof or from the product you upload."
                  learnMoreUrl="https://d5-render.gitbook.io/d5-works/buy-assets-on-works/license-on-works"
                  selected={license === "project"}
                  onClick={() => setLicense("project")}
                />
              </div>
            </div>

            {/* Generative AI Disclosure */}
            <div className="flex flex-col gap-2">
              <div>
                <FieldLabel label="Generative AI Disclosure" required info tooltip={[
                  { title: "What this means", body: "Explain whether any core parts of this asset were generated using AI, such as textures or meshes." },
                  { title: "What buyers will see", body: "If AI-generated content is disclosed, an AI badge will be shown publicly on the product detail page." },
                  { title: "Be accurate", body: "Honest disclosure improves buyer trust and helps reduce compliance or licensing disputes." },
                ]} />
                <p className="text-[13px] text-muted-foreground leading-4 mt-1">
                  Disclose whether this asset contains any AI-generated core content.
                </p>
              </div>
              <div className="flex flex-col md:flex-row gap-2">
                <RadioCard
                  title="No Generative AI Used"
                  description="This asset was created without the use of generative AI tools."
                  selected={aiDisclosure === "none"}
                  onClick={() => setAiDisclosure("none")}
                />
                <RadioCard
                  title="Contains AI-Generated Content"
                  description="Some or all of the core elements of this asset (e.g., textures, meshes) were produced using Generative AI. By selecting this, an AI badge will be publicly displayed on the product detail page."
                  selected={aiDisclosure === "contains"}
                  onClick={() => setAiDisclosure("contains")}
                />
              </div>
            </div>

            {/* Pricing */}
            <div className="flex flex-col gap-2">
              <FieldLabel label="Pricing" required info tooltip={[
                { title: "About Pricing", body: "1. Set a custom price to better reflect your product's quality and value.\n2. Your proceeds shall be the full amount of the net sales amount, based on the actual transaction amount paid by the User (including Pro members) after all applicable discounts, coupons, or membership pricing adjustments, and subject to deductions for bank transaction fees and other applicable charges." },
              ]} />
              <div className="flex flex-col border border-border/60 rounded-lg p-2">
                <div className="flex flex-col gap-1 p-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-medium text-foreground leading-4">
                      Publish under current brand
                    </span>
                    <button
                      onClick={() => setPublishUnderBrand(!publishUnderBrand)}
                      className={`relative w-[26px] h-[14px] rounded-full border transition-colors ${
                        publishUnderBrand
                          ? "bg-grape-accent border-grape-accent"
                          : "bg-black/[0.06] dark:bg-white/[0.06] border-border"
                      }`}
                    >
                      <div className={`absolute top-[1px] w-[10px] h-[10px] rounded-full bg-white shadow-sm transition-transform ${
                        publishUnderBrand ? "translate-x-[13px]" : "translate-x-[1px]"
                      }`} />
                    </button>
                  </div>
                  <span className="text-[13px] text-muted-foreground leading-[18px]">
                    Current brand: Platform
                  </span>
                </div>
                <div className="flex items-center gap-2 p-2">
                  <button
                    onClick={() => setPricing("free")}
                    className={`flex items-center justify-center px-2 py-2 rounded-lg text-[13px] font-medium leading-4 whitespace-nowrap transition-colors ${
                      pricing === "free"
                        ? "bg-grape-accent/10 border border-grape-accent text-grape-accent"
                        : "border border-border/60 text-foreground hover:border-border"
                    }`}
                  >
                    Free
                  </button>
                  {publishUnderBrand ? (
                    <button
                      onClick={() => setPricing("pro")}
                      className={`flex items-center justify-center px-2 py-2 rounded-lg text-[13px] font-medium leading-4 whitespace-nowrap transition-colors ${
                        pricing === "pro"
                          ? "bg-grape-accent/10 border border-grape-accent text-grape-accent"
                          : "border border-border/60 text-foreground hover:border-border"
                      }`}
                    >
                      PRO
                    </button>
                  ) : (
                    <div
                      onClick={() => setPricing("custom")}
                      className={`flex items-center h-8 w-20 rounded-lg backdrop-blur-[50px] bg-black/[0.03] dark:bg-white/[0.03] overflow-hidden cursor-text border transition-colors ${
                        pricing === "custom"
                          ? "border-grape-accent ring-1 ring-grape-accent/25"
                          : "border-transparent"
                      }`}
                    >
                      <span className="pl-1 w-5 flex items-center justify-center text-xs font-medium text-muted-foreground/40">
                        $
                      </span>
                      <input
                        type="text"
                        value={customPrice}
                        onChange={(e) => {
                          setCustomPrice(e.target.value);
                          setPricing("custom");
                        }}
                        onFocus={() => setPricing("custom")}
                        placeholder="Custom"
                        className="flex-1 h-full bg-transparent text-xs text-muted-foreground/60 placeholder:text-muted-foreground/40 outline-none min-w-0"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Agreement */}
            <div
              role="checkbox"
              aria-checked={agreed}
              tabIndex={0}
              onClick={() => setAgreed(a => !a)}
              onKeyDown={(e) => { if (e.key === " " || e.key === "Enter") { e.preventDefault(); setAgreed(a => !a); } }}
              className="flex w-full min-h-6 items-center justify-start gap-2 text-left cursor-pointer select-none"
            >
              <span className="inline-flex shrink-0" aria-hidden>
                <CheckboxIcon checked={agreed} />
              </span>
              <span className="min-w-0 flex-1 text-[13px] text-foreground/80 leading-4">
                By uploading, you agree to the{" "}
                <a
                  href="https://d5-render.gitbook.io/d5-works/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-grape-link font-medium hover:underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  Technical Service Agreement
                </a>
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end p-4 border-t border-border shrink-0">
          <div className="flex items-center gap-2">
            <button className="flex items-center justify-center h-10 px-4 border border-border rounded text-sm font-semibold text-foreground hover:bg-accent transition-colors">
              Save as draft
            </button>
            <button
              disabled={!modelFiles.some(f => f.status === "uploaded") || modelImages.length === 0}
              onClick={() => {
                setSubmitted(true);
                if (!validateAll()) return;
                // TODO: handle actual submission
              }}
              className={`flex items-center justify-center h-10 px-4 bg-grape-accent rounded text-sm font-semibold text-white transition-colors ${
                !modelFiles.some(f => f.status === "uploaded") || modelImages.length === 0
                  ? "opacity-30 cursor-not-allowed"
                  : "hover:bg-grape-accent/90"
              }`}
            >
              Submit
            </button>
          </div>
        </div>
        </>
        )}
      </div>
    </div>
  );
}
