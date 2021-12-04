import styled from "@emotion/styled";
import { useContext } from "react";
import { FaChevronUp } from "react-icons/fa";
import { appConfig } from "../appConfig";
import { AppContext } from "../context/AppContext";
import { merchandiseData } from "../data";
import Accordion from "./Accordion";
import CheckboxGroup from "./CheckboxGroup";
import HistogramChart from "./HistogramChart";
import MultiRangeSlider from "./MultiRangeSlider";
import SizeFilter from "./SizeFilter";

const {
  uiConfigs: { sidebarPadding },
  list: { categories },
  availableSizes,
} = appConfig;

const AccordionContent = styled.div`
  font-size: 1.4rem;
  padding: 2.5rem ${sidebarPadding} 1rem;
  border-bottom: 1px solid var(--section-border);
`;

const SidebarWrapper = styled.div`
  height: 100%;
  overflow-y: auto;
  .histogram-container {
    margin-top: 1rem;
    display: flex;
    justify-content: center;
  }
`;

const Categories = styled.div`
  .accordion-title {
    font-weight: 500;
  }
  .accordion:hover {
    background-color: var(--hover-grey);
  }
`;

const PriceRangeWrapper = styled.div`
  padding: 2rem ${sidebarPadding};
  .price-range-title {
    color: var(--base-font);
    font-weight: 500;
    font-size: 1.4rem;
  }
  border-bottom: 1px solid var(--section-border);
`;

const Sidebar = () => {
  const { appState, appDispatch } = useContext(AppContext);
  const {
    range: { initial: initialRange, selected: selectedRange },
  } = appState;

  return (
    <SidebarWrapper>
      <Categories>
        <Accordion
          renderHeader={(setActive, setRotate, toggleAccordion) => {
            return (
              <button
                className={`accordion ${setActive}`}
                onClick={(e) => toggleAccordion(e)}
                style={{
                  borderBottom: "1px solid var(--section-border)",
                }}
              >
                <p className="accordion-title">Categories</p>
                <FaChevronUp
                  className={`${setRotate}`}
                  width={14}
                  fill={"#777"}
                />
              </button>
            );
          }}
          renderContent={() => {
            return (
              <AccordionContent>
                <CheckboxGroup
                  list={categories}
                  selectedList={appState.selectedCategories}
                  onChange={(checkedList) => {
                    appDispatch({
                      type: "SET_CATEGORIES",
                      payload: {
                        selectedCategories: checkedList,
                      },
                    });
                  }}
                />
              </AccordionContent>
            );
          }}
        />
      </Categories>
      <PriceRangeWrapper>
        <h4 className="price-range-title">Price Range</h4>
        <div className="histogram-container">
          <HistogramChart
            appState={appState}
            merchandiseData={merchandiseData}
          />
        </div>
        <MultiRangeSlider
          min={initialRange[0]}
          max={initialRange[1]}
          step={1} //Todo: to be taken from config
          minimumValue={selectedRange[0]}
          maximumValue={selectedRange[1]}
          onChange={({ min, max, minValue, maxValue }) => {
            appDispatch({
              type: "SET_SELECTED_RANGE",
              payload: {
                selectedRange: [minValue, maxValue],
              },
            });
          }}
        />
      </PriceRangeWrapper>
      <SizeFilter
        appState={appState}
        availableSizes={availableSizes}
        onChange={(selectedSizes: number[]) => {
          appDispatch({
            type: "SET_SIZE",
            payload: {
              selectedSizes,
            },
          });
        }}
      />
    </SidebarWrapper>
  );
};

export default Sidebar;
