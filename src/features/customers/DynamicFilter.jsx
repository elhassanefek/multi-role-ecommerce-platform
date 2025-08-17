import Select from "../../ui/Select";
import Button from "../../ui/Button";
import { CustomerFilters, StatusFilter } from "./filterConfig";
import { useCustomerFilter } from "../../contexts/CustomerFilterContext";
import styled from "styled-components";

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  max-height: 60vh;
  overflow-y: auto;
  padding-right: 0.5rem;
`;

const FilterHeader = styled.div`
  font-weight: 600;
  font-size: 1.4rem;
  color: var(--color-grey-700);
  margin-bottom: 0.8rem;
`;

const FilterRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  padding: 1.2rem;
  background-color: var(--color-grey-50);
  border-radius: var(--border-radius-md);
  border: 1px solid var(--color-grey-200);
`;

const FilterLabel = styled.label`
  font-weight: 500;
  font-size: 1.3rem;
  color: var(--color-grey-700);
  margin-bottom: 0.4rem;
`;

const ControlsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  flex-wrap: wrap;
`;

const RangeInputs = styled.div`
  display: flex;
  gap: 0.8rem;
  align-items: center;
  flex-wrap: wrap;
`;

const Input = styled.input`
  padding: 0.6rem;
  border: 1px solid var(--color-grey-300);
  border-radius: var(--border-radius-sm);
  font-size: 1.2rem;

  &:focus {
    outline: none;
    border-color: var(--color-brand-600);
    box-shadow: 0 0 0 2px var(--color-brand-100);
  }
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--color-grey-200);
`;

const ClearButton = styled(Button)`
  background-color: var(--color-grey-100);
  color: var(--color-grey-700);

  &:hover {
    background-color: var(--color-grey-200);
  }
`;

function DynamicFilter({ onCloseModel }) {
  const { filters, setFilters, clearFilters } = useCustomerFilter();

  const handleOperatorChange = (field) => (e) => {
    const op = e.target.value;
    setFilters((prev) => {
      const existing = prev.find((f) => f.field === field);
      if (existing) {
        return prev.map((f) =>
          f.field === field ? { ...f, operator: op } : f
        );
      }
      return [...prev, { field, operator: op, value: "" }];
    });
  };

  // Handle normal select inputs (string/boolean values)
  const handleValueChange = (field) => (e) => {
    const val = e.target.value;
    // Convert string booleans to actual booleans
    const convertedVal = val === "true" ? true : val === "false" ? false : val;

    setFilters((prev) => {
      const existing = prev.find((f) => f.field === field);
      if (existing) {
        return prev.map((f) =>
          f.field === field ? { ...f, value: convertedVal } : f
        );
      }
      return [...prev, { field, operator: "is", value: convertedVal }];
    });
  };

  // Handle range input changes: min or max
  const handleRangeChange = (field, bound) => (e) => {
    const val = e.target.value;
    setFilters((prev) => {
      const existing = prev.find((f) => f.field === field);
      if (existing) {
        const newValue = { ...(existing.value || {}) };
        newValue[bound] = val;
        return prev.map((f) =>
          f.field === field ? { ...f, value: newValue } : f
        );
      }
      // If no existing filter, create one with operator "between"
      const newValue = { [bound]: val };
      return [...prev, { field, operator: "between", value: newValue }];
    });
  };

  const handleApply = () => {
    onCloseModel?.();
  };

  const handleClear = () => {
    clearFilters();
  };

  return (
    <FilterContainer>
      <FilterHeader>Filter Customers</FilterHeader>

      {CustomerFilters.map(({ field, label, type, options }) => {
        const existing = filters.find((f) => f.field === field) || {
          operator: "is",
          value: type === "date-range" || type === "range" ? {} : "",
        };

        return (
          <FilterRow key={field}>
            <FilterLabel htmlFor={`${field}-operator`}>{label}</FilterLabel>

            <ControlsRow>
              {/* Operator selector only for non-range */}
              {type !== "date-range" && type !== "range" && (
                <Select
                  id={`${field}-operator`}
                  options={StatusFilter}
                  value={existing.operator}
                  onChange={handleOperatorChange(field)}
                  style={{ minWidth: "100px" }}
                />
              )}

              {/* Value inputs */}
              {type === "select" && (
                <Select
                  id={`${field}-value`}
                  options={options}
                  value={existing.value}
                  onChange={handleValueChange(field)}
                  style={{ minWidth: "150px" }}
                />
              )}

              {type === "date-range" && (
                <RangeInputs>
                  <Input
                    type="date"
                    value={existing.value.start || ""}
                    onChange={handleRangeChange(field, "start")}
                    placeholder="Start date"
                  />
                  <span>to</span>
                  <Input
                    type="date"
                    value={existing.value.end || ""}
                    onChange={handleRangeChange(field, "end")}
                    placeholder="End date"
                  />
                </RangeInputs>
              )}

              {type === "range" && (
                <RangeInputs>
                  <Input
                    type="number"
                    placeholder={
                      field === "price" ? "Min Price" : "Min Quantity"
                    }
                    value={existing.value.min || ""}
                    onChange={handleRangeChange(field, "min")}
                  />
                  <span>to</span>
                  <Input
                    type="number"
                    placeholder={
                      field === "price" ? "Max Price" : "Max Quantity"
                    }
                    value={existing.value.max || ""}
                    onChange={handleRangeChange(field, "max")}
                  />
                </RangeInputs>
              )}
            </ControlsRow>
          </FilterRow>
        );
      })}

      <ButtonRow>
        <ClearButton onClick={handleClear}>Clear All</ClearButton>
        <Button onClick={handleApply}>Apply Filters</Button>
      </ButtonRow>
    </FilterContainer>
  );
}

export default DynamicFilter;
