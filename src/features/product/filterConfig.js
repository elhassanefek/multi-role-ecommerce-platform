export const ProductFilters = [
  {
    field: "featured",
    label: "Featured Status",
    type: "select",
    options: [
      { value: "", label: "All" },
      { value: true, label: "Featured" },
      { value: false, label: "Not Featured" },
    ],
  },
  {
    field: "archived",
    label: "Archive Status",
    type: "select",
    options: [
      { value: "", label: "All" },
      { value: false, label: "Active" },
      { value: true, label: "Archived" },
    ],
  },
  {
    field: "category",
    label: "Category",
    type: "select",
    options: [],
  },
  {
    field: "price",
    label: "Price Range",
    type: "range",
  },
  {
    field: "quantity",
    label: "Stock Quantity",
    type: "range",
  },
  {
    field: "addedAt",
    label: "Date Added",
    type: "date-range",
  },
];

export const StatusFilter = [
  { value: "is", label: "is" },
  { value: "is-not", label: "is not" },
];
