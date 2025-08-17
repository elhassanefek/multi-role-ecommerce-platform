import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";

const StyledConfirmCancel = styled.div`
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

function ConfirmCancel({ resourceName, onConfirm, disabled, onCloseModel }) {
  function handleConfirmAndClose() {
    onConfirm?.();
    onCloseModel?.();
  }
  return (
    <StyledConfirmCancel>
      <Heading as="h3">Cancel {resourceName}</Heading>
      <p>
        Are you sure you want to Cancel this {resourceName} ? This action cannot
        be undone.
      </p>

      <div>
        <Button
          variation="secondary"
          disabled={disabled}
          onClick={onCloseModel}
        >
          Cancel
        </Button>
        <Button
          $variation="danger"
          disabled={disabled}
          onClick={handleConfirmAndClose}
        >
          Cancel {resourceName}
        </Button>
      </div>
    </StyledConfirmCancel>
  );
}

export default ConfirmCancel;
