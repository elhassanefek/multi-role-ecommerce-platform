import TableOperations from "../../ui/TableOperations";
import SortBy from "../../ui/SortBy";
import FilterCustomerModal from "./FilterCustomerModal";
function CustomerTableOperations() {
  return (
    <TableOperations>
      <FilterCustomerModal />
      <SortBy
        options={[
          { value: "fullName-asc", label: "Sort by name (A-Z)" },
          { value: "fullName-desc", label: "Sort by name (Z-A)" },
          { value: "totalSpent-asc", label: "Sort by Total Spent (low first)" },
          {
            value: "totalSpent-desc",
            label: "Sort by Total Spent (high first)",
          },
        ]}
      />
    </TableOperations>
  );
}

export default CustomerTableOperations;
