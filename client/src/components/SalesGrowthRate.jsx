import ChartComponent from "./utils/ChartComponent";

const SalesGrowthRate = ({ interval }) => (
  <ChartComponent
    dataUrl={`http://localhost:5000/api/v1/analytics/sales-growth-rate?interval=${interval}`}
    title={`Sales Growth Rate (${interval})`}
  />
);

export default SalesGrowthRate;
