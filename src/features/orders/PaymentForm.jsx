import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useOrderProduct } from "./useOrderProduct";

function PaymentForm({ register, formState }) {
  const { errors } = formState;
  const { isOrdering } = useOrderProduct();
  return (
    <>
      <FormRow label="Cart Number" error={errors?.cart?.message}>
        <Input
          type="number"
          id="cart"
          disabled={isOrdering}
          {...register("cart", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow label="Expiry Date" error={errors?.expiry?.message}>
        <Input
          type="text"
          id="expiry"
          disabled={isOrdering}
          {...register("expiry", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow label="CVV" error={errors?.cvv?.message}>
        <Input
          type="number"
          id="cvv"
          disabled={isOrdering}
          {...register("cvv", {
            required: "This field is required",
          })}
        />
      </FormRow>
    </>
  );
}

export default PaymentForm;
