"use client";

import { useState, useEffect, useCallback } from "react";

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CashOutDialog({ onClose }: { onClose: () => void }) {
  const handleClose = useCallback(() => onClose(), [onClose]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") handleClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [handleClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={handleClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[540px] mx-4 bg-card rounded-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200 flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-2 shrink-0">
          <div className="flex items-center px-2">
            <span className="text-[13px] font-medium text-foreground leading-5">
              提现
            </span>
          </div>
          <button
            onClick={handleClose}
            className="flex items-center justify-center w-6 h-6 rounded text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-col gap-4 px-10 py-4">
          {/* Title */}
          <div className="flex flex-col gap-1">
            <p className="text-base font-medium text-foreground leading-[22px]">
              提现功能即将开放
            </p>
            <p className="text-xs font-normal text-muted-foreground leading-[22px]">
              我们正在接入安全高效的支付系统...
            </p>
          </div>

          {/* Info card */}
          <div className="flex flex-col border border-border rounded-lg bg-muted/30">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <span className="text-sm font-medium text-foreground leading-4 whitespace-nowrap">
                当前净收入
              </span>
              <span className="text-sm font-semibold text-positive leading-4">
                USD 1214.56
              </span>
            </div>
            <div className="flex flex-col gap-0 p-4">
              <p className="text-[13px] font-medium text-foreground/90 leading-6">
                ✓ 你的收益数据完整保留，随时可查看
              </p>
              <p className="text-[13px] font-medium text-foreground/90 leading-6">
                ✓ 提现功能预计于 2026 年 Q3 开放
              </p>
            </div>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-2">
            <p className="text-[13px] font-normal text-foreground/80 leading-4">
              感谢你在 D5 Works 的创作，如有疑问请联系
            </p>
            <a
              href="mailto:works-support@d5techs.com"
              className="text-[13px] font-normal leading-4 text-[#a675ff] hover:underline"
            >
              works-support@d5techs.com
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end p-4 border-t border-border shrink-0">
          <button
            onClick={handleClose}
            className="flex items-center justify-center h-8 px-4 bg-foreground text-background rounded text-[13px] font-normal leading-none hover:opacity-90 transition-opacity"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

export default function EarningsCards() {
  const [showCashOut, setShowCashOut] = useState(false);

  return (
    <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 mx-4 lg:mx-10 mt-4 lg:mt-6">
      {/* Cumulative Earnings */}
      <div className="flex-1 flex flex-col border border-border rounded-lg min-h-[96px]">
        <div className="flex flex-1 flex-col justify-between p-2">
          <div className="flex flex-col h-10 justify-center p-2">
            <span className="text-sm font-medium text-muted-foreground leading-none whitespace-nowrap">
              累积收益
            </span>
          </div>
          <div className="flex items-center w-full">
            <div className="flex flex-1 flex-wrap items-center justify-between gap-2 p-2 leading-normal whitespace-nowrap">
              <span className="text-base font-semibold text-foreground">
                USD$ 1,234.56
              </span>
              <div className="flex items-center gap-1">
                <span className="text-xs font-normal text-muted-foreground">
                  最近1 周
                </span>
                <div className="flex items-center gap-1 font-semibold">
                  <span className="text-xs text-foreground">USD$ 38.00</span>
                  <span className="text-[13px] text-positive">↑</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Withdrawable */}
      <div className="flex-1 flex flex-col border border-border rounded-lg h-auto sm:h-[96px] justify-end">
        <div className="flex flex-col p-2 w-full">
          <div className="flex flex-col h-10 justify-center p-2">
            <span className="text-sm font-medium text-muted-foreground leading-none whitespace-nowrap">
              可提现
            </span>
          </div>
          <div className="flex items-center w-full">
            <div className="flex flex-1 items-center p-2">
              <span className="text-base font-semibold text-foreground leading-normal whitespace-nowrap">
                USD$ 38.00
              </span>
            </div>
            <div className="flex items-center justify-center p-2">
              <button
                onClick={() => setShowCashOut(true)}
                className="flex items-center justify-center h-6 px-2 border border-border rounded-sm text-xs font-semibold text-foreground leading-none whitespace-nowrap hover:bg-accent transition-colors"
              >
                Cash out
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Cash Out Dialog */}
      {showCashOut && <CashOutDialog onClose={() => setShowCashOut(false)} />}
    </div>
  );
}
