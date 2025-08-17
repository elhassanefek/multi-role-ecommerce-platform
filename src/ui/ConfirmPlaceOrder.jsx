import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";

const StyledConfirmPlaceOrder = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;
function ConfirmPlaceOrder({
  itemCount,
  totalAmount,
  paymentMethod,
  onConfirm,
  onCloseModel,
  disabled,
}) {
  function handleConfirmAndClose() {
    onConfirm?.();
    onCloseModel?.();
  }
  return (
    <StyledConfirmPlaceOrder>
      <Heading as="h3">Confirm Your Order</Heading>
      <p>
        You are about to place an order for <strong>{itemCount}</strong>{" "}
        {itemCount > 1 ? "items" : "item"} totaling{" "}
        <strong>${totalAmount}</strong> using{" "}
        <strong>
          {paymentMethod === "cod" ? "Cash on Delivery" : "Online Payment"}
        </strong>
        .
      </p>

      {paymentMethod === "online" && (
        <p>
          After confirming, you will be redirected to a secure payment gateway.
        </p>
      )}

      {paymentMethod === "cod" && (
        <p>
          Your order will be confirmed and prepared for shipping. You will pay
          upon delivery.
        </p>
      )}

      <div>
        <Button
          variation="secondary"
          onClick={onCloseModel}
          disabled={disabled}
        >
          Cancel
        </Button>
        <Button
          variation="primary"
          onClick={handleConfirmAndClose}
          disabled={disabled}
        >
          Confirm Order
        </Button>
      </div>
    </StyledConfirmPlaceOrder>
  );
}

export default ConfirmPlaceOrder;
