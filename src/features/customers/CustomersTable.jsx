import toast from "react-hot-toast";
import { useCustomers } from "./useCustomers";
import Menus from "../../ui/Menus";
import Table from "../../ui/Table";
import CustomerRow from "./CustomerRow";
import { useCustomerFilter } from "../../contexts/CustomerFilterContext";
import { applyCustomersFilters } from "./filterUtils";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../ui/Pagination";
function CustomersTable() {
  const { customers, isLoading, error } = useCustomers();
  const { filters, searchTerm } = useCustomerFilter();
  const [searchParams] = useSearchParams();
  if (isLoading) return <p>Loading...</p>;
  if (error) return toast.error(error);

  const filteredCustomers = applyCustomersFilters(
    customers,
    filters,
    searchTerm
  );
  //sorting
  const sortBy = searchParams.get("sortBy") || "startDate-asc";

  const [field, direction] = sortBy.split("-");

  const modifier = direction === "asc" ? 1 : -1;

  const sortedCustomers = filteredCustomers.sort((a, b) => {
    const aField = a[field];
    const bField = b[field];

    if (typeof aField === "string" && typeof bField === "string")
      return aField.localeCompare(bField) * modifier;
    if (typeof aField === "number" && typeof bField === "number") {
      return (aField - bField) * modifier;
    }
    return String(aField).localeCompare(String(bField)) * modifier;
  });

  return (
    <Menus>
      <Table columns="2fr 2.5fr 2.5fr 1fr 1fr 2fr 1fr">
        <Table.Header>
          <div>Name</div>
          <div>Email</div>
          <div>Phone</div>
          <div>Total Orders</div>
          <div>Country</div>
          <div>City</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCustomers}
          render={(customer) => (
            <CustomerRow customer={customer} key={customer.id} />
          )}
        />
        <Table.Footer>
          <Pagination count={20} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default CustomersTable;
