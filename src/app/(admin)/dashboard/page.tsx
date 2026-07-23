import Header from "./components/Header";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <Header />
      <div className="px-6 py-4">
        <h2 className="text-lg font-semibold text-foreground">Dashboard Content</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          This is where the main dashboard content will go.
        </p>
      </div>
    </div>
  );
}