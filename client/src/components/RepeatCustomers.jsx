import BarChart from "./utils/BarChart";

const RepeatCustomers = ({ interval }) => (
  <BarChart
    dataUrl={`http://localhost:5000/api/v1/analytics/repeat-customers?interval=${interval}`}
    title={`Number of Repeat Customers (${interval})`}
  />
);

export default RepeatCustomers;
