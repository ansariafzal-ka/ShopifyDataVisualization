import ChartComponent from "./utils/ChartComponent";

const SalesGrowthRate = ({ interval }) => (
  <ChartComponent
    dataUrl={`${
      import.meta.env.VITE_API_URL
    }/sales-growth-rate?interval=${interval}`}
    title={`Sales Growth Rate (${interval})`}
  />
);

export default SalesGrowthRate;
