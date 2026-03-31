import TopNav from "@/app/components/TopNav";
import Sidebar from "@/app/components/Sidebar";
import IncomeHeader from "@/app/components/IncomeHeader";
import InfoBanner from "@/app/components/InfoBanner";
import EarningsCards from "@/app/components/EarningsCards";
import SalesTable from "@/app/components/SalesTable";

export default function IncomePage() {
  return (
    <div className="flex flex-col h-screen w-full bg-background overflow-hidden">
      <TopNav />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex flex-col flex-1 overflow-y-auto">
          <IncomeHeader />
          <InfoBanner />
          <EarningsCards />
          <SalesTable />
        </main>
      </div>
    </div>
  );
}
