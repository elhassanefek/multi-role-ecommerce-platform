import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import styled from "styled-components";
import Heading from "../../ui/Heading";

import { useRecentOrders } from "./useRecentOrders";

import { useRecentProducts } from "./useRecentProducts";
import Spinner from "../../ui/Spinner";

const ChartBox = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 3.2rem;
  grid-column: 3 / span 2;

  & > *:first-child {
    margin-bottom: 1.6rem;
  }

  & .recharts-pie-label-text {
    font-weight: 600;
  }
`;

// Generate startData from products dynamically
function generateStartData(products) {
  const colors = [
    "#ef4444",
    "#f97316",
    "#eab308",
    "#84cc16",
    "#22c55e",
    "#14b8a6",
    "#3b82f6",
    "#a855f7",
    "#f43f5e",
    "#8b5cf6",
    "#0ea5e9",
    "#f59e0b",
  ];

  return products.map((product, index) => ({
    name: product.name,
    value: 0,
    color: colors[index % colors.length], // loop colors if more products
  }));
}

function prepareTopProductsData(startData, orders, topN = 5) {
  function incArrayValue(arr, productName, qty) {
    return arr.map((obj) =>
      obj.name === productName
        ? { ...obj, value: obj.value + Number(qty) }
        : obj
    );
  }

  const data = orders.reduce((arr, order) => {
    order.items.forEach((item) => {
      arr = incArrayValue(arr, item.name, item.quantity);
    });
    return arr;
  }, startData);

  const filtered = data.filter((obj) => obj.value > 0);
  const sorted = filtered.sort((a, b) => b.value - a.value);
  const topProducts = sorted.slice(0, topN);
  const othersValue = sorted.slice(topN).reduce((sum, p) => sum + p.value, 0);
  if (othersValue > 0)
    topProducts.push({ name: "Others", value: othersValue, color: "#d1d5db" });

  return topProducts;
}

function ProductChart() {
  const { products, isLoading: isLoading1 } = useRecentProducts();
  const { orders, isLoading: isLoading2 } = useRecentOrders();
  if (isLoading1 || isLoading2) return <Spinner />;

  const startData = generateStartData(products);

  const data = prepareTopProductsData(startData, orders, 5);

  return (
    <ChartBox>
      <Heading as="h2">Top Products Summary</Heading>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={data}
            nameKey="name"
            dataKey="value"
            innerRadius={70}
            outerRadius={110}
            cx="40%"
            cy="50%"
            paddingAngle={3}
          >
            {data.map((entry) => (
              <Cell fill={entry.color} stroke={entry.color} key={entry.name} />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            verticalAlign="middle"
            align="right"
            width="40%"
            layout="vertical"
            iconSize={15}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartBox>
  );
}

export default ProductChart;
