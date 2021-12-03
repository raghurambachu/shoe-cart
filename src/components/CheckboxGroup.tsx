import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { IOption } from "../interfaces";
import Checkbox from "./Checkbox";

const CheckboxGroupWrapper = styled.div``;
interface ICheckboxGroup {
  list: IOption[];
  selectedList: string[];
  onChange: (checkedList: string[]) => void;
}

const CheckboxGroup = ({ list, onChange, selectedList }: ICheckboxGroup) => {
  const [checkedList, setCheckedList] = useState<string[]>([]);

  useEffect(() => {
    setCheckedList(selectedList);
  }, [selectedList]);

  return (
    <CheckboxGroupWrapper>
      {list.map((listItem) => {
        const { label, value } = listItem;
        const listItemValue = value;
        return (
          <Checkbox
            key={value}
            label={label}
            value={value}
            id={value}
            onChange={(value: string) => {
              let modifiedCheckList: string[] = [];
              if (value && !checkedList.includes(value)) {
                modifiedCheckList = checkedList.concat([value]);
                setCheckedList(modifiedCheckList);
              }
              if (!value && checkedList.includes(listItemValue)) {
                modifiedCheckList = checkedList.filter(
                  (val) => val !== listItemValue
                );
                setCheckedList(modifiedCheckList);
              }
              onChange(modifiedCheckList);
            }}
          />
        );
      })}
    </CheckboxGroupWrapper>
  );
};

export default CheckboxGroup;
