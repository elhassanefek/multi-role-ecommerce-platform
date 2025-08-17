export const OrderFilters = [
  {
    field: "status",
    label: "Delivery Status",
    type: "select",
    options: [
      { value: "", label: "" },
      { value: "Pending", label: "Pending" },
      { value: "Delivered", label: "Delivered" },
      { value: "cancelled", label: "Cancelled" },
    ],
  },
  {
    field: "paymentStatus",
    label: "Payment Status",
    type: "select",
    options: [
      { value: "", label: "" },
      { value: "Paid", label: "Paid" },
      { value: "Pending", label: "Pending" },
      { value: "failed", label: "Failed" },
    ],
  },
  {
    field: "createdAt",
    label: "Order Date",
    type: "date-range",
  },
  {
    field: "totalPrice",
    label: "Total Amount",
    type: "range",
  },
];

export const StatusFilter = [
  {
    value: "is",
    label: "is",
  },
  { value: "is-not", label: "is not" },
];
