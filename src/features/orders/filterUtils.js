export function applyOrderFilters(orders, filters, searchTerm) {
  const lowerSearch = searchTerm?.toLowerCase().trim();
  return orders.filter((order) => {
    const passesFilters = filters.every((filter) => {
      const orderValue = order[filter.field];

      // Skip empty filter values
      if (
        filter.value === "" ||
        filter.value === null ||
        filter.value === undefined ||
        (typeof filter.value === "object" &&
          Object.values(filter.value).every((v) => !v))
      )
        return true;

      switch (filter.operator) {
        case "is":
          return orderValue === filter.value;

        case "is-not":
          return orderValue !== filter.value;

        case "between":
          // Handle date-range or numeric range
          if (
            filter.value.start !== undefined &&
            filter.value.end !== undefined
          ) {
            // Date range (assume ISO strings or Date objects)
            const orderDate = new Date(orderValue).getTime();
            const startDate = new Date(filter.value.start).getTime();
            const endDate = new Date(filter.value.end).getTime();
            if (isNaN(orderDate) || isNaN(startDate) || isNaN(endDate))
              return true; // skip invalid dates
            return orderDate >= startDate && orderDate <= endDate;
          } else if (
            filter.value.min !== undefined &&
            filter.value.max !== undefined
          ) {
            // Numeric range
            const min = Number(filter.value.min);
            const max = Number(filter.value.max);
            const num = Number(orderValue);
            if (isNaN(num) || isNaN(min) || isNaN(max)) return true; // skip invalid numbers
            return num >= min && num <= max;
          }
          return true;

        default:
          return true;
      }
    });

    if (!passesFilters) return false;

    if (lowerSearch) {
      const searchableFields = [
        order.id,
        order.status,
        order.customerId,
        order.paymentStatus,
        order.shippingAddress?.city,
        order.shippingAddress?.street,
        order.shippingAddress?.phone,
        order.trackingInfo?.trackingNumber,
        ...order.items.map((item) => item.name),
      ];
      // Convert all to lowercase strings and check for match
      const matchFound = searchableFields.some((field) =>
        field?.toString().toLowerCase().includes(lowerSearch)
      );

      return matchFound;
    }
    return true;
  });
}
