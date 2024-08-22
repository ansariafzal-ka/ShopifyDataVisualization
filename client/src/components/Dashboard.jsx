import { useState } from "react";
import NewCustomers from "./NewCustomers";
import SalesGrowthRate from "./SalesGrowthRate";
import TotalSales from "./TotalSales";
import RepeatCustomers from "./RepeatCustomers";
import GeoDistributionChart from "./utils/GeoDistributionChart";
import CustomerLifetimeValueHeatmap from "./utils/CustomerLifetimeValueHeatmap";

const Dashboard = () => {
  const [interval, setInterval] = useState("monthly");

  return (
    <div className="w-full min-h-screen p-8 bg-gray-100">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Dashboard</h1>
      <p className="text-base text-gray-500 mb-4">
        Kindly refresh the page if the charts are not appearing
      </p>
      <div className="mb-6">
        <label htmlFor="interval" className="text-gray-700 font-medium mr-2">
          Select Interval
        </label>
        <select
          id="interval"
          value={interval}
          onChange={(e) => setInterval(e.target.value)}
          className="p-2 border border-gray-300 rounded-md cursor-pointer"
        >
          <option value="daily">Daily</option>
          <option value="monthly">Monthly</option>
          <option value="quarterly">Quarterly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-md md:h-[525px]">
          <TotalSales interval={interval} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md md:h-[525px]">
          <SalesGrowthRate interval={interval} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md md:h-[525px]">
          <NewCustomers interval={interval} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md md:h-[525px]">
          <RepeatCustomers interval={interval} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md md:h-[525px]">
          <GeoDistributionChart />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md md:h-[525px]">
          <CustomerLifetimeValueHeatmap />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
