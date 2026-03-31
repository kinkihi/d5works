"use client";

import { useState, useRef, useEffect } from "react";
import type { PageId } from "@/app/page";

function StarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 1.5L9.79 5.12L13.76 5.7L10.88 8.5L11.58 12.45L8 10.56L4.42 12.45L5.12 8.5L2.24 5.7L6.21 5.12L8 1.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="2.5" y="5" width="11" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M5.5 5V3.5C5.5 2.12 6.62 1 8 1C9.38 1 10.5 2.12 10.5 3.5V5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function CubeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 1L14 4.5V11.5L8 15L2 11.5V4.5L8 1Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M8 8V15" stroke="currentColor" strokeWidth="1.2" />
      <path d="M8 8L14 4.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M8 8L2 4.5" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

function DollarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 1.5V14.5M10.5 4.5C10.5 4.5 9.5 3.5 8 3.5C6.5 3.5 5 4.5 5 5.75C5 7 6 7.75 8 8C10 8.25 11 9 11 10.25C11 11.5 9.5 12.5 8 12.5C6.5 12.5 5.5 11.5 5.5 11.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M2 4H10M14 4H12M6 8H14M2 8H4M10 12H14M2 12H8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="11" cy="4" r="1.5" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="5" cy="8" r="1.5" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="9" cy="12" r="1.5" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M12 9V12.5C12 13.05 11.55 13.5 11 13.5H3.5C2.95 13.5 2.5 13.05 2.5 12.5V5C2.5 4.45 2.95 4 3.5 4H7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 2.5H13.5V6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13.5 2.5L7.5 8.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function HelpIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.2" />
      <path d="M6 6.5C6 5.67 6.9 5 8 5C9.1 5 10 5.67 10 6.5C10 7.17 9.4 7.73 8.6 7.93C8.25 8.02 8 8.24 8 8.5V9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="8" cy="11" r="0.75" fill="currentColor" />
    </svg>
  );
}

function WorksIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M2 4L8 2L14 4L8 6L2 4Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M2 4V10L8 12L14 10V4" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M8 6V12" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.2" />
      <path d="M8 7V11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="8" cy="5.25" r="0.75" fill="currentColor" />
    </svg>
  );
}

function LifebuoyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M4.2 4.2L6.2 6.2M9.8 9.8L11.8 11.8M11.8 4.2L9.8 6.2M6.2 9.8L4.2 11.8" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

function HeadsetIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M2.5 8.5V8C2.5 4.96 4.96 2.5 8 2.5C11.04 2.5 13.5 4.96 13.5 8V8.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M1.5 9.5C1.5 8.95 1.95 8.5 2.5 8.5H3.5V12H2.5C1.95 12 1.5 11.55 1.5 11V9.5Z" stroke="currentColor" strokeWidth="1.2" />
      <path d="M12.5 8.5H13.5C14.05 8.5 14.5 8.95 14.5 9.5V11C14.5 11.55 14.05 12 13.5 12H12.5V8.5Z" stroke="currentColor" strokeWidth="1.2" />
      <path d="M13 12V12.5C13 13.33 12.33 14 11.5 14H9.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="1.5" y="3.5" width="13" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M1.5 5L8 9L14.5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
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

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  rightIcon?: React.ReactNode;
  onClick?: () => void;
}

function MenuItem({ icon, label, active, rightIcon, onClick }: MenuItemProps) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center h-8 p-1 rounded-sm w-full cursor-pointer transition-colors ${
        active ? "bg-accent text-accent-foreground" : "hover:bg-accent/50 text-muted-foreground hover:text-foreground"
      }`}
    >
      <div className="flex flex-1 items-center h-full px-1">
        <div className="flex flex-1 items-center">
          <div className="flex items-center p-1">{icon}</div>
          <div className="flex items-center h-full px-1">
            <span className="text-sm font-medium leading-4 whitespace-nowrap">
              {label}
            </span>
          </div>
        </div>
      </div>
      {rightIcon && (
        <div className="flex items-center justify-end">
          <div className="flex items-center justify-center p-1 rounded w-6 text-muted-foreground">
            {rightIcon}
          </div>
        </div>
      )}
    </div>
  );
}

interface HelpMenuItemProps {
  icon: React.ReactNode;
  label: string;
}

function HelpMenuItem({ icon, label }: HelpMenuItemProps) {
  return (
    <button className="flex items-center h-8 w-full p-1 rounded-sm cursor-pointer hover:bg-accent transition-colors">
      <div className="flex flex-1 items-center h-full px-1">
        <div className="flex items-center p-1 text-muted-foreground">{icon}</div>
        <div className="flex items-center h-full px-1">
          <span className="text-[13px] font-medium text-foreground leading-4 whitespace-nowrap">
            {label}
          </span>
        </div>
      </div>
    </button>
  );
}

function HelpPopup({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [showLegal, setShowLegal] = useState(false);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={ref}
      className="absolute bottom-full left-0 mb-1 w-[220px] bg-card border border-border rounded-lg shadow-lg overflow-hidden z-50"
    >
      {/* What's D5 Works */}
      <div className="flex flex-col p-1 border-b border-border">
        <HelpMenuItem icon={<WorksIcon />} label="What's D5 Works" />
      </div>

      {/* Become a Creator / Guide */}
      <div className="flex flex-col gap-0.5 p-1 border-b border-border">
        <HelpMenuItem icon={<InfoIcon />} label="Become a Works Creator" />
        <HelpMenuItem icon={<InfoIcon />} label="Works Creator Guide" />
      </div>

      {/* Help Center / Support / Contact */}
      <div className="flex flex-col gap-0.5 p-1 border-b border-border">
        <HelpMenuItem icon={<LifebuoyIcon />} label="Help Center" />
        <HelpMenuItem icon={<HeadsetIcon />} label="Get Support" />
        <HelpMenuItem icon={<MailIcon />} label="Contact Us" />
      </div>

      {/* About D5 */}
      <div className="flex flex-col p-1 border-b border-border">
        <HelpMenuItem icon={<InfoIcon />} label="About D5" />
      </div>

      {/* Legal Provisions */}
      <div className="flex flex-col p-1">
        <button
          onClick={() => setShowLegal(!showLegal)}
          className="flex items-center h-8 px-1 py-2 rounded-sm cursor-pointer"
        >
          <div className="flex items-center p-1">
            <span className="text-xs font-medium text-muted-foreground leading-4 whitespace-nowrap">
              Legal Provisions
            </span>
          </div>
          <div className={`flex items-center justify-center w-2 transition-transform ${showLegal ? "rotate-180" : ""}`}>
            <ChevronDownIcon />
          </div>
        </button>
        {showLegal && (
          <div className="flex flex-col gap-0.5 px-2 pb-1">
            <button className="flex items-center h-7 px-2 rounded-sm text-xs text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors cursor-pointer">
              Terms of Service
            </button>
            <button className="flex items-center h-7 px-2 rounded-sm text-xs text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors cursor-pointer">
              Privacy Policy
            </button>
            <button className="flex items-center h-7 px-2 rounded-sm text-xs text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors cursor-pointer">
              Cookie Policy
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

interface SidebarProps {
  activePage: PageId;
  onPageChange: (page: PageId) => void;
}

export default function Sidebar({ activePage, onPageChange }: SidebarProps) {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <aside className="hidden lg:flex flex-col w-[220px] min-w-[220px] h-full bg-sidebar border-r border-sidebar-border">
      <div className="flex flex-1 flex-col">
        {/* My List */}
        <div className="flex flex-col gap-0.5 p-2">
          <div className="flex items-center p-1 rounded">
            <div className="flex items-center p-1">
              <span className="text-xs font-semibold text-muted-foreground leading-4 whitespace-nowrap">
                My List
              </span>
            </div>
          </div>
          <MenuItem icon={<StarIcon />} label="Favorites" active={activePage === "favorites"} onClick={() => onPageChange("favorites")} />
          <MenuItem icon={<BagIcon />} label="Purchased" active={activePage === "purchased"} onClick={() => onPageChange("purchased")} />
        </div>

        {/* Creator */}
        <div className="flex flex-col gap-0.5 p-2">
          <div className="flex items-center p-1 rounded">
            <div className="flex items-center p-1">
              <span className="text-xs font-semibold text-muted-foreground leading-4 whitespace-nowrap">
                Creator
              </span>
            </div>
          </div>
          <MenuItem icon={<CubeIcon />} label="Uploaded" active={activePage === "uploaded"} onClick={() => onPageChange("uploaded")} />
          <MenuItem icon={<DollarIcon />} label="Income" active={activePage === "income"} onClick={() => onPageChange("income")} />
        </div>
      </div>

      {/* Get D5 Desktop CTA */}
      <div className="flex flex-col items-end justify-center p-4">
        <div className="flex flex-col w-full bg-muted rounded-md">
          <div className="flex items-center px-2">
            <span className="flex-1 h-8 flex items-center text-xs text-muted-foreground leading-[18px]">
              Easy use or upload assets
            </span>
          </div>
          <div className="flex flex-col p-2">
            <button className="flex items-center justify-center h-8 w-full bg-primary rounded-md text-primary-foreground text-[13px] leading-4 text-center whitespace-nowrap">
              Get D5 Desktop
            </button>
          </div>
        </div>
      </div>

      {/* Settings + Help */}
      <div className="flex flex-col gap-0.5 p-2 border-t border-sidebar-border">
        <MenuItem icon={<SettingsIcon />} label="Settings" rightIcon={<ExternalLinkIcon />} />
        <div className="relative">
          <MenuItem
            icon={<HelpIcon />}
            label="Help"
            onClick={() => setShowHelp((prev) => !prev)}
          />
          {showHelp && <HelpPopup onClose={() => setShowHelp(false)} />}
        </div>
      </div>
    </aside>
  );
}
