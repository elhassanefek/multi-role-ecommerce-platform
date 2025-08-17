import { useForm } from "react-hook-form";
import { useUpdateOrder } from "./useUpdateOrder";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";
import Button from "../../ui/Button";
function AddTrackingInfoForm({ orderToupdate, onCloseModel }) {
  const { updateOrder, isUpdating: isWorking } = useUpdateOrder();

  const editSession = !!orderToupdate.trackingInfo;

  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: editSession ? orderToupdate.trackingInfo : {},
  });

  const { errors } = formState;

  const onSubmit = (data) => {
    const updatedOrder = {
      ...orderToupdate,
      trackingInfo: { ...data },
      status: data.status,
    };

    updateOrder(updatedOrder, {
      onSuccess: () => {
        reset();
        onCloseModel?.();
      },
    });
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModel ? "modal" : "regular"}
    >
      <FormRow label="Courier Name" error={errors?.courier?.message}>
        <Input
          type="text"
          id="courier"
          disabled={isWorking}
          {...register("courier", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow label="Tracking Number" error={errors?.trackingNumber?.message}>
        <Input
          type="text"
          id="trackingNumber"
          disabled={isWorking}
          {...register("trackingNumber", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow label="Tracking URL" error={errors?.url?.message}>
        <Input
          type="url"
          id="url"
          disabled={isWorking}
          {...register("url", {
            pattern: {
              value: /^(ftp|http|https):\/\/[^ "]+$/,
              message: "Enter a valid URL",
            },
          })}
        />
      </FormRow>
      <FormRow label="Shipped Date" error={errors?.shippedDate?.message}>
        <Input
          type="date"
          id="shippedDate"
          disabled={isWorking}
          {...register("shippedDate", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow
        label="Estimated Delivery"
        error={errors?.estimatedDate?.message}
      >
        <Input
          type="date"
          id="estimatedDate"
          disabled={isWorking}
          {...register("estimatedDate")}
        />
      </FormRow>
      <FormRow label="Status" error={errors?.status?.message}>
        <select
          id="status"
          {...register("status", { required: "This field is required" })}
          disabled={isWorking}
        >
          <option value="Shipped">Shipped</option>
          <option value="In Transit">In Transit</option>
          <option value="Delivered">Delivered</option>
          <option value="Delayed">Delayed</option>
        </select>
      </FormRow>
      <FormRow label="Additonal Notes" error={errors?.notes?.message}>
        <Textarea
          id="notes"
          defaultValue=""
          disabled={isWorking}
          {...register("notes")}
        />
      </FormRow>
      <Button
        variations="secondary"
        type="reset"
        onClick={() => onCloseModel?.()}
      >
        Cancel
      </Button>
      <Button disabled={isWorking}>
        {editSession
          ? "Update Tracking informations"
          : "Add Tracking informations"}
      </Button>
    </Form>
  );
}

export default AddTrackingInfoForm;
