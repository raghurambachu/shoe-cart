import styled from "@emotion/styled";
import { useContext } from "react";
import { FaChevronUp } from "react-icons/fa";
import { appConfig } from "../appConfig";
import { AppContext } from "../context/AppContext";
import Accordion from "./Accordion";
import CheckboxGroup from "./CheckboxGroup";

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

const SidebarWrapper = styled.div``;

const Categories = styled.div`
  .accordion-title {
    font-weight: 500;
  }
`;

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
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: scale(1.07);
  }
`;

const Sidebar = () => {
  const { appState, appDispatch } = useContext(AppContext);
  console.log(appState);

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
      <SizeFilterWrapper>
        <h3 className="size-filter-title">Size</h3>
        <AvailableSizes>
          {availableSizes.map((size) => {
            return <Cell key={size}>{size}</Cell>;
          })}
        </AvailableSizes>
      </SizeFilterWrapper>
    </SidebarWrapper>
  );
};

export default Sidebar;
