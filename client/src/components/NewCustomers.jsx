import ChartComponent from "./utils/ChartComponent";

const NewCustomers = ({ interval }) => (
  <ChartComponent
    dataUrl={`${
      import.meta.env.VITE_API_URL
    }/new-customers?interval=${interval}`}
    title={`New Customers (${interval})`}
  />
);

export default NewCustomers;
