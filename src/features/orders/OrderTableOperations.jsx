import FilterOrdersModal from "./FilterOrdersModal";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";
function OrderTableOperations() {
  return (
    <TableOperations>
      <FilterOrdersModal />
      <SortBy
        options={[
          { value: "createdAt-asc", label: "Sort by date (newest)" },
          { value: "createdAt-desc", label: "Sort by date (oldest)" },
          { value: "totalPrice-asc", label: "Sort by price (low first)" },
          { value: "totalPrice-desc", label: "Sort by price (high first)" },
        ]}
      />
    </TableOperations>
  );
}

export default OrderTableOperations;
