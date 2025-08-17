export function applyCustomersFilters(customers, filters, searchTerm) {
  const lowerSearch = searchTerm?.toLowerCase().trim();
  return customers.filter((customer) => {
    const passesFilter = filters.every((filter) => {
      const customerValue = customer[filter.field];
      //skip empty filters
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
          return customerValue === filter.value;
        case "is-not":
          return customerValue !== filter.value;
        case "between":
          //handle the date range or price range
          if (
            filter.value.start !== undefined &&
            filter.value.end !== undefined
          ) {
            const customerDate = new Date(customerDate).getTime();
            const startDate = new Date(filter.value.start).getTime();
            const endDate = new Date(filter.value.end).getTime();
            if (isNaN(customerDate) || isNaN(startDate) || isNaN(endDate))
              return true;
            return customerDate >= startDate && customerDate <= endDate;
          } else if (
            filter.value.min !== undefined &&
            filter.value.max !== undefined
          ) {
            const min = Number(filter.value.min);
            const max = Number(filter.value.max);
            const num = Number(customerValue);
            if (isNaN(num) || isNaN(min) || isNaN(max)) return true; // skip invalid numbers
            return num >= min && num <= max;
          }
          return true;
        default:
          return true;
      }
    });

    if (!passesFilter) return false;

    //apply search term
    if (lowerSearch) {
      const searchFields = [
        customer.id,
        customer.name,
        customer.email,
        customer.phone,
      ];
      const matchFound = searchFields.some((field) =>
        field?.toString().toLowerCase().includes(lowerSearch)
      );

      return matchFound;
    }

    return true;
  });
}
