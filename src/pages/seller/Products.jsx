import ProductsTable from "../../features/product/ProductsTable";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import AddProduct from "../../features/product/AddProduct";
import ProductTableOperations from "../../features/product/ProductTableOperations";
import Search from "../../ui/Search";
import { useEffect, useState } from "react";
import { useProductFilter } from "../../contexts/ProductFilterContext";

function Products() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const { setSearchTerm } = useProductFilter();

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
        <Heading as="h1">All Products</Heading>
        <Search query={query} setQuery={setQuery} elements="products" />
        <ProductTableOperations />
        <AddProduct />
      </Row>
      <Row>
        <ProductsTable />
      </Row>
    </>
  );
}

export default Products;
