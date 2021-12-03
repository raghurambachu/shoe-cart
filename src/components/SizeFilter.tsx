import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { appConfig } from "../appConfig";
import { IAppState } from "../context/AppContext";

const {
  uiConfigs: { sidebarPadding },
} = appConfig;

const SizeFilterWrapper = styled.div`
  padding: 2.5rem ${sidebarPadding};
  .size-filter-title {
    font-size: 1.4rem;
    font-weight: 500;
    margin-bottom: 2.5rem;
  }
`;

const AvailableSizes = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 1rem;
`;

const Cell = styled.div`
  width: 3.8rem;
  height: 3.8rem;
  display: flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  font-size: 1.4rem;
  background: var(--hover-grey);
  border-radius: 0.4rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  border: 1px solid var(--section-border);
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: scale(1.07);
  }
  &.active {
    transform: scale(1.11);
    background: white;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
    font-weight: 500;
  }
`;

interface ISizeFilter {
  availableSizes: number[];
  appState: IAppState;
  onChange: (selectedSizes: number[]) => void;
}

const SizeFilter = ({ availableSizes, appState, onChange }: ISizeFilter) => {
  const [selectedSizes, setSelectedSizes] = useState<number[]>([]);

  useEffect(() => {
    setSelectedSizes(appState.selectedSizes);
  }, []);
  return (
    <SizeFilterWrapper>
      <h3 className="size-filter-title">Size</h3>
      <AvailableSizes>
        {availableSizes.map((size) => {
          return (
            <Cell
              className={selectedSizes.includes(size) ? "active" : ""}
              onClick={() => {
                let modifiedSelectedSizes: number[] = [];
                if (selectedSizes.includes(size)) {
                  modifiedSelectedSizes = selectedSizes
                    .slice()
                    .filter((filteredSize) => filteredSize !== size);
                  setSelectedSizes(modifiedSelectedSizes);
                }
                if (!selectedSizes.includes(size)) {
                  modifiedSelectedSizes = selectedSizes.slice().concat([size]);
                  setSelectedSizes(modifiedSelectedSizes);
                }
                onChange(modifiedSelectedSizes);
              }}
              key={size}
            >
              {size}
            </Cell>
          );
        })}
      </AvailableSizes>
    </SizeFilterWrapper>
  );
};

export default SizeFilter;
