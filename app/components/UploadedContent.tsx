"use client";

import { useState } from "react";
import EditModelDialog from "./EditModelDialog";

interface UploadedModel {
  name: string;
  date: string;
  size: string;
  state: "pending" | "on_shelves";
}

const uploadedData: UploadedModel[] = [
  { name: "Modern Dining Room", date: "Uploaded just now", size: "230MB", state: "pending" },
  { name: "Cozy Creative Studio", date: "12 Apr 2026", size: "230MB", state: "on_shelves" },
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

function StateBadge({ state }: { state: "pending" | "on_shelves" }) {
  if (state === "pending") {
    return (
      <div className="flex items-center gap-0.5 pl-1 pr-2 py-0.5 rounded bg-yellow-500/20">
        <div className="w-3 h-3 flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
        </div>
        <span className="text-xs font-medium leading-4 text-yellow-300 whitespace-nowrap">
          Pending
        </span>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-0.5 pl-1 pr-2 py-0.5 rounded bg-emerald-600/20">
      <div className="w-3 h-3 flex items-center justify-center">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
      </div>
      <span className="text-xs font-medium leading-4 text-emerald-400 whitespace-nowrap">
        On shelves
      </span>
    </div>
  );
}

export default function UploadedContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [editingModel, setEditingModel] = useState<UploadedModel | null>(null);

  const filtered = uploadedData.filter((m) =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

      {/* Toolbar */}
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
        <div className="flex items-center mx-4 lg:mx-10">
          <div className="flex flex-1 items-center p-4 border-b border-border">
            <div className="w-4 h-4 rounded-sm border border-border/60 bg-muted mr-2 shrink-0" />
            <span className="text-[13px] font-semibold text-muted-foreground leading-[18px] whitespace-nowrap">
              Model
            </span>
          </div>
          <div className="flex items-center w-[140px] p-4 border-b border-border">
            <span className="text-[13px] font-semibold text-muted-foreground leading-[18px] whitespace-nowrap">
              State
            </span>
          </div>
          <div className="hidden sm:flex items-center w-[182px] p-4 border-b border-border">
            <span className="text-[13px] font-semibold text-muted-foreground leading-[18px] whitespace-nowrap">
              Options
            </span>
          </div>
        </div>
      </div>

      {/* Table Body */}
      <div className="flex flex-col mx-4 lg:mx-10 pb-10">
        {filtered.map((model, index) => (
          <div
            key={index}
            className="flex items-stretch border-b border-border hover:bg-accent/50 transition-colors"
          >
            {/* Model */}
            <div className="flex flex-1 items-center gap-2 p-4 min-w-0">
              <div className="w-4 h-4 rounded-sm border border-border/60 bg-muted shrink-0" />
              <div className="flex flex-1 items-center gap-4 min-w-0">
                <div className="w-9 h-9 rounded-lg bg-muted shrink-0 overflow-hidden" />
                <div className="flex flex-col gap-1 justify-center min-w-0">
                  <span className="text-[13px] font-normal text-foreground leading-5 truncate">
                    {model.name}
                  </span>
                  <span className="text-xs font-normal text-muted-foreground leading-5">
                    {model.date} · {model.size}
                  </span>
                </div>
              </div>
            </div>

            {/* State */}
            <div className="flex items-center w-[140px] px-4">
              <StateBadge state={model.state} />
            </div>

            {/* Options */}
            <div className="hidden sm:flex items-center gap-2 w-[182px] px-4">
              <button
                onClick={() => setEditingModel(model)}
                className="flex items-center justify-center h-8 px-3 border border-border rounded text-[13px] text-foreground leading-none whitespace-nowrap hover:bg-accent transition-colors"
              >
                Edit
              </button>
              <button className="flex items-center justify-center h-8 px-3 border border-border rounded text-[13px] text-foreground leading-none whitespace-nowrap hover:bg-accent transition-colors">
                {model.state === "on_shelves" ? "Unpublish" : "Publish"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingModel && (
        <EditModelDialog
          modelName={editingModel.name}
          onClose={() => setEditingModel(null)}
        />
      )}
    </div>
  );
}
