import { useNavigate } from "react-router-dom";
import Menus from "../../ui/Menus";
import Model from "../../ui/Model";
import Table from "../../ui/Table";
import {
  convertIsoToDateAndTimeInputs,
  formatCurrency,
} from "../../utils/helpers";

function CustomerOrderRow({ order }) {
  const {
    id: orderId,
    createdAt,
    items,
    totalPrice,
    paymentMethod,
    shippingAddress,
    status,
    isCancelled,
    isDelivered,
    trackingInfo,
  } = order;
  const { date, time } = convertIsoToDateAndTimeInputs(createdAt);
  const navigate = useNavigate();
  return (
    <Table.Row>
      <div>#{orderId}</div>
      <div>{items.length}</div>
      <div>{formatCurrency(totalPrice)}</div>
      <div>{paymentMethod}</div>
      <div>{status}</div>
      <div>{`${date} At ${time}`}</div>
      <div>
        <Model>
          <Menus>
            <Menus.Menu>
              <Menus.Toggle id={orderId} />
              <Menus.List id={orderId}>
                <Menus.Button onClick={() => navigate(`${orderId}`)}>
                  view Details
                </Menus.Button>
              </Menus.List>
            </Menus.Menu>
          </Menus>
        </Model>
      </div>
    </Table.Row>
  );
}

export default CustomerOrderRow;
