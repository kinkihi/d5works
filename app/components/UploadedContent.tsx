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

type FilterFormat = "all" | ".d5a" | ".skp" | ".fbx" | ".obj" | ".max";
type FilterPricing = "all" | "free" | "paid";
type FilterStatus = "all" | ModelState;

const FILTER_FORMATS: FilterFormat[] = ["all", ".skp", ".fbx", ".obj", ".max", ".d5a"];
const FILTER_PRICING: FilterPricing[] = ["all", "free", "paid"];
const FILTER_STATUSES: FilterStatus[] = ["all", "draft", "pending", "rejected", "published", "unpublished", "suppressed"];

const filterStatusLabels: Record<FilterStatus, string> = {
  all: "All",
  draft: "Draft",
  pending: "Pending",
  rejected: "Rejected",
  published: "Published",
  unpublished: "Unpublished",
  suppressed: "Suppressed",
};

function FilterChip({
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
      className={`flex items-center px-2 py-1 rounded-lg text-[13px] font-medium leading-4 whitespace-nowrap transition-colors ${
        selected
          ? "bg-grape-accent/10 border border-grape-accent text-grape-accent"
          : "border border-black/10 dark:border-white/10 text-foreground hover:border-black/20 dark:hover:border-white/20"
      }`}
    >
      {label}
    </button>
  );
}

function FilterCloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function FilterDropdown({
  formatFilter,
  pricingFilter,
  statusFilter,
  onFormatChange,
  onPricingChange,
  onStatusChange,
  onClose,
}: {
  formatFilter: FilterFormat;
  pricingFilter: FilterPricing;
  statusFilter: FilterStatus;
  onFormatChange: (v: FilterFormat) => void;
  onPricingChange: (v: FilterPricing) => void;
  onStatusChange: (v: FilterStatus) => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onClose]);

  return (
    <div
      ref={ref}
      className="absolute left-0 top-full mt-1 z-50 w-[320px] bg-popover border border-border rounded-lg shadow-lg animate-in fade-in slide-in-from-top-1 duration-150 overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between h-10 px-4 border-b border-border backdrop-blur-[50px]">
        <span className="text-[13px] font-medium text-foreground leading-5">Filter</span>
        <button
          onClick={onClose}
          className="flex items-center justify-center w-6 h-6 rounded text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
        >
          <FilterCloseIcon />
        </button>
      </div>

      {/* Formats */}
      <div className="flex flex-col gap-2 px-4 pt-2 pb-4 border-b border-border">
        <span className="text-sm font-medium text-foreground leading-4">Formats</span>
        <div className="flex flex-wrap gap-2">
          {FILTER_FORMATS.map((fmt) => (
            <FilterChip
              key={fmt}
              label={fmt === "all" ? "All" : fmt}
              selected={formatFilter === fmt}
              onClick={() => onFormatChange(fmt)}
            />
          ))}
        </div>
      </div>

      {/* Pricing */}
      <div className="flex flex-col gap-2 px-4 py-4 border-b border-border">
        <span className="text-[13px] font-medium text-foreground leading-4">Pricing</span>
        <div className="flex flex-wrap gap-2">
          {FILTER_PRICING.map((p) => (
            <FilterChip
              key={p}
              label={p === "all" ? "All" : p === "free" ? "Free" : "Paid"}
              selected={pricingFilter === p}
              onClick={() => onPricingChange(p)}
            />
          ))}
        </div>
      </div>

      {/* Status */}
      <div className="flex flex-col gap-2 px-4 py-4">
        <span className="text-sm font-medium text-foreground leading-4">Status</span>
        <div className="flex flex-wrap gap-2">
          {FILTER_STATUSES.map((s) => (
            <FilterChip
              key={s}
              label={filterStatusLabels[s]}
              selected={statusFilter === s}
              onClick={() => onStatusChange(s)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

type SortField = "default" | "status";
type SortOrder = "newest" | "oldest";
type SortPrice = "low" | "high";

const sortFieldLabels: Record<SortField, string> = { default: "Default", status: "Status" };

function SortCheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="shrink-0">
      <path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SortDropdown({
  sortField,
  sortOrder,
  sortPrice,
  onFieldChange,
  onOrderChange,
  onPriceChange,
  onClose,
}: {
  sortField: SortField;
  sortOrder: SortOrder;
  sortPrice: SortPrice;
  onFieldChange: (v: SortField) => void;
  onOrderChange: (v: SortOrder) => void;
  onPriceChange: (v: SortPrice) => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onClose]);

  const menuItem = (label: string, selected: boolean, onClick: () => void) => (
    <button
      key={label}
      onClick={() => { onClick(); }}
      className="flex items-center gap-0 w-full h-6 px-1 rounded text-left hover:bg-accent transition-colors"
    >
      <span className="flex items-center justify-center w-6 shrink-0">
        {selected && <SortCheckIcon />}
      </span>
      <span className="text-xs font-medium text-foreground leading-4">{label}</span>
    </button>
  );

  return (
    <div
      ref={ref}
      className="absolute right-0 top-full mt-1 z-50 w-full min-w-fit bg-popover border border-border rounded-lg shadow-lg animate-in fade-in slide-in-from-top-1 duration-150 overflow-hidden"
    >
      <div className="flex flex-col p-1 border-b border-border">
        <div className="flex items-center h-7 px-3">
          <span className="text-[13px] font-medium text-muted-foreground leading-5">Sort By</span>
        </div>
        {(["default", "status"] as SortField[]).map((f) =>
          menuItem(sortFieldLabels[f], sortField === f, () => onFieldChange(f))
        )}
      </div>

      <div className="flex flex-col p-1 border-b border-border">
        <div className="flex items-center h-7 px-3">
          <span className="text-[13px] font-medium text-muted-foreground leading-5">Order</span>
        </div>
        {menuItem("Newest First", sortOrder === "newest", () => onOrderChange("newest"))}
        {menuItem("Oldest First", sortOrder === "oldest", () => onOrderChange("oldest"))}
      </div>

      <div className="flex flex-col p-1">
        {menuItem("Price Low", sortPrice === "low", () => onPriceChange("low"))}
        {menuItem("Price High", sortPrice === "high", () => onPriceChange("high"))}
      </div>
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
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [sortField, setSortField] = useState<SortField>("default");
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
  const [sortPrice, setSortPrice] = useState<SortPrice>("low");
  const [formatFilter, setFormatFilter] = useState<FilterFormat>("all");
  const [pricingFilter, setPricingFilter] = useState<FilterPricing>("all");
  const [statusFilter, setStatusFilter] = useState<FilterStatus>("all");
  const formatsRef = useRef<HTMLDivElement>(null);
  const [formatsWidth, setFormatsWidth] = useState<number | undefined>(undefined);

  useEffect(() => {
    const el = formatsRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setFormatsWidth(el.offsetWidth));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const closeMenu = useCallback(() => setMenuOpenIndex(null), []);

  const hasActiveFilter = formatFilter !== "all" || pricingFilter !== "all" || statusFilter !== "all";

  const filtered = uploadedData.filter((m) => {
    if (!m.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (formatFilter !== "all" && !m.formats.includes(formatFilter)) return false;
    if (pricingFilter === "free" && m.pricing !== "Free") return false;
    if (pricingFilter === "paid" && m.pricing === "Free") return false;
    if (statusFilter !== "all" && m.state !== statusFilter) return false;
    return true;
  });

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
          <div className="flex flex-1 items-center gap-2 relative">
            <div className="relative">
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className={`flex items-center gap-0.5 h-8 px-2 py-1 border rounded text-[13px] font-semibold leading-4 whitespace-nowrap transition-colors ${
                  hasActiveFilter
                    ? "border-grape-accent text-grape-accent bg-grape-accent/5 hover:bg-grape-accent/10 active:bg-grape-accent/15"
                    : "border-border text-foreground hover:bg-accent active:bg-accent/80"
                }`}
              >
                Filter
                <ChevronDownIcon />
              </button>
              {hasActiveFilter && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setFormatFilter("all");
                    setPricingFilter("all");
                    setStatusFilter("all");
                  }}
                  className="absolute -left-1 -top-[3px] flex items-center justify-center w-4 h-3 rounded bg-grape-accent hover:bg-grape-accent/80 transition-colors"
                >
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <path d="M2 2L6 6M6 2L2 6" stroke="white" strokeWidth="1.25" strokeLinecap="round" />
                  </svg>
                </button>
              )}
            </div>
            {filterOpen && (
              <FilterDropdown
                formatFilter={formatFilter}
                pricingFilter={pricingFilter}
                statusFilter={statusFilter}
                onFormatChange={setFormatFilter}
                onPricingChange={setPricingFilter}
                onStatusChange={setStatusFilter}
                onClose={() => setFilterOpen(false)}
              />
            )}
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
            <div className="relative">
              <button
                onClick={() => setSortOpen(!sortOpen)}
                className="flex items-center gap-0.5 h-8 min-w-[127px] px-2 py-1 border border-border rounded text-[13px] leading-4 whitespace-nowrap hover:bg-accent active:bg-accent/80 transition-colors"
              >
                <span className="text-muted-foreground">Sort by:</span>
                <span className="font-semibold text-foreground"> {sortFieldLabels[sortField]}</span>
                <ChevronDownIcon />
              </button>
              {sortOpen && (
                <SortDropdown
                  sortField={sortField}
                  sortOrder={sortOrder}
                  sortPrice={sortPrice}
                  onFieldChange={setSortField}
                  onOrderChange={setSortOrder}
                  onPriceChange={setSortPrice}
                  onClose={() => setSortOpen(false)}
                />
              )}
            </div>
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
          <div
            className="hidden xl:flex items-center shrink-0 p-4 border-b border-border"
            style={formatsWidth ? { width: formatsWidth } : undefined}
          >
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
            <div ref={index === 0 ? formatsRef : undefined} className="hidden xl:flex items-center w-fit shrink-0 px-4">
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
