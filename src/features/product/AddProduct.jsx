import Button from "../../ui/Button";
import Model from "../../ui/Model";
import { HiOutlinePlus } from "react-icons/hi";
import CreateProductForm from "./CreateProductForm";

function AddProduct() {
  return (
    <div>
      <Model>
        <Model.Open opens="product-form">
          <Button>
            <HiOutlinePlus />
            Add new product
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
