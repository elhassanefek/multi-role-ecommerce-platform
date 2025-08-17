import { useSellerProducts } from "./useSellerProducts";

import ProductRow from "./ProductRow";
import Table from "../../ui/Table";
import { useSearchParams } from "react-router-dom";
import { applyProductsFilters } from "./filterUtils";
import { useProductFilter } from "../../contexts/ProductFilterContext";
import { useCategories } from "../categories/useCategories";
import Pagination from "../../ui/Pagination";
function ProductsTable() {
  const { products, isLoading, error } = useSellerProducts();
  const [searchParams] = useSearchParams();
  const { filters, searchTerm } = useProductFilter();
  const { categories } = useCategories();
  const filteredProducts = applyProductsFilters(products, filters, searchTerm);
  //sorting
  const sortBy = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedProducts = filteredProducts.sort((a, b) => {
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
    <Table columns="3fr 2fr 1.5fr 2.2fr 1fr 1fr">
      <Table.Header>
        <div>Name</div>
        <div>Category</div>
        <div>Quantity</div>
        <div>Price</div>
        <div>Featured</div>
        <div></div>
      </Table.Header>

      <Table.Body
        data={sortedProducts}
        render={(product) => <ProductRow product={product} key={product.id} />}
      />
      <Table.Footer>
        <Pagination count={20} />
      </Table.Footer>
    </Table>
  );
}

export default ProductsTable;
