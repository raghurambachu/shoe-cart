import styled from "@emotion/styled";
import { useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import useOnClickOutside from "../hooks/useOnClickOutside";
import { IDropdownListItem } from "../interfaces";

interface ISortDropdownWrapper {
  width: number;
}

const SortDropdownWrapper = styled.div`
  position: relative;
  width: ${({ width }: ISortDropdownWrapper) => `${width}rem`};
  cursor: pointer;
  font-size: 1.3rem;
`;

const TextVisible = styled.div`
  display: flex;
  border-radius: 0.4rem;
  padding: 0.6rem 0.8rem;
  background: transparent;
  justify-content: space-between;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
`;

const DefaultText = styled.div`
  color: var(--base-font);
`;

const SelectedTextWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 6.1rem;
`;

const SelectedText = styled.div`
  margin-right: 0.6rem;
  color: var(--base-font);
`;

interface IDropdownList {
  isOpen: boolean;
  dropdownWidth: number;
}

const DropdownList = styled.ul`
  position: absolute;
  top: 110%;
  right: 0%;
  opacity: ${({ isOpen }: IDropdownList) => (isOpen ? 1 : 0)};
  display: ${({ isOpen }: IDropdownList) => (isOpen ? "initial" : "none")};
  width: ${({ dropdownWidth }: IDropdownList) => `${dropdownWidth}rem`};
  background: white;
  box-shadow: 0px 3px 12px rgba(0, 0, 0, 0.09);
  border-radius: 0.4rem;
  z-index: 10;
  font-size: 1.3rem;
`;

interface IDropdownListItems {
  hoverBackground: string;
}

const DropdownListItem = styled.li`
  padding: 0.8rem 1rem;
  &:hover {
    background: ${({ hoverBackground }: IDropdownListItems) => hoverBackground};
  }
`;

interface ISortDropdown {
  itemsToDisplay: IDropdownListItem[];
  onChange: Function;
  defaultText: string;
  width?: number; // It will be considered as rem
  dropdownWidth?: number; //rem
  selectedItem: string;
}

// Used for View as and Sort
const SortDropdown = ({
  itemsToDisplay,
  onChange,
  defaultText,
  width = 12.2,
  dropdownWidth = 7.1,
  selectedItem,
}: ISortDropdown) => {
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  useOnClickOutside(dropdownRef, () => setIsOpen(false));

  return (
    <SortDropdownWrapper
      ref={dropdownRef}
      onClick={() => setIsOpen((curr) => !curr)}
      width={width}
    >
      <TextVisible>
        <DefaultText>{defaultText}</DefaultText>
        <SelectedTextWrapper>
          <SelectedText>
            {itemsToDisplay.find((item) => item.value === selectedItem)?.label}
          </SelectedText>

          <FaChevronDown style={{ fontSize: "1.4rem" }} />
        </SelectedTextWrapper>
        <DropdownList dropdownWidth={dropdownWidth} isOpen={isOpen}>
          {itemsToDisplay.map((item) => {
            return (
              <DropdownListItem
                hoverBackground={"#F8FAFF"}
                onClick={() => {
                  onChange(item.value);
                }}
                key={item.label}
              >
                {item.label}
              </DropdownListItem>
            );
          })}
        </DropdownList>
      </TextVisible>
    </SortDropdownWrapper>
  );
};

export default SortDropdown;
