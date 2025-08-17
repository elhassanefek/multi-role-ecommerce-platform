export const CustomerFilters = [
  {
    field: "status",
    label: "Status",
    type: "select",
    options: [
      { value: "", label: "All" },
      { value: "active", label: "Active" },
      { value: "inactive", label: "InActive" },
    ],
  },
  {
    field: "city",
    label: "City",
    type: "select",
    options: [],
  },
  {
    field: "country",
    label: "Country",
    type: "select",
    options: [],
  },
  {
    field: "totalOrders",
    label: "Total Orders",
    type: "range",
  },
  {
    field: "totalSpent",
    label: "Total Spent",
    type: "range",
  },
  {
    field: "createdAt",
    label: "Date Added",
    type: "date-range",
  },
];

export const StatusFilter = [
  { value: "is", label: "is" },
  { value: "is-not", label: "is not" },
];
