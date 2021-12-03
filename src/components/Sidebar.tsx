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
    </SidebarWrapper>
  );
};

export default Sidebar;
