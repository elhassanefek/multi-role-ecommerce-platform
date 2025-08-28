import Button from "../../ui/Button";
import Model from "../../ui/Model";
import { HiOutlinePlus } from "react-icons/hi";
import CreateProductForm from "./CreateProductForm";

function AddProduct() {
  return (
    <div>
      <Model>
        <Model.Open opens="product-form">
          <Button className="flex items-center gap-1 px-2 sm:px-4 py-1 sm:py-2">
            <HiOutlinePlus />
            <span className="hidden sm:inline text-grey-700 font-medium hover:text-indigo-600">
              Add new product
            </span>
          </Button>
        </Model.Open>
        <Model.Window name="product-form">
          <CreateProductForm />
        </Model.Window>
      </Model>
    </div>
  );
}

export default AddProduct;
