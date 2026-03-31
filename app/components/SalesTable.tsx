"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface SaleRecord {
  date: string;
  time: string;
  orderId: string;
  productName: string;
  purchaser: string;
  originalPrice: string;
  discountLabel: string;
  discountPrice: string;
  stripeFee: string;
  income: string;
}

const salesData: SaleRecord[] = [
  { date: "24 Sep 2025", time: "14:30:25", orderId: "#WK20260128001", productName: "Modern Dining Room", purchaser: "Username", originalPrice: "$50.00", discountLabel: "PRO %12", discountPrice: "$44.00", stripeFee: "$1.58", income: "$8.24" },
  { date: "25 Sep 2025", time: "09:15:42", orderId: "#WK20260128002", productName: "Classic Kitchen", purchaser: "DesignFan99", originalPrice: "$65.00", discountLabel: "PRO %12", discountPrice: "$57.20", stripeFee: "$1.96", income: "$12.50" },
  { date: "26 Sep 2025", time: "18:45:10", orderId: "#WK20260128003", productName: "Minimalist Bedroom", purchaser: "HomeDecorPro", originalPrice: "$40.00", discountLabel: "PRO %12", discountPrice: "$35.20", stripeFee: "$1.32", income: "$6.75" },
  { date: "27 Sep 2025", time: "11:22:33", orderId: "#WK20260128004", productName: "Cozy Living Room", purchaser: "InteriorLover", originalPrice: "$55.00", discountLabel: "PRO %12", discountPrice: "$48.40", stripeFee: "$1.70", income: "$9.95" },
  { date: "28 Sep 2025", time: "16:08:55", orderId: "#WK20260128005", productName: "Elegant Office Space", purchaser: "WorkspaceGuru", originalPrice: "$60.00", discountLabel: "PRO %12", discountPrice: "$52.80", stripeFee: "$1.83", income: "$11.00" },
  { date: "29 Sep 2025", time: "08:30:17", orderId: "#WK20260129006", productName: "Modern Workspace", purchaser: "TechNomad", originalPrice: "$80.00", discountLabel: "PRO %12", discountPrice: "$70.40", stripeFee: "$2.34", income: "$15.50" },
  { date: "30 Sep 2025", time: "20:12:44", orderId: "#WK20260130007", productName: "Cozy Creative Studio", purchaser: "ArtisticSoul", originalPrice: "$52.00", discountLabel: "PRO %12", discountPrice: "$45.76", stripeFee: "$1.63", income: "$9.75" },
  { date: "1 Oct 2025", time: "13:55:08", orderId: "#WK20260130008", productName: "Luxury Bathroom", purchaser: "SpaEnthusiast", originalPrice: "$45.00", discountLabel: "PRO %12", discountPrice: "$39.60", stripeFee: "$1.45", income: "$7.25" },
  { date: "2 Oct 2025", time: "07:40:22", orderId: "#WK20260130009", productName: "Modern Entryway", purchaser: "FirstImpression", originalPrice: "$35.00", discountLabel: "PRO %12", discountPrice: "$30.80", stripeFee: "$1.19", income: "$5.50" },
  { date: "3 Oct 2025", time: "15:28:36", orderId: "#WK20260130010", productName: "Scandinavian Loft", purchaser: "NordicDesign", originalPrice: "$70.00", discountLabel: "PRO %12", discountPrice: "$61.60", stripeFee: "$2.09", income: "$13.00" },
  { date: "4 Oct 2025", time: "10:05:51", orderId: "#WK20260130011", productName: "Industrial Kitchen", purchaser: "UrbanChef", originalPrice: "$48.00", discountLabel: "PRO %12", discountPrice: "$42.24", stripeFee: "$1.52", income: "$8.80" },
  { date: "5 Oct 2025", time: "19:33:14", orderId: "#WK20260130012", productName: "Zen Garden Room", purchaser: "PeacefulMind", originalPrice: "$38.00", discountLabel: "PRO %12", discountPrice: "$33.44", stripeFee: "$1.27", income: "$6.25" },
  { date: "6 Oct 2025", time: "12:18:47", orderId: "#WK20260130013", productName: "Art Deco Lounge", purchaser: "VintageVibes", originalPrice: "$58.00", discountLabel: "PRO %12", discountPrice: "$51.04", stripeFee: "$1.78", income: "$10.50" },
  { date: "7 Oct 2025", time: "17:42:03", orderId: "#WK20260130014", productName: "Coastal Retreat", purchaser: "BeachHouse", originalPrice: "$75.00", discountLabel: "PRO %12", discountPrice: "$66.00", stripeFee: "$2.21", income: "$14.00" },
  { date: "8 Oct 2025", time: "06:55:29", orderId: "#WK20260130015", productName: "Rustic Cabin", purchaser: "MountainView", originalPrice: "$42.00", discountLabel: "PRO %12", discountPrice: "$36.96", stripeFee: "$1.37", income: "$7.00" },
  { date: "9 Oct 2025", time: "14:10:38", orderId: "#WK20260130016", productName: "Urban Studio", purchaser: "CityDweller", originalPrice: "$52.00", discountLabel: "PRO %12", discountPrice: "$45.76", stripeFee: "$1.63", income: "$9.50" },
  { date: "10 Oct 2025", time: "09:48:56", orderId: "#WK20260130017", productName: "Country Villa", purchaser: "RuralEscape", originalPrice: "$62.00", discountLabel: "PRO %12", discountPrice: "$54.56", stripeFee: "$1.88", income: "$11.25" },
  { date: "11 Oct 2025", time: "21:05:12", orderId: "#WK20260130018", productName: "Modern Penthouse", purchaser: "SkyHighLiving", originalPrice: "$85.00", discountLabel: "PRO %12", discountPrice: "$74.80", stripeFee: "$2.47", income: "$16.00" },
  { date: "12 Oct 2025", time: "11:37:44", orderId: "#WK20260130019", productName: "Bohemian Suite", purchaser: "FreeSpiritHome", originalPrice: "$46.00", discountLabel: "PRO %12", discountPrice: "$40.48", stripeFee: "$1.47", income: "$8.50" },
  { date: "13 Oct 2025", time: "16:22:09", orderId: "#WK20260130020", productName: "Tropical Veranda", purchaser: "IslandBreeze", originalPrice: "$68.00", discountLabel: "PRO %12", discountPrice: "$59.84", stripeFee: "$2.04", income: "$12.75" },
];

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function SaleDetailDialog({
  sale,
  onClose,
}: {
  sale: SaleRecord;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

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
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Panel */}
      <div
        ref={panelRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[420px] mx-4 bg-card rounded-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-2 bg-card sticky top-0">
          <div className="flex items-center px-2">
            <span className="text-[13px] font-medium text-foreground leading-5">
              Detail
            </span>
          </div>
          <button
            onClick={handleClose}
            className="flex items-center justify-center w-6 h-6 rounded text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Purchaser */}
        <div className="flex flex-col gap-2 px-4 py-2 bg-card">
          <span className="text-[11px] font-normal text-muted-foreground leading-4">
            Purchaser
          </span>
          <div className="flex items-center gap-1.5">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-muted-foreground/60 shrink-0">
              <span className="text-[10px] font-medium text-white leading-none text-center w-6">
                {sale.purchaser.charAt(0).toUpperCase()}
              </span>
            </div>
            <span className="text-xs font-normal text-foreground leading-4">
              {sale.purchaser}
            </span>
          </div>
        </div>

        {/* Product info */}
        <div className="flex items-center gap-4 px-4 py-4 bg-card border-b border-border">
          <div className="w-[100px] h-[56px] rounded bg-muted shrink-0 overflow-hidden" />
          <div className="flex flex-col gap-2 min-w-0">
            <span className="text-sm font-medium text-foreground leading-5 truncate">
              {sale.productName}
            </span>
            <div className="flex flex-col">
              <span className="text-xs font-normal text-muted-foreground leading-4">
                Order Nr. : {sale.orderId}
              </span>
              <span className="text-xs font-normal text-muted-foreground leading-4">
                Date: {sale.date} {sale.time}
              </span>
            </div>
          </div>
        </div>

        {/* Price breakdown */}
        <div className="flex flex-col px-4 py-4 bg-card">
          <div className="flex items-center justify-between py-4 border-b border-border">
            <span className="text-xs font-normal text-muted-foreground leading-4">
              Price
            </span>
            <span className="text-xs font-normal text-foreground leading-4">
              USD {sale.originalPrice}
            </span>
          </div>
          <div className="flex items-center justify-between py-4 border-b border-border">
            <span className="text-xs font-normal text-muted-foreground leading-4">
              Discount ({sale.discountLabel})
            </span>
            <span className="text-xs font-normal text-foreground leading-4">
              USD {sale.discountPrice}
            </span>
          </div>
          <div className="flex items-center justify-between py-4 border-b border-border">
            <span className="text-xs font-normal text-muted-foreground leading-4">
              Stripe (2.9% + $0.30)
            </span>
            <span className="text-xs font-normal text-destructive leading-4">
              -USD {sale.stripeFee}
            </span>
          </div>
          <div className="flex items-center justify-between py-4">
            <span className="text-sm font-semibold text-foreground leading-5">
              Your Income
            </span>
            <span className="text-sm font-semibold text-positive leading-5">
              USD {sale.income}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SalesTable() {
  const [activeTab, setActiveTab] = useState<"sales" | "cashout">("sales");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSale, setSelectedSale] = useState<SaleRecord | null>(null);
  const totalPages = 10;

  return (
    <div className="flex flex-col mt-4 lg:mt-6">
      {/* Sticky Tabs + Table Header */}
      <div className="sticky top-0 z-30 bg-background">
        {/* Tabs */}
        <div className="flex items-center h-16 px-4 lg:px-10 py-2">
          <div className="flex flex-1 items-center h-8 gap-2">
            <button
              onClick={() => setActiveTab("sales")}
              className={`flex items-center h-full p-1 rounded-sm transition-colors ${
                activeTab === "sales" ? "bg-accent" : ""
              }`}
            >
              <div className="flex items-center p-1">
                <span className="text-sm font-semibold text-foreground leading-4 text-center whitespace-nowrap">
                  Sales Records
                </span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab("cashout")}
              className={`flex items-center h-full p-1 rounded-sm transition-colors ${
                activeTab === "cashout" ? "bg-accent" : ""
              }`}
            >
              <div className="flex items-center p-1">
                <span className="text-sm font-semibold text-foreground leading-4 text-center whitespace-nowrap">
                  Cash out
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Table Header */}
        <div className="flex items-center mx-4 lg:mx-10">
          <div className="hidden sm:flex items-center w-[100px] lg:w-[120px] p-3 lg:p-4 border-b border-border">
            <span className="text-[13px] font-semibold text-muted-foreground leading-[18px] whitespace-nowrap">
              Date
            </span>
          </div>
          <div className="flex flex-1 items-center p-3 lg:p-4 border-b border-border">
            <span className="text-[13px] font-semibold text-muted-foreground leading-[18px] whitespace-nowrap">
              Order
            </span>
          </div>
          <div className="flex items-center w-[70px] sm:w-[80px] lg:w-[90px] p-3 lg:p-4 border-b border-border justify-end">
            <span className="text-[13px] font-semibold text-muted-foreground leading-[18px] whitespace-nowrap">
              Earnings
            </span>
          </div>
        </div>
      </div>

      {/* Table Body */}
      <div className="flex flex-col mx-4 lg:mx-10">
        {salesData.map((sale, index) => (
          <div
            key={index}
            onClick={() => setSelectedSale(sale)}
            className="flex items-center cursor-pointer hover:bg-accent/50 transition-colors"
          >
            {/* Date — hidden on mobile */}
            <div className="hidden sm:flex items-center w-[100px] lg:w-[120px] h-[60px] sm:h-[64px] lg:h-[72px] p-3 lg:p-4 border-b border-border">
              <span className="text-[13px] font-normal text-foreground leading-5 whitespace-nowrap">
                {sale.date}
              </span>
            </div>

            {/* Order */}
            <div className="flex flex-1 items-center h-[60px] sm:h-[64px] lg:h-[72px] p-3 lg:p-4 border-b border-border min-w-0">
              <div className="flex flex-1 items-center gap-3 lg:gap-4 min-w-0">
                <div className="w-8 h-8 lg:w-9 lg:h-9 rounded-lg bg-muted shrink-0" />
                <div className="flex flex-col gap-0.5 justify-center min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] sm:text-xs font-normal text-muted-foreground leading-4 truncate">
                      {sale.orderId}
                    </span>
                    {/* Date inline on mobile */}
                    <span className="sm:hidden text-[11px] font-normal text-muted-foreground leading-3">
                      {sale.date}
                    </span>
                  </div>
                  <span className="text-[13px] font-normal text-foreground leading-5 truncate">
                    {sale.productName}
                  </span>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center w-[70px] sm:w-[80px] lg:w-[90px] h-[60px] sm:h-[64px] lg:h-[72px] p-3 lg:p-4 border-b border-border justify-end">
              <span className="text-[13px] font-semibold text-positive leading-5 whitespace-nowrap">
                +{sale.income}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center h-14 lg:h-16 px-2 py-4">
        <div className="flex items-center gap-1 flex-wrap justify-center">
          <button className="flex items-center justify-center w-8 h-8 p-2 rounded-sm opacity-30">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M7.5 2.5L4.5 6L7.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
            const showAlways = page <= 3 || page === totalPages || page === currentPage;
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`items-center justify-center h-8 min-w-[32px] p-2 rounded-sm text-center whitespace-nowrap leading-none ${
                  page === currentPage
                    ? "flex bg-muted text-[13px] font-normal text-foreground"
                    : `${showAlways ? "flex" : "hidden sm:flex"} border border-border text-xs font-medium text-muted-foreground`
                }`}
              >
                {page}
              </button>
            );
          })}

          <button className="flex items-center justify-center w-8 h-8 p-2 rounded-sm">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M4.5 2.5L7.5 6L4.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Detail Dialog */}
      {selectedSale && (
        <SaleDetailDialog
          sale={selectedSale}
          onClose={() => setSelectedSale(null)}
        />
      )}
    </div>
  );
}
