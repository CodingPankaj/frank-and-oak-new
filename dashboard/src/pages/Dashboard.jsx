import { DashboardOrderSummary } from "../components/dashboard/DashboardOrderSummary";
import { RecentOrders } from "../components/dashboard/RecentOrders";
import { RevenueCard } from "../components/dashboard/RevenueCard";
import { TopSellingProducts } from "../components/dashboard/TopSellingProducts";
import { TotalOrders } from "../components/dashboard/TotalOrders";
import { TotalProducts } from "../components/dashboard/TotalProducts";
import { TotalSales } from "../components/dashboard/TotalSales";
import { TotalVisitors } from "../components/dashboard/TotalVisitors";
import { MainSection } from "../components/MainSection";

export const Dashboard = () => {
  return (
    <MainSection>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-4">
        <TotalOrders />
        <TotalSales />
        <TotalVisitors />
        <TotalProducts />
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <RevenueCard />
        <TopSellingProducts />
      </div>
      <div className="md grid grid-cols-1 gap-5 lg:grid-cols-2">
        <DashboardOrderSummary />
        <RecentOrders />
      </div>
    </MainSection>
  );
};
