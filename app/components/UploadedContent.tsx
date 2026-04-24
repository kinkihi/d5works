"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import EditModelDialog from "./EditModelDialog";

type ModelState = "pending" | "draft" | "published" | "rejected" | "suppressed" | "unpublished";

interface UploadedModel {
  name: string;
  id: string;
  pricing: string;
  formats: string[];
  state: ModelState;
  downloads: number | null;
}

const uploadedData: UploadedModel[] = [
  { name: "Modern Dining Room", id: "7NK512RTG8PQ", pricing: "$9.90", formats: [".d5a", ".skp", ".max", ".fbx", ".obj"], state: "pending", downloads: null },
  { name: "Cozy Creative Studio", id: "8BM623SUH9QR", pricing: "$9.90", formats: [".d5a", ".skp", ".max", ".fbx", ".obj"], state: "draft", downloads: null },
  { name: "Minimalist Living Space", id: "3KL847VWI2ST", pricing: "$9.90", formats: [".d5a", ".skp", ".max", ".fbx", ".obj"], state: "published", downloads: 2100 },
  { name: "Industrial Loft Design", id: "5PN936XYJ4UV", pricing: "$9.90", formats: [".d5a", ".skp", ".max", ".fbx", ".obj"], state: "rejected", downloads: 30 },
  { name: "Scandinavian Bedroom", id: "9DQ158ZAK6WX", pricing: "$9.90", formats: [".d5a", ".skp", ".max", ".fbx", ".obj"], state: "suppressed", downloads: 30 },
  { name: "Art Deco Bathroom", id: "2FR269BLC7YZ", pricing: "$9.90", formats: [".d5a", ".skp", ".max", ".fbx", ".obj"], state: "unpublished", downloads: 10 },
];

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-muted-foreground">
      <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M11 11L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-muted-foreground">
      <path d="M3 5L6 8L9 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MoreIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-muted-foreground">
      <circle cx="8" cy="3" r="1.25" fill="currentColor" />
      <circle cx="8" cy="8" r="1.25" fill="currentColor" />
      <circle cx="8" cy="13" r="1.25" fill="currentColor" />
    </svg>
  );
}

function ArrowUpIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
      <path d="M8 13V3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M4 7L8 3L12 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowDownIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
      <path d="M8 3V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M4 9L8 13L12 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const stateConfig: Record<ModelState, { label: string; className: string }> = {
  draft: {
    label: "Draft",
    className: "bg-black/[0.04] dark:bg-white/[0.03] text-foreground/40",
  },
  pending: {
    label: "Pending",
    className: "bg-blue-500/[0.08] text-blue-700 dark:text-[#004899]",
  },
  published: {
    label: "Published",
    className: "bg-emerald-500/[0.12] dark:bg-[rgba(2,138,58,0.16)] text-emerald-700 dark:text-[#adddc0]",
  },
  rejected: {
    label: "Rejected",
    className: "bg-yellow-400/[0.18] dark:bg-[rgba(252,231,25,0.24)] text-yellow-800 dark:text-[#f7f6c9]",
  },
  suppressed: {
    label: "Suppressed",
    className: "bg-red-500/[0.1] dark:bg-[rgba(255,0,8,0.16)] text-red-700 dark:text-[#f4a9aa]",
  },
  unpublished: {
    label: "Unpublished",
    className: "text-foreground/40",
  },
};

function StateBadge({ state }: { state: ModelState }) {
  const cfg = stateConfig[state];
  return (
    <div className={`flex items-center px-1 py-0.5 rounded ${cfg.className}`}>
      <span className="text-xs font-medium leading-4 whitespace-nowrap">
        {cfg.label}
      </span>
    </div>
  );
}

function FormatBadge({ format }: { format: string }) {
  return (
    <span className="inline-flex items-center justify-center h-5 p-1 rounded backdrop-blur-[50px] border border-black/[0.08] dark:border-white/10 bg-black/[0.04] dark:bg-[rgba(26,29,34,0.72)] text-[11px] font-medium leading-[14px] text-foreground/40 whitespace-nowrap">
      {format}
    </span>
  );
}

function EditIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M5.79313 13.5001H3C2.86739 13.5001 2.74021 13.4474 2.64645 13.3536C2.55268 13.2599 2.5 13.1327 2.5 13.0001V10.207C2.50006 10.0745 2.55266 9.94753 2.64625 9.85383L10.3538 2.14633C10.4475 2.05263 10.5746 2 10.7072 2C10.8397 2 10.9669 2.05263 11.0606 2.14633L13.8538 4.93758C13.9474 5.03134 14.0001 5.15847 14.0001 5.29102C14.0001 5.42357 13.9474 5.5507 13.8538 5.64446L6.14625 13.3538C6.05255 13.4474 5.92556 13.5 5.79313 13.5001Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.5 4L12 7.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 3.5C3 3.5 1 8 1 8C1 8 3 12.5 8 12.5C13 12.5 15 8 15 8C15 8 13 3.5 8 3.5Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 10.5C9.38071 10.5 10.5 9.38071 10.5 8C10.5 6.61929 9.38071 5.5 8 5.5C6.61929 5.5 5.5 6.61929 5.5 8C5.5 9.38071 6.61929 10.5 8 10.5Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M4 4L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ChevronLeftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M10 4L6 8L10 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TrashIcon() {
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

function TableCheckbox({ checked, indeterminate, onChange }: { checked: boolean; indeterminate?: boolean; onChange: () => void }) {
  if (checked || indeterminate) {
    return (
      <button onClick={(e) => { e.stopPropagation(); onChange(); }} className="w-4 h-4 rounded-sm bg-grape-accent flex items-center justify-center shrink-0 cursor-pointer">
        {indeterminate ? (
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M2.5 5H7.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M2 5L4 7L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>
    );
  }
  return (
    <button onClick={(e) => { e.stopPropagation(); onChange(); }} className="w-4 h-4 rounded-sm border border-border/60 bg-muted shrink-0 cursor-pointer hover:border-foreground/30 transition-colors" />
  );
}

function RowDropdown({
  onEdit,
  onViewDetails,
  onDelete,
  onClose,
}: {
  onEdit: () => void;
  onViewDetails: () => void;
  onDelete: () => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onClose]);

  const items = [
    { label: "编辑", icon: <EditIcon />, action: onEdit },
    { label: "查看详情", icon: <EyeIcon />, action: onViewDetails },
    { label: "删除", icon: <TrashIcon />, action: onDelete, danger: true },
  ];

  return (
    <div
      ref={ref}
      className="absolute right-0 top-full mt-1 z-50 min-w-[140px] rounded-lg border border-border bg-popover p-1 shadow-lg animate-in fade-in slide-in-from-top-1 duration-150"
    >
      {items.map((item) => (
        <button
          key={item.label}
          onClick={(e) => {
            e.stopPropagation();
            item.action();
            onClose();
          }}
          className={`flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-[13px] leading-5 transition-colors ${
            item.danger
              ? "text-destructive hover:bg-destructive/10"
              : "text-popover-foreground hover:bg-accent"
          }`}
        >
          <span className="shrink-0">{item.icon}</span>
          {item.label}
        </button>
      ))}
    </div>
  );
}

function formatDownloads(n: number | null): string {
  if (n === null) return "-";
  if (n >= 1000) return `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k`;
  return n.toLocaleString();
}

function DetailField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <span className="text-xs font-medium leading-4 text-muted-foreground">{label}</span>
      <div className="text-[13px] font-normal text-foreground leading-5">{children}</div>
    </div>
  );
}

function ModelDetailSheet({ model, onClose, onEdit }: { model: UploadedModel; onClose: () => void; onEdit: () => void }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const cfg = stateConfig[model.state];
  const [selectedThumb, setSelectedThumb] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    return () => el.removeEventListener("scroll", updateScrollState);
  }, [updateScrollState]);

  const scrollThumbnails = useCallback((dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "left" ? -216 : 216, behavior: "smooth" });
  }, []);

  return (
    <div className="fixed inset-0 z-50" onClick={onClose}>
      <div
        className="absolute right-0 top-0 bottom-0 w-[400px] bg-background border-l border-border flex flex-col shadow-[-8px_0_24px_rgba(0,0,0,0.08)] animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 shrink-0">
          <span className="text-[13px] font-semibold text-foreground leading-[18px]">Detail</span>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-8 h-8 rounded hover:bg-accent transition-colors text-muted-foreground"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto">
          {/* Hero image */}
          <div className="mx-4 aspect-[4/3] rounded-lg bg-muted overflow-hidden" />

          {/* Thumbnail carousel */}
          <div className="relative h-[72px]">
            <div ref={scrollRef} className="flex gap-2 overflow-x-auto scrollbar-none h-[72px] items-center px-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedThumb(i)}
                  className={`w-[100px] h-[56px] rounded shrink-0 overflow-hidden cursor-pointer transition-all ${
                    selectedThumb === i
                      ? "ring-2 ring-foreground/20"
                      : "opacity-80 hover:opacity-100"
                  }`}
                >
                  <div className="w-full h-full bg-muted" />
                </button>
              ))}
            </div>
            {canScrollLeft && (
              <div className="absolute left-0 top-[8px] w-[60px] h-[56px] flex items-center justify-center z-10">
                <div className="absolute inset-0 bg-gradient-to-r from-background from-30% to-transparent pointer-events-none" />
                <button
                  onClick={() => scrollThumbnails("left")}
                  className="relative flex items-center justify-center size-8 rounded backdrop-blur-[50px] bg-muted dark:bg-[rgba(26,29,34,0.72)] border border-border/60 dark:border-white/[0.06] text-foreground hover:bg-accent dark:hover:bg-white/[0.1] transition-colors"
                >
                  <ChevronLeftIcon />
                </button>
              </div>
            )}
            {canScrollRight && (
              <div className="absolute right-0 top-[8px] w-[60px] h-[56px] flex items-center justify-center z-10">
                <div className="absolute inset-0 bg-gradient-to-l from-background from-30% to-transparent pointer-events-none" />
                <button
                  onClick={() => scrollThumbnails("right")}
                  className="relative flex items-center justify-center size-8 rounded backdrop-blur-[50px] bg-muted dark:bg-[rgba(26,29,34,0.72)] border border-border/60 dark:border-white/[0.06] text-foreground hover:bg-accent dark:hover:bg-white/[0.1] transition-colors"
                >
                  <ChevronRightIcon />
                </button>
              </div>
            )}
          </div>

          {/* Detail fields */}
          <div className="flex flex-col gap-4 px-4 pt-4 pb-6">
            <DetailField label="Name">{model.name}</DetailField>
            <DetailField label="ID">{model.id}</DetailField>
            <DetailField label="Pricing">USD {model.pricing}</DetailField>
            <DetailField label="Formats">
              <div className="flex flex-wrap gap-1">
                {model.formats.map((fmt) => (
                  <FormatBadge key={fmt} format={fmt} />
                ))}
              </div>
            </DetailField>
            <DetailField label="Downloads">{formatDownloads(model.downloads)}</DetailField>
            <DetailField label="Uploaded">
              <div className="flex gap-2">
                <span>2026.4.24</span>
                <span>14:00:21</span>
              </div>
            </DetailField>
            <DetailField label="Listed">-</DetailField>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-4 border-t border-border shrink-0">
          <div className={`flex items-center px-1 py-0.5 rounded ${cfg.className}`}>
            <span className="text-xs font-medium leading-4 whitespace-nowrap">{cfg.label}</span>
          </div>
          <div className="flex items-center gap-2.5">
            {model.state === "suppressed" ? (
              <button className="flex items-center justify-center h-8 px-3 rounded border border-border text-[13px] font-semibold text-foreground hover:bg-accent transition-colors">
                Contact
              </button>
            ) : (
              <>
                <button
                  onClick={onEdit}
                  className="flex items-center justify-center h-8 px-3 rounded border border-border text-[13px] font-semibold text-foreground hover:bg-accent transition-colors"
                >
                  Edit
                </button>
                {model.state === "draft" && (
                  <button className="flex items-center justify-center h-8 px-3 rounded bg-foreground text-background text-[13px] font-semibold hover:bg-foreground/90 transition-colors">
                    Publish
                  </button>
                )}
                {model.state === "published" && (
                  <button className="flex items-center justify-center h-8 px-3 rounded bg-foreground text-background text-[13px] font-semibold hover:bg-foreground/90 transition-colors">
                    Unpublish
                  </button>
                )}
                {model.state === "unpublished" && (
                  <button className="flex items-center justify-center h-8 px-3 rounded bg-foreground text-background text-[13px] font-semibold hover:bg-foreground/90 transition-colors">
                    Republish
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function UploadedContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [editingModel, setEditingModel] = useState<UploadedModel | null>(null);
  const [menuOpenIndex, setMenuOpenIndex] = useState<number | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [sheetModel, setSheetModel] = useState<UploadedModel | null>(null);

  const closeMenu = useCallback(() => setMenuOpenIndex(null), []);

  const filtered = uploadedData.filter((m) =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSelectedCount = useMemo(
    () => filtered.filter(m => selectedIds.has(m.id)).length,
    [filtered, selectedIds]
  );
  const isAllSelected = filtered.length > 0 && filteredSelectedCount === filtered.length;
  const isSomeSelected = filteredSelectedCount > 0 && filteredSelectedCount < filtered.length;

  const toggleSelect = useCallback((id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const toggleSelectAll = useCallback(() => {
    if (isAllSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filtered.map(m => m.id)));
    }
  }, [isAllSelected, filtered]);

  const handleDeleteSelected = useCallback(() => {
    setSelectedIds(new Set());
  }, []);

  return (
    <div className="flex flex-col flex-1">
      {/* Header */}
      <div className="flex items-center justify-between px-4 lg:px-10 py-4 lg:py-6">
        <div className="flex flex-col gap-1.5">
          <h1 className="text-lg lg:text-xl font-semibold leading-5 text-foreground">
            Uploaded
          </h1>
          <p className="text-xs font-medium leading-4 text-muted-foreground">
            Assets you uploaded or published
          </p>
        </div>
      </div>

      {/* Toolbar + Table Header (sticky) */}
      <div className="sticky top-0 z-30 bg-background">
        <div className="flex items-center justify-between px-4 lg:px-10 py-2">
          <div className="flex flex-1 items-center gap-2">
            <button className="flex items-center gap-0.5 h-8 px-2 py-1 border border-border rounded text-[13px] font-semibold text-foreground leading-4 whitespace-nowrap">
              Filter
              <ChevronDownIcon />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center w-[140px] bg-muted rounded px-1 py-1">
              <div className="flex items-center justify-center p-1">
                <SearchIcon />
              </div>
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-xs text-foreground placeholder:text-muted-foreground leading-4 outline-none"
              />
            </div>
            <button className="flex items-center gap-0.5 h-8 px-2 py-1 border border-border rounded text-[13px] leading-4 whitespace-nowrap">
              <span className="text-muted-foreground">Sort by:</span>
              <span className="font-semibold text-foreground"> Default</span>
              <ChevronDownIcon />
            </button>
          </div>
        </div>

        {/* Table Header */}
        <div className="flex items-stretch mx-4 lg:mx-10 relative h-[57px]">
          <div className="flex flex-1 items-center p-4 border-b border-border min-w-0">
            <div className="mr-2">
              <TableCheckbox
                checked={isAllSelected}
                indeterminate={isSomeSelected}
                onChange={toggleSelectAll}
              />
            </div>
            <span className="text-[13px] font-semibold text-muted-foreground leading-[18px] whitespace-nowrap">
              Model
            </span>
          </div>
          <div className="hidden md:flex items-center w-[100px] shrink-0 p-4 border-b border-border">
            <span className="text-[13px] font-semibold text-muted-foreground leading-[18px] whitespace-nowrap">
              Pricing
            </span>
          </div>
          <div className="hidden xl:flex items-center w-[202px] shrink-0 p-4 border-b border-border">
            <span className="text-[13px] font-semibold text-muted-foreground leading-[18px] whitespace-nowrap">
              Formats
            </span>
          </div>
          <div className="flex items-center w-[120px] shrink-0 p-4 border-b border-border">
            <span className="text-[13px] font-semibold text-muted-foreground leading-[18px] whitespace-nowrap">
              State
            </span>
          </div>
          <div className="hidden sm:flex items-center w-[120px] shrink-0 p-4 border-b border-border">
            <span className="text-[13px] font-semibold text-muted-foreground leading-[18px] whitespace-nowrap">
              Downloads
            </span>
          </div>
          <div className="flex items-center justify-center w-14 shrink-0 p-4 border-b border-border">
            <span className="text-[13px] font-semibold text-muted-foreground leading-[18px] whitespace-nowrap">
              More
            </span>
          </div>

          {/* Batch action toolbar */}
          {filteredSelectedCount > 0 && (
            <div className="absolute left-[87px] top-1/2 -translate-y-1/2 flex items-center shadow-[0px_2px_8px_0px_rgba(0,0,0,0.06)] z-10">
              <button className="flex items-center h-8 p-2 backdrop-blur-[50px] bg-background border-l border-t border-b border-border rounded-l text-foreground hover:bg-accent transition-colors">
                <ArrowUpIcon />
                <span className="px-1 text-[13px] whitespace-nowrap">Publish</span>
              </button>
              <button className="flex items-center h-8 p-2 backdrop-blur-[50px] bg-background border-l border-t border-b border-border text-foreground hover:bg-accent transition-colors">
                <ArrowDownIcon />
                <span className="px-1 text-[13px] whitespace-nowrap">Unpublish</span>
              </button>
              <button
                onClick={handleDeleteSelected}
                className="flex items-center justify-center size-8 p-2 backdrop-blur-[50px] bg-background border border-border rounded-r text-foreground hover:bg-accent transition-colors"
              >
                <TrashIcon />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Table Body */}
      <div className="flex flex-col mx-4 lg:mx-10 pb-10">
        {filtered.map((model, index) => {
          const isSelected = selectedIds.has(model.id);
          return (
          <div
            key={index}
            onClick={() => setSheetModel(model)}
            className={`flex items-stretch border-b border-border transition-colors cursor-pointer ${
              isSelected ? "bg-grape/50" : "hover:bg-accent/50"
            }`}
          >
            {/* Model */}
            <div className="flex flex-1 items-center gap-2 p-4 min-w-0">
              <TableCheckbox checked={isSelected} onChange={() => toggleSelect(model.id)} />
              <div className="flex flex-1 items-center gap-4 min-w-0">
                <div className="w-9 h-9 rounded-lg bg-muted shrink-0 overflow-hidden" />
                <div className="flex flex-col gap-1 justify-center min-w-0">
                  <span className="text-[13px] font-normal text-foreground leading-5 truncate">
                    {model.name}
                  </span>
                  <span className="text-xs font-normal text-muted-foreground leading-5 truncate">
                    ID:{model.id}
                  </span>
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="hidden md:flex items-center w-[100px] shrink-0 px-4">
              <span className="text-[13px] font-semibold text-foreground leading-[18px]">
                {model.pricing}
              </span>
            </div>

            {/* Formats */}
            <div className="hidden xl:flex items-center w-[202px] shrink-0 px-4">
              <div className="flex flex-wrap gap-1">
                {model.formats.map((fmt) => (
                  <FormatBadge key={fmt} format={fmt} />
                ))}
              </div>
            </div>

            {/* State */}
            <div className="flex items-center w-[120px] shrink-0 px-4">
              <StateBadge state={model.state} />
            </div>

            {/* Downloads */}
            <div className="hidden sm:flex items-center w-[120px] shrink-0 px-4">
              <span className="text-[13px] font-normal text-foreground leading-[18px]">
                {formatDownloads(model.downloads)}
              </span>
            </div>

            {/* More */}
            <div className="flex items-center justify-center w-14 shrink-0 px-4 relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuOpenIndex(menuOpenIndex === index ? null : index);
                }}
                className="flex items-center justify-center w-8 h-8 rounded hover:bg-accent transition-colors"
              >
                <MoreIcon />
              </button>
              {menuOpenIndex === index && (
                <RowDropdown
                  onEdit={() => setEditingModel(model)}
                  onViewDetails={() => setSheetModel(model)}
                  onDelete={() => {}}
                  onClose={closeMenu}
                />
              )}
            </div>
          </div>
          );
        })}
      </div>

      {editingModel && (
        <EditModelDialog
          title="Edit"
          modelName={editingModel.name}
          onClose={() => setEditingModel(null)}
        />
      )}

      {sheetModel && (
        <ModelDetailSheet
          model={sheetModel}
          onClose={() => setSheetModel(null)}
          onEdit={() => {
            setEditingModel(sheetModel);
            setSheetModel(null);
          }}
        />
      )}
    </div>
  );
}
