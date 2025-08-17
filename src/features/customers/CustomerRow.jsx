import Model from "../../ui/Model";
import Menus from "../../ui/Menus";
import Table from "../../ui/Table";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteCustomer } from "./useDeleteCustomer";
function CustomerRow({ customer }) {
  const { deleteCustomer, isDeleting } = useDeleteCustomer();
  const {
    id: customerId,
    fullName,
    email,
    phone,
    totalOrders,
    address,
  } = customer;

  return (
    <Table.Row>
      <div>{fullName}</div>
      <div>{email}</div>
      <div>{phone}</div>
      <div>{totalOrders}</div>
      <div>{address.country}</div>
      <div>{address.city}</div>
      <div>
        <Model>
          <Menus>
            <Menus.Menu>
              <Menus.Toggle id={customerId} />

              <Menus.List id={customerId}>
                <Model.Open opens="view">
                  <Menus.Button>View Details</Menus.Button>
                </Model.Open>
                <Model.Open opens="delete">
                  <Menus.Button>Delete</Menus.Button>
                </Model.Open>
                <Model.Open opens="Block">
                  <Menus.Button>Block</Menus.Button>
                </Model.Open>
              </Menus.List>
              <Model.Window name="view"></Model.Window>
              <Model.Window name="delete">
                <ConfirmDelete
                  resourceName="customer"
                  disabled={isDeleting}
                  onConfirm={() => deleteCustomer(customerId)}
                />
              </Model.Window>
              <Model.Window name="block"></Model.Window>
            </Menus.Menu>
          </Menus>
        </Model>
      </div>
    </Table.Row>
  );
}

export default CustomerRow;
