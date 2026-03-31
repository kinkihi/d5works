"use client";

import { useState, useEffect, useCallback } from "react";

function InfoIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.2" />
      <path d="M8 7V11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="8" cy="5.25" r="0.75" fill="currentColor" />
    </svg>
  );
}

export default function InfoBanner() {
  const [expanded, setExpanded] = useState(false);

  const close = useCallback(() => setExpanded(false), []);

  useEffect(() => {
    if (!expanded) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [expanded, close]);

  return (
    <div className="mx-4 lg:mx-10 relative">
      {/* Collapsed banner — always in document flow to reserve space */}
      <div
        onClick={() => setExpanded(true)}
        className="flex items-start gap-2 p-4 bg-grape rounded-lg cursor-pointer"
      >
        <div className="flex items-center justify-center w-4 h-4 shrink-0 mt-0.5">
          <InfoIcon />
        </div>
        <div className="flex flex-1 flex-col gap-1 px-1 min-w-0">
          <span className="text-[13px] font-semibold text-foreground leading-4">
            费用说明
          </span>
          <span className="font-normal leading-5 text-muted-foreground text-xs lg:text-[13px]">
            D5 Works 平台不收取佣金（零佣金），部分费用由创作者承担
          </span>
        </div>
        <span className="hidden sm:flex items-center justify-center h-6 px-2 border border-border rounded-sm text-xs font-semibold text-foreground leading-none whitespace-nowrap shrink-0">
          Show more
        </span>
      </div>

      {/* Expanded overlay — floats above all content */}
      {expanded && (
        <>
          <div className="fixed inset-0 z-40" onClick={close} />
          <div className="absolute left-0 right-0 top-0 z-50 flex flex-col gap-2 p-4 rounded-lg bg-background shadow-[0px_8px_16px_0px_rgba(0,0,0,0.15)] border border-[rgba(175,130,255,0.24)] animate-in fade-in zoom-in-[0.99] duration-150">
            {/* Grape tint on top of opaque background */}
            <div className="absolute inset-0 bg-grape rounded-lg pointer-events-none" />

            {/* Header */}
            <button
              onClick={close}
              className="relative flex items-center justify-between w-full cursor-pointer"
            >
              <div className="flex flex-1 items-center gap-1 min-w-0">
                <div className="flex items-center justify-center w-4 h-4 shrink-0">
                  <InfoIcon />
                </div>
                <span className="text-[13px] font-semibold text-foreground leading-4 px-1">
                  费用说明
                </span>
              </div>
              <span className="hidden sm:flex items-center justify-center h-6 px-2 border border-border rounded-sm text-xs font-semibold text-foreground leading-none whitespace-nowrap shrink-0">
                Hide
              </span>
            </button>

            {/* Content */}
            <div className="relative flex flex-col gap-2 px-6 text-[13px] text-foreground">
              <div className="flex flex-col leading-5">
                <p>D5 Works 平台不收取佣金（零佣金），以下费用由创作者承担：</p>
                <ol className="list-decimal pl-5 mt-1 flex flex-col gap-1">
                  <li className="leading-5">
                    Stripe 收款手续费（入账时扣除）
                    <br />
                    <span className="text-foreground/80">
                      计算方式：3.4% + SGD 0.50。例如：买家支付 USD 10.00 → 你将收到约 USD 9.29
                    </span>
                  </li>
                  <li className="leading-5">
                    提现手续费（提现时扣除）
                    <br />
                    <span className="text-foreground/80">
                      提现时将由支付平台收取手续费，届时以实际扣费为准
                    </span>
                  </li>
                </ol>
              </div>

              <p className="font-semibold leading-4 mt-1">结算说明</p>
              <ol className="list-decimal pl-5 flex flex-col gap-1 leading-5">
                <li>收益于订单完成时间起 14 天后，且累计金额 ≥ USD 100 后进入「可提现」。</li>
                <li>销售记录中显示已扣除收款手续费后的金额</li>
              </ol>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
