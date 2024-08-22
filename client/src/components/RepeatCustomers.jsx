import BarChart from "./utils/BarChart";

const RepeatCustomers = ({ interval }) => (
  <BarChart
    dataUrl={`${
      import.meta.env.VITE_API_URL
    }/repeat-customers?interval=${interval}`}
    title={`Number of Repeat Customers (${interval})`}
  />
);

export default RepeatCustomers;
