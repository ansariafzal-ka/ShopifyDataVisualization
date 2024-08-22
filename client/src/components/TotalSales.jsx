import ChartComponent from "./utils/ChartComponent";

const TotalSales = ({ interval }) => (
  <ChartComponent
    dataUrl={`${import.meta.env.VITE_API_URL}/total-sales?interval=${interval}`}
    title={`Total Sales (${interval})`}
  />
);

export default TotalSales;
