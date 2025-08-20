import CustomersTable from "../../features/customers/CustomersTable";
import FilterCustomerModal from "../../features/customers/FilterCustomerModal";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import Search from "../../ui/Search";
import { useCustomerFilter } from "../../contexts/CustomerFilterContext";
import { useEffect, useState } from "react";
import CustomerTableOperations from "../../features/customers/CustomerTableOperations";

function Customers() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const { setSearchTerm } = useCustomerFilter();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);
    return () => clearTimeout(handler);
  }, [query]);
  useEffect(() => {
    setSearchTerm(debouncedQuery);
  }, [debouncedQuery, setSearchTerm]);
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Customers</Heading>
        <Search query={query} setQuery={setQuery} elements="customers" />

        <CustomerTableOperations />
      </Row>
      <Row>
        <CustomersTable />
      </Row>
    </>
  );
}

export default Customers;
