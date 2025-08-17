import Model from "../../ui/Model";
import Menus from "../../ui/Menus";
import Table from "../../ui/Table";
import { formatCurrency, getCurrentTimestamp } from "../../utils/helpers";
import ConfirmCancel from "../../ui/ConfirmCancel";
import { useCancelOrder } from "./useCancelOrder";
import { useNavigate } from "react-router-dom";
import ConfirmAction from "../../ui/ConfirmAction";
import { useUpdateOrder } from "./useUpdateOrder";
import AddTrackingInfoForm from "./AddTrackingInfoForm";
function OrderRow({ order }) {
  const {
    id: orderId,
    customerId,
    totalPrice,
    items,
    isPaid,
    paymentStatus,
    isCancelled,
    createdAt,
    isDelivered,
    status,
  } = order;

  const { cancelOrder, isCanceling } = useCancelOrder();

  const { updateOrder, isUpdating } = useUpdateOrder();

  const navigate = useNavigate();
  return (
    <Table.Row>
      <div>#{orderId}</div>
      <div>{customerId}</div>
      <div>{items.length}</div>
      <div>{formatCurrency(totalPrice)}</div>
      <div>{paymentStatus}</div>
      <div>{status}</div>
      <div>{createdAt}</div>
      <div>
        <Model>
          <Menus>
            <Menus.Menu>
              <Menus.Toggle id={orderId} />

              <Menus.List id={orderId}>
                <Menus.Button onClick={() => navigate(`${orderId}`)}>
                  View Details
                </Menus.Button>

                {!isPaid && (
                  <Model.Open opens="markPaid">
                    <Menus.Button>Mark as Paid</Menus.Button>
                  </Model.Open>
                )}
                {!isDelivered && (
                  <Model.Open opens="markDelivered">
                    <Menus.Button>Mark as Delivered</Menus.Button>
                  </Model.Open>
                )}
                {!isCancelled && !isPaid && !isDelivered && (
                  <Model.Open opens="cancel">
                    <Menus.Button>Cancel</Menus.Button>
                  </Model.Open>
                )}
                <Model.Open opens="tracking">
                  <Menus.Button>
                    {!order.trackingInfo
                      ? "Add Tracking Info"
                      : "Update Tracking Info"}
                  </Menus.Button>
                </Model.Open>
                <Model.Open opens="delete">
                  <Menus.Button>Delete</Menus.Button>
                </Model.Open>
              </Menus.List>

              <Model.Window name="cancel">
                <ConfirmCancel
                  resourceName="order"
                  disabled={isCanceling}
                  onConfirm={() =>
                    cancelOrder({
                      ...order,
                      isCancelled: true,
                      cancelledAt: getCurrentTimestamp(),
                      status: "Cancelled",
                    })
                  }
                />
              </Model.Window>
              <Model.Window name="markPaid">
                <ConfirmAction
                  actionName="Paid"
                  resourceName="order"
                  disabled={isUpdating}
                  onConfirm={() =>
                    updateOrder({
                      ...order,
                      isPaid: true,
                      paymentStatus: "Paid",
                      paidAt: getCurrentTimestamp(),
                    })
                  }
                />
              </Model.Window>
              <Model.Window name="markDelivered">
                <ConfirmAction
                  actionName="Delivered"
                  resourceName="order"
                  disabled={isUpdating}
                  onConfirm={() =>
                    updateOrder({
                      ...order,
                      isDelivered: true,
                      deliveredAt: getCurrentTimestamp(),
                      status: "Delivered",
                    })
                  }
                />
              </Model.Window>
              <Model.Window name="tracking">
                <AddTrackingInfoForm orderToupdate={order} />
              </Model.Window>
              <Model.Window name="delete"></Model.Window>
            </Menus.Menu>
          </Menus>
        </Model>
      </div>
    </Table.Row>
  );
}

export default OrderRow;
