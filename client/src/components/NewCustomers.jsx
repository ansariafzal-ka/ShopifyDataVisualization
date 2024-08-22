import ChartComponent from "./utils/ChartComponent";

const NewCustomers = ({ interval }) => (
  <ChartComponent
    dataUrl={`http://localhost:5000/api/v1/analytics/new-customers?interval=${interval}`}
    title={`New Customers (${interval})`}
  />
);

export default NewCustomers;
