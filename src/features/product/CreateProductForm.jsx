import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import { useCreateProduct } from "./useCreateProduct";
import { useEditProduct } from "./useEditProduct";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";
import Button from "../../ui/Button";
import { getCurrentTimestamp } from "../../utils/helpers";
import { useCreateCategory } from "../categories/useCreateCategory";
import { useDeleteCategory } from "../categories/useDeleteCategory";
import { useQueryClient } from "@tanstack/react-query";
import { useSellerProducts } from "./useSellerProducts";

function CreateProductForm({ productToEdit = {}, onCloseModel }) {
  const { createProduct, isCreating } = useCreateProduct();
  const { editProduct, isEditing } = useEditProduct();
  const { createCategory } = useCreateCategory();
  const { deleteCategory } = useDeleteCategory();
  const queryClient = useQueryClient();

  const categories = queryClient.getQueryData(["categories"]) || [];

  const isWorking = isCreating || isEditing;
  const { id: editId, ...editValues } = productToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  // Helper: Ensure category exists (creates if not)
  function ensureCategoryExists(categoryName) {
    const exists = categories.some(
      (cat) => cat.name.toLowerCase() === categoryName.toLowerCase()
    );
    if (!exists) {
      createCategory({
        id: crypto.randomUUID(),
        name: categoryName,
      });
    }
  }

  // Helper: Delete category if no products belong to it (uses fresh data)
  async function deleteCategoryIfEmpty(categoryName) {
    // Wait for the latest data
    await queryClient.refetchQueries(["products"], { exact: true });
    const freshProducts = queryClient.getQueryData(["products"]) || [];

    const hasProducts = freshProducts.some((p) => p.category === categoryName);
    if (!hasProducts) {
      const categoryToDelete = categories.find(
        (cat) => cat.name === categoryName
      );
      if (categoryToDelete) {
        deleteCategory(categoryToDelete.id, {
          onSuccess: () =>
            console.log(`Empty category "${categoryName}" deleted`),
          onError: (err) => console.error("Failed to delete category:", err),
        });
      }
    }
  }

  function onSubmit(data) {
    if (isEditSession) {
      const updatedFields = { ...data, editedAt: getCurrentTimestamp() };
      const oldCategory = editValues.category;
      const newCategory = updatedFields.category;

      editProduct(
        { id: editId, updatedFields },
        {
          onSuccess: async () => {
            // Invalidate and refetch to ensure fresh data
            await queryClient.invalidateQueries(["products"]);
            await queryClient.refetchQueries(["products"], { exact: true });

            // Now safely check if old category is empty
            await deleteCategoryIfEmpty(oldCategory);

            // Ensure new category exists
            ensureCategoryExists(newCategory);

            // Reset form and close modal
            reset();
            onCloseModel?.();
          },
        }
      );
    } else {
      // Creating a new product
      createProduct(
        { ...data, addedAt: getCurrentTimestamp() },
        {
          onSuccess: () => {
            ensureCategoryExists(data.category);
            reset();
            onCloseModel?.();
          },
        }
      );
    }
  }

  const { errors } = formState;

  return (
    <Form onSubmit={handleSubmit(onSubmit)} type="modal">
      <FormRow label="Product name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Category" error={errors?.category?.message}>
        <Input
          type="text"
          id="category"
          disabled={isWorking}
          {...register("category", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Quantity" error={errors?.quantity?.message}>
        <Input
          type="number"
          id="quantity"
          disabled={isWorking}
          {...register("quantity", {
            required: "This field is required",
            min: { value: 1, message: "Quantity should be at least 1" },
          })}
        />
      </FormRow>

      <FormRow label="Price" error={errors?.price?.message}>
        <Input
          type="number"
          id="price"
          disabled={isWorking}
          {...register("price", {
            required: "This field is required",
            min: { value: 1, message: "Price should be at least 1" },
          })}
        />
      </FormRow>

      <FormRow label="Featured" error={errors?.featured?.message}>
        <Input
          type="checkbox"
          id="featured"
          disabled={isWorking}
          {...register("featured")}
        />
      </FormRow>

      <FormRow
        label="Description for Website"
        error={errors?.description?.message}
      >
        <Textarea
          id="description"
          defaultValue=""
          disabled={isWorking}
          {...register("description")}
        />
      </FormRow>

      <FormRow>
        <Button
          $variations="secondary"
          type="reset"
          onClick={() => onCloseModel?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking} $variations="primary">
          {isEditSession ? "Edit product" : "Create new product"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateProductForm;
