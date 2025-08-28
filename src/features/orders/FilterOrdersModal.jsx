import Model from "../../ui/Model";
import { FaFilter } from "react-icons/fa";
import DynamicFilterForm from "./DynamicFilterForm";

import Button from "../../ui/Button";
import { forwardRef } from "react";

import styled from "styled-components";

import { useOrdersFilter } from "../../contexts/OrdersFilterContext";

const FilterButtonContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const FilterBadge = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: var(--color-brand-600);
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 600;
  min-width: 20px;
`;

// Create a forwarded ref button to capture the button element
const FilterButton = forwardRef((props, ref) => {
  const { getActiveFilterCount, hasActiveFilters } = useOrdersFilter();
  const activeCount = getActiveFilterCount();

  return (
    <FilterButtonContainer>
      <Button
        ref={ref}
        {...props}
        $variant={hasActiveFilters() ? "primary" : "secondary"}
        className="flex items-center gap-1"
      >
        <FaFilter /> Filter
      </Button>
      {activeCount > 0 && <FilterBadge>{activeCount}</FilterBadge>}
    </FilterButtonContainer>
  );
});

FilterButton.displayName = "FilterButton";
function FilterOrdersModal() {
  return (
    <Model>
      <Model.Open opens="filter-modal">
        <FilterButton />
      </Model.Open>

      <Model.Window name="filter-modal" variant="filter">
        <DynamicFilterForm />
      </Model.Window>
    </Model>
  );
}

export default FilterOrdersModal;
