import ChartComponent from "./utils/ChartComponent";

const TotalSales = ({ interval }) => (
  <ChartComponent
    dataUrl={`http://localhost:5000/api/v1/analytics/total-sales?interval=${interval}`}
    title={`Total Sales (${interval})`}
  />
);

export default TotalSales;
