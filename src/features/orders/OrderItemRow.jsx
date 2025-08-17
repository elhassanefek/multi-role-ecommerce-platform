import Model from "../../ui/Model";
import Menus from "../../ui/Menus";
import Table from "../../ui/Table";
import { formatCurrency } from "../../utils/helpers";

import { useNavigate } from "react-router-dom";

function OrderItemRow({ item }) {
  const { id: itemId, name, price, quantity } = item;

  const navigate = useNavigate();
  return (
    <Table.Row>
      <div>{name}</div>
      <div>{quantity}</div>
      <div>{formatCurrency(price)}</div>
      <div>{formatCurrency(price * quantity)}</div>

      <div>
        <Model>
          <Menus>
            <Menus.Menu>
              <Menus.Toggle id={itemId} />

              <Menus.List id={itemId}>
                <Menus.Button
                  onClick={() => navigate(`.././products/${itemId}`)}
                >
                  View Product
                </Menus.Button>
              </Menus.List>
            </Menus.Menu>
          </Menus>
        </Model>
      </div>
    </Table.Row>
  );
}

export default OrderItemRow;
