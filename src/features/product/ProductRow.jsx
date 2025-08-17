import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import { useDeleteProduct } from "./useDeleteProduct";
import { HiOutlinePencil, HiTrash } from "react-icons/hi";

import CreateProductForm from "./CreateProductForm";
import Model from "../../ui/Model";
import Menus from "../../ui/Menus";
import Table from "../../ui/Table";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteCategory } from "../categories/useDeleteCategory";
import { useQueryClient } from "@tanstack/react-query";

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

function ProductRow({ product }) {
  const { id: productId, name, price, category, featured, quantity } = product;
  const { deleteProduct, isDeleting: isDeleteingProduct } = useDeleteProduct();
  const { deleteCategory, isDeletingCategory } = useDeleteCategory();
  const isDeleting = isDeleteingProduct || isDeletingCategory;

  const queryClient = useQueryClient();
  const handleDelete = (productId) => {
    const products = queryClient.getQueryData(["products"]) || [];
    const categories = queryClient.getQueryData(["categories"]) || [];
    const categoryProducts = products.filter((p) => p.category === category);
    const isLastCategory = categoryProducts.length === 1;
    deleteProduct(productId, {
      onSuccess: () => {
        if (isLastCategory) {
          const categoryToDelte = categories.find(
            (cat) => cat.name === category
          );
          if (categoryToDelte) {
            deleteCategory(categoryToDelte.id, {
              onSuccess: () => {
                console.log(`Empty category "${category}" deleted`);
              },
              onError: (error) => {
                console.error("Failed to delete category:", error);
              },
            });
          }
        }
      },
    });
  };
  return (
    <>
      <Table.Row>
        <div>{name}</div>
        <div>{category}</div>
        <div>{quantity}</div>
        <Price>{formatCurrency(price)}</Price>
        <div>{featured ? "Yes" : "No"}</div>

        <div>
          <Model>
            <Menus>
              <Menus.Menu>
                <Menus.Toggle id={productId} />

                <Menus.List id={productId}>
                  <Model.Open opens="edit">
                    <Menus.Button icon={<HiOutlinePencil />}>Edit</Menus.Button>
                  </Model.Open>
                  <Model.Open opens="delete">
                    <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
                  </Model.Open>
                </Menus.List>
                <Model.Window name="edit">
                  <CreateProductForm productToEdit={product} />
                </Model.Window>
                <Model.Window name="delete">
                  <ConfirmDelete
                    resourceName="product"
                    disabled={isDeleting}
                    onConfirm={() => handleDelete(productId)}
                  />
                </Model.Window>
              </Menus.Menu>
            </Menus>
          </Model>
        </div>
      </Table.Row>
    </>
  );
}

export default ProductRow;
