import { useOrderProduct } from "./useOrderProduct";

import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

function OrderForm({ register, formState }) {
  const { isOrdering } = useOrderProduct();

  const { errors } = formState;
  return (
    <>
      <FormRow label="FullName" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isOrdering}
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow label="Phone Number" error={errors?.phone?.message}>
        <Input
          type="text"
          id="phone"
          disabled={isOrdering}
          {...register("phone", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow label="Email" error={errors?.email?.message}>
        <Input
          type="text"
          id="email"
          disabled={isOrdering}
          {...register("email")}
        />
      </FormRow>
      <FormRow label="Country" error={errors?.country?.message}>
        <Input
          type="text"
          id="country"
          disabled={isOrdering}
          {...register("country", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow label="City" error={errors?.city?.message}>
        <Input
          type="text"
          id="city"
          disabled={isOrdering}
          {...register("city", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow label="Street" error={errors?.street?.message}>
        <Input
          type="text"
          id="street"
          disabled={isOrdering}
          {...register("street", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow label="Postal Code" error={errors?.code?.message}>
        <Input
          type="number"
          id="code"
          disabled={isOrdering}
          {...register("code", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow label="Notes" error={errors?.notes?.message}>
        <Input
          type="text"
          id="notes"
          disabled={isOrdering}
          {...register("notes")}
        />
      </FormRow>
    </>
  );
}

export default OrderForm;
