import Sidebar from "./Sidebar";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
      {/* You can add <RightSidebar /> here if needed */}
    </div>
  );
};

export default AppLayout;
