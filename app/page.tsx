"use client";

import { useState } from "react";
import TopNav from "@/app/components/TopNav";
import Sidebar from "@/app/components/Sidebar";
import IncomeHeader from "@/app/components/IncomeHeader";
import InfoBanner from "@/app/components/InfoBanner";
import EarningsCards from "@/app/components/EarningsCards";
import SalesTable from "@/app/components/SalesTable";
import UploadedContent from "@/app/components/UploadedContent";
import EditModelDialog from "@/app/components/EditModelDialog";

export type PageId = "favorites" | "purchased" | "uploaded" | "income";

export default function IncomePage() {
  const [activePage, setActivePage] = useState<PageId>("income");
  const [showUploadDialog, setShowUploadDialog] = useState(false);

  return (
    <div className="flex flex-col h-screen w-full bg-background overflow-hidden">
      <TopNav activePage={activePage} onPageChange={setActivePage} onUploadClick={() => setShowUploadDialog(true)} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar activePage={activePage} onPageChange={setActivePage} />
        <main className="flex flex-col flex-1 overflow-y-auto">
          {activePage === "income" && (
            <>
              <IncomeHeader />
              <InfoBanner />
              <EarningsCards />
              <SalesTable />
            </>
          )}
          {activePage === "uploaded" && <UploadedContent />}
        </main>
      </div>

      {showUploadDialog && (
        <EditModelDialog
          title="Upload"
          modelName=""
          onClose={() => setShowUploadDialog(false)}
        />
      )}
    </div>
  );
}
