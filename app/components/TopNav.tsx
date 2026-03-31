"use client";

import { useState, useRef, useEffect, useCallback } from "react";

function D5Logo() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0ZM12.3555 6.11426C12.1335 5.99478 11.8665 5.99478 11.6445 6.11426L7.70703 8.23438C7.46423 8.36522 7.3125 8.61871 7.3125 8.89453V16.7852C7.31263 17.069 7.47272 17.329 7.72656 17.4561L8.62695 17.9062C8.83796 18.0117 9.08684 18.0116 9.29785 17.9062L16.2725 14.418C16.5265 14.291 16.6874 14.0311 16.6875 13.7471V8.89453C16.6875 8.6187 16.5358 8.36522 16.293 8.23438L12.3555 6.11426ZM11.9678 8.97559C12.014 8.94977 12.0704 8.95006 12.1162 8.97656L13.9863 10.0654C14.0323 10.0922 14.0604 10.1412 14.0605 10.1943L14.0625 12.7168C14.0623 12.7765 14.0265 12.8309 13.9717 12.8545L10.1465 14.4932C10.0476 14.5353 9.93763 14.463 9.9375 14.3555V10.2002C9.9375 10.1462 9.9667 10.096 10.0137 10.0693L11.9678 8.97559ZM11.7871 6.37793L7.84961 8.49805C7.83138 8.50786 7.81357 8.51842 7.79688 8.53027L7.84863 8.49805L11.7861 6.37793H11.7871Z" fill="currentColor"/>
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-muted-foreground">
      <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRightSmallIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-muted-foreground">
      <path d="M4.5 2.5L7.5 6L4.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function NavWorksIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M2 4L8 2L14 4L8 6L2 4Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M2 4V10L8 12L14 10V4" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M8 6V12" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

function NavInfoIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.2" />
      <path d="M8 7V11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="8" cy="5.25" r="0.75" fill="currentColor" />
    </svg>
  );
}

function NavLifebuoyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M4.2 4.2L6.2 6.2M9.8 9.8L11.8 11.8M11.8 4.2L9.8 6.2M6.2 9.8L4.2 11.8" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

function NavHeadsetIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M2.5 8.5V8C2.5 4.96 4.96 2.5 8 2.5C11.04 2.5 13.5 4.96 13.5 8V8.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M1.5 9.5C1.5 8.95 1.95 8.5 2.5 8.5H3.5V12H2.5C1.95 12 1.5 11.55 1.5 11V9.5Z" stroke="currentColor" strokeWidth="1.2" />
      <path d="M12.5 8.5H13.5C14.05 8.5 14.5 8.95 14.5 9.5V11C14.5 11.55 14.05 12 13.5 12H12.5V8.5Z" stroke="currentColor" strokeWidth="1.2" />
      <path d="M13 12V12.5C13 13.33 12.33 14 11.5 14H9.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function NavMailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="1.5" y="3.5" width="13" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M1.5 5L8 9L14.5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

interface NavMenuItemProps {
  icon: React.ReactNode;
  label: string;
}

function NavMenuItem({ icon, label }: NavMenuItemProps) {
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

function NavigationMenu({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

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
      className="absolute left-0 top-full mt-1 w-[480px] bg-card border border-border rounded-lg shadow-lg overflow-hidden z-50"
    >
      <div className="flex h-[150px]">
        {/* Left column */}
        <div className="flex flex-col w-[320px] border-r border-border">
          <div className="flex flex-col p-2 border-b border-border">
            <NavMenuItem icon={<NavWorksIcon />} label="What's D5 Works" />
          </div>
          <div className="flex flex-col gap-0.5 p-2">
            <NavMenuItem icon={<NavInfoIcon />} label="Become a Works Creator" />
            <NavMenuItem icon={<NavInfoIcon />} label="Works Creator Guide" />
          </div>
        </div>
        {/* Right column */}
        <div className="flex flex-1 flex-col gap-0.5 p-2">
          <NavMenuItem icon={<NavLifebuoyIcon />} label="Help Center" />
          <NavMenuItem icon={<NavHeadsetIcon />} label="Get Support" />
          <NavMenuItem icon={<NavMailIcon />} label="Contact Us" />
          <button className="flex items-center h-8 w-full px-2 py-2 rounded-sm cursor-pointer">
            <span className="text-xs font-medium text-muted-foreground leading-4 whitespace-nowrap">
              Legal Provisions
            </span>
            <div className="flex items-center justify-center ml-0.5">
              <ChevronRightSmallIcon />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

function ExternalLinkSmallIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-muted-foreground">
      <path d="M12 9V12.5C12 13.05 11.55 13.5 11 13.5H3.5C2.95 13.5 2.5 13.05 2.5 12.5V5C2.5 4.45 2.95 4 3.5 4H7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 2.5H13.5V6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13.5 2.5L7.5 8.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M8 1.5V3M8 13V14.5M1.5 8H3M13 8H14.5M3.4 3.4L4.5 4.5M11.5 11.5L12.6 12.6M3.4 12.6L4.5 11.5M11.5 4.5L12.6 3.4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M13.5 9.5C12.8 10.5 11.7 11.2 10.3 11.2C8.1 11.2 6.3 9.4 6.3 7.2C6.3 5.4 7.4 3.9 9 3.3C8.6 3.1 8.1 3 7.5 3C4.7 3 2.5 5.2 2.5 8C2.5 10.8 4.7 13 7.5 13C10 13 12 11.2 12.5 8.8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MonitorIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="1.5" y="2.5" width="13" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M5.5 14H10.5M8 11.5V14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M3 7L6 10L11 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

interface DropdownItemProps {
  label: string;
  rightIcon?: React.ReactNode;
  onClick?: () => void;
}

function DropdownItem({ label, rightIcon, onClick }: DropdownItemProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-between h-8 w-full p-1 rounded-sm cursor-pointer hover:bg-accent transition-colors"
    >
      <div className="flex flex-1 items-center h-6 px-1">
        <span className="text-[13px] font-medium text-foreground leading-4 whitespace-nowrap">
          {label}
        </span>
      </div>
      {rightIcon && (
        <div className="flex items-center justify-center p-1 w-6">
          {rightIcon}
        </div>
      )}
    </button>
  );
}

function ThemeSubmenu() {
  const [theme, setTheme] = useState<"system" | "light" | "dark">("system");

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "system" | "light" | "dark" | null;
    if (saved) setTheme(saved);
  }, []);

  const applyTheme = (t: "system" | "light" | "dark") => {
    setTheme(t);
    localStorage.setItem("theme", t);
    const root = document.documentElement;
    if (t === "dark") {
      root.classList.add("dark");
    } else if (t === "light") {
      root.classList.remove("dark");
    } else {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    }
  };

  const options = [
    { key: "system" as const, label: "System", icon: <MonitorIcon /> },
    { key: "light" as const, label: "Light", icon: <SunIcon /> },
    { key: "dark" as const, label: "Dark", icon: <MoonIcon /> },
  ];

  return (
    <div className="absolute right-full top-0 mr-1 w-[160px] bg-card border border-border rounded-lg shadow-lg overflow-hidden z-50">
      <div className="flex flex-col p-1">
        {options.map((opt) => (
          <button
            key={opt.key}
            onClick={() => applyTheme(opt.key)}
            className="flex items-center h-8 w-full p-1 rounded-sm cursor-pointer hover:bg-accent transition-colors gap-1"
          >
            <div className="flex items-center justify-center p-1 w-6 text-muted-foreground">
              {opt.icon}
            </div>
            <span className="flex-1 text-[13px] font-medium text-foreground leading-4 whitespace-nowrap text-left">
              {opt.label}
            </span>
            {theme === opt.key && (
              <div className="flex items-center justify-center w-6 text-foreground">
                <CheckIcon />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

function AvatarDropdown({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [showTheme, setShowTheme] = useState(false);

  const handleClose = useCallback(() => onClose(), [onClose]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handleClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClose]);

  return (
    <div
      ref={ref}
      className="absolute right-0 top-full mt-1 w-[200px] bg-card border border-border rounded-lg shadow-lg overflow-visible z-50"
    >
      {/* User info */}
      <div className="flex flex-col gap-0.5 p-1">
        <div className="flex items-center gap-2 p-2 rounded-sm">
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-muted-foreground/60 border border-border shrink-0">
            <span className="text-xs font-semibold text-white leading-4 text-center w-6">
              A
            </span>
          </div>
          <span className="flex-1 text-[13px] font-medium text-foreground/80 leading-4 truncate">
            OwenBalance
          </span>
        </div>

        {/* Upgrade CTA */}
        <div className="flex flex-col bg-grape rounded-sm w-full">
          <div className="flex items-center pt-2 px-3">
            <span className="flex-1 text-xs font-medium text-foreground/80 leading-4">
              Get exclusive discounts
            </span>
          </div>
          <div className="flex flex-col p-2">
            <button className="flex items-center justify-center h-6 w-full bg-[#792fff] rounded-sm text-xs font-semibold text-white leading-none whitespace-nowrap">
              Upgrade Plan
            </button>
          </div>
        </div>
      </div>

      {/* Favorites, Purchased */}
      <div className="flex flex-col gap-0.5 p-1 border-b border-border">
        <DropdownItem label="Favorites" />
        <DropdownItem label="Purchased" />
      </div>

      {/* Uploaded, Income */}
      <div className="flex flex-col gap-0.5 p-1 border-b border-border">
        <DropdownItem label="Uploaded" />
        <DropdownItem label="Income" />
      </div>

      {/* Settings */}
      <div className="flex flex-col p-1 border-b border-border">
        <DropdownItem label="Settings" rightIcon={<ExternalLinkSmallIcon />} />
      </div>

      {/* Theme — with hover submenu */}
      <div
        className="relative flex flex-col p-1 border-b border-border"
        onMouseEnter={() => setShowTheme(true)}
        onMouseLeave={() => setShowTheme(false)}
      >
        <DropdownItem label="Theme" rightIcon={<ChevronRightIcon />} />
        {showTheme && <ThemeSubmenu />}
      </div>

      {/* Help */}
      <div className="flex flex-col p-1 border-b border-border">
        <DropdownItem label="Help" rightIcon={<ChevronRightIcon />} />
      </div>

      {/* Log Out */}
      <div className="flex flex-col p-1 border-b border-border">
        <DropdownItem label="Log Out" />
      </div>
    </div>
  );
}

export default function TopNav() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNavMenu, setShowNavMenu] = useState(false);
  const navTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleNavEnter = () => {
    if (navTimerRef.current) clearTimeout(navTimerRef.current);
    setShowNavMenu(true);
  };
  const handleNavLeave = () => {
    navTimerRef.current = setTimeout(() => setShowNavMenu(false), 150);
  };

  return (
    <header className="flex items-center justify-between h-14 lg:h-16 px-2 bg-background border-b border-border shrink-0">
      {/* Left: Logo + Brand */}
      <div
        className="relative flex items-center h-full cursor-pointer p-1 shrink-0"
        onMouseEnter={handleNavEnter}
        onMouseLeave={handleNavLeave}
      >
        <div className="flex items-center justify-center w-10 h-10 p-2 rounded">
          <D5Logo />
        </div>
        <button
          className={`flex items-center h-full px-2 py-1 rounded-md outline-none transition-[color,box-shadow] hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 ${showNavMenu ? "bg-accent/50 text-accent-foreground" : ""}`}
        >
          <span className="text-[13px] font-semibold leading-4 text-center whitespace-nowrap">
            D5 WORKS
          </span>
          <svg className={`ml-1 transition-transform duration-200 ${showNavMenu ? "rotate-180" : ""}`} width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M3 5L6 8L9 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        {showNavMenu && <NavigationMenu onClose={() => setShowNavMenu(false)} />}
      </div>

      {/* Mid: Search */}
      <div className="hidden md:flex flex-1 items-center justify-center h-full px-2 py-1">
        <div className="flex items-center flex-1 h-10 bg-muted rounded-lg max-w-3xl">
          <div className="flex items-center justify-center px-3 py-1">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-muted-foreground">
              <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M11 11L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <span className="text-xs text-muted-foreground leading-4">
            &quot;/&quot; to search
          </span>
        </div>
      </div>

      {/* Right: Upload + Avatar */}
      <div className="flex items-center gap-2 lg:gap-4 h-full px-2 shrink-0">
        <button className="flex items-center justify-center h-8 lg:h-10 px-3 lg:px-4 bg-primary rounded-md text-primary-foreground text-xs lg:text-sm font-semibold leading-none whitespace-nowrap">
          Upload
        </button>
        <div className="relative">
          <button
            onClick={() => setShowDropdown((prev) => !prev)}
            className="flex items-center justify-center w-8 h-8 rounded-full"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-mikado border-2 border-border">
              <span className="text-sm font-semibold text-white leading-5 text-center w-8">
                A
              </span>
            </div>
          </button>
          {showDropdown && (
            <AvatarDropdown onClose={() => setShowDropdown(false)} />
          )}
        </div>
      </div>
    </header>
  );
}
