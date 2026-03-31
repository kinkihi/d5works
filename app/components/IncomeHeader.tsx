"use client";

export default function IncomeHeader() {
  return (
    <div className="flex items-center justify-between px-4 lg:px-10 py-4 lg:py-6">
      <div className="flex flex-col gap-1.5">
        <h1 className="text-lg lg:text-xl font-semibold leading-5 text-foreground">
          Income
        </h1>
        <p className="text-xs font-medium leading-4 text-muted-foreground">
          Your creative earnings
        </p>
      </div>
      <button className="flex items-center justify-center h-6 px-2 border border-border rounded-sm text-xs font-semibold text-foreground leading-none whitespace-nowrap">
        Payment Method
      </button>
    </div>
  );
}
