import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import { appConfig } from "../appConfig";

const {
  uiConfigs: { sidebarPadding },
} = appConfig;

const AccordionSection = styled.div`
  display: flex;
  flex-direction: column;
  .accordion {
    cursor: pointer;
    padding: 1.8rem ${sidebarPadding};
    display: flex;
    align-items: center;
    border: none;
    outline: none;
    background-color: white;
    transition: background-color 0.6s ease;
    font-family: "Poppins", sans-serif;
    color: var(--base-font);
    font-size: 1.4rem;
  }
  .accordion-icon {
    margin-left: auto;
    transition: transform 0.6s ease;
  }
  .rotate {
    transform: rotate(180deg);
  }
  .accordion-content {
    overflow: auto;
    transition: max-height 0.6s ease;
  }
`;

interface IAccordion {
  isOpen?: true;
  renderHeader: (
    setActive: string,
    setRotate: string,
    toggleAccordion: (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => void
  ) => React.ReactNode;
  renderContent: () => React.ReactNode;
}

const Accordion = ({
  renderHeader,
  renderContent,
  isOpen = true,
}: IAccordion) => {
  const [setActive, setActiveState] = useState("");
  const [setHeight, setHeightState] = useState("0px");
  const [setRotate, setRotateState] = useState("accordion-icon");

  const content = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setHeightState(`${content?.current?.scrollHeight}px`);
    }
  }, []);

  function toggleAccordion() {
    setActiveState(setActive === "" ? "active" : "");
    const modifiedHeightState = isOpen
      ? setActive === "active"
        ? `${content?.current?.scrollHeight}px`
        : "0px"
      : setActive === "active"
      ? "0px"
      : `${content?.current?.scrollHeight}px`;
    setHeightState(
      modifiedHeightState
      //   setActive === "active" ? "0px" : `${content?.current?.scrollHeight}px`
    );
    setRotateState(
      setActive === "active" ? "accordion-icon" : "accordion-icon rotate"
    );
  }

  return (
    <AccordionSection>
      {renderHeader(setActive, setRotate, toggleAccordion)}
      <div
        ref={content}
        style={{ maxHeight: `${setHeight}` }}
        className="accordion-content"
      >
        {renderContent()}
      </div>
    </AccordionSection>
  );
};

export default Accordion;
