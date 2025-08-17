import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import FilterProductModal from "./FilterProductModal";
function ProductTableOperations() {
  return (
    <TableOperations>
      {/* <Filter
        filterField="filtered"
        options={[
          { value: "all", label: "All" },
          {
            value: "featured",
            label: "Featured",
          },
          {
            value: "active-products",
            label: "Active",
          },
          {
            value: "archived-products",
            label: "Archived",
          },

          {
            value: "in-stock",
            label: "In Stock",
          },
          {
            value: "out-stock",
            label: "Out of Stock",
          },
        ]}
      /> */}
      <FilterProductModal />
      <SortBy
        options={[
          { value: "name-asc", label: "Sort by name (A-Z)" },
          { value: "name-desc", label: "Sort by name (Z-A)" },
          { value: "price-asc", label: "Sort by price (low first)" },
          { value: "price-desc", label: "Sort by price (high first)" },
        ]}
      />
    </TableOperations>
  );
}

export default ProductTableOperations;
