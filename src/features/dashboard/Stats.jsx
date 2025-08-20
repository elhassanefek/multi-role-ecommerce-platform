import Stat from "./Stat";
import { Package, Banknote, UsersRound, Tag } from "lucide-react";

function Stats({ orders, products, customers, numDays }) {
  const numOrders = orders.length;
  const numCustomers = customers.length;
  const numProducts = products.length;
  const sales = orders.reduce((acc, cur) => acc + cur.totalPrice, 0);

  return (
    <>
      <Stat title="Orders" color="blue" icon={<Package />} value={numOrders} />
      <Stat
        title="Customers"
        color="yellow"
        icon={<UsersRound />}
        value={numCustomers}
      />
      <Stat title="Sales" color="green" icon={<Banknote />} value={sales} />
      <Stat title="Products" color="red" icon={<Tag />} value={numProducts} />
    </>
  );
}

export default Stats;
