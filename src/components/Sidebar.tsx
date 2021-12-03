import styled from "@emotion/styled";
import { FaChevronUp } from "react-icons/fa";
import { appConfig } from "../appConfig";
import Accordion from "./Accordion";
const {
  uiConfigs: { sidebarPadding },
} = appConfig;

const AccordionContent = styled.div`
  font-size: 1.4rem;
  padding: 2.5rem ${sidebarPadding};
`;

const CategoriesWrapper = styled.div`
  .accordion-header {
    border-bottom: 1px solid var(--section-border);
  }
  .accordion-title {
    font-weight: 500;
  }
`;

const Sidebar = () => {
  return (
    <CategoriesWrapper>
      <Accordion
        renderHeader={(setActive, setRotate, toggleAccordion) => {
          return (
            <button
              className={`accordion accordion-header ${setActive}`}
              onClick={(e) => toggleAccordion(e)}
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
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatem suscipit sit aliquid ea quod molestias tempora
              distinctio aperiam cum explicabo a dolore minima quisquam
              molestiae tenetur, facere asperiores vero itaque, saepe quasi sint
              placeat ipsam omnis doloribus. Quaerat, quis cum dolor quia sunt
              iusto, iste nihil dolorum inventore perferendis animi?
            </AccordionContent>
          );
        }}
      />
    </CategoriesWrapper>
  );
};

export default Sidebar;
