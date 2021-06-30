import React, { useEffect } from "react";
import { Header, Timeline, Sidebar } from "../components/index";

function Dashboard() {
  useEffect(() => {
    document.title = "Instagram";
  }, []);

  return (
    <div className="bg-gray-background">
      <Header />
      <div className="grid">
        <Timeline />
        <Sidebar />
      </div>
    </div>
  );
}

export default Dashboard;
