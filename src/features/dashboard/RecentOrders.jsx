import styled from "styled-components";
import { useRecentOrders } from "./useRecentOrders";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Spinner from "../../ui/Spinner";
import RecentItem from "./RecentItem";

const StyledRecent = styled.div`
  /* Box */
  background-color: var(--volor-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  width: 40rem;
  padding: 3.2rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  grid-column: 1 / span 2;
  padding-top: 2.4rem;
`;
const RecentList = styled.ul`
  overflow: scroll;
  overflow-x: hidden;
  /* Removing scrollbars for webkit, firefox, and ms, respectively */
  &::-webkit-scrollbar {
    width: 0 !important;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const NoActivity = styled.p`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 500;
  margin-top: 0.8rem;
`;

function RecentOrders() {
  const { orders, isLoading } = useRecentOrders();
  return (
    <StyledRecent>
      <Row type="horizontal">
        <Heading as="h2">Recent Orders</Heading>
      </Row>

      {!isLoading ? (
        orders?.length > 0 ? (
          <RecentList>
            {orders.map((order) => (
              <RecentItem order={order} key={order.id} />
            ))}
          </RecentList>
        ) : (
          <NoActivity>No Recent Orders</NoActivity>
        )
      ) : (
        <Spinner />
      )}
    </StyledRecent>
  );
}

export default RecentOrders;
