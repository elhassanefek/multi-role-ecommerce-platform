import styled from "styled-components";
import Tag from "../../ui/Tag";
import { formatCurrency } from "../../utils/helpers";

const StyledRecentItem = styled.li`
  display: grid;
  grid-template-columns: 12rem 8rem 2rem;
  gap: 2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

function RecentItem({ order }) {
  const { id, status, totalPrice } = order;
  return (
    <StyledRecentItem>
      <div>{id}</div>
      {status === "Delivered" && <Tag type="green">Delivered</Tag>}
      {status === "Cancelled" && <Tag type="red">Cancelled</Tag>}
      {status === "Shipped" && <Tag type="yellow">Shipped</Tag>}
      {status === "Pending" && <Tag type="blue">Pending</Tag>}

      <div>{formatCurrency(totalPrice)}</div>
    </StyledRecentItem>
  );
}

export default RecentItem;
