import styled from "@emotion/styled";
import { useState } from "react";

const CheckboxWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  .checkbox-input {
    display: none;
  }
  .checkbox-input:checked + .checkbox-label {
    border: 0.45rem solid var(--base-font);
  }
  .checkbox-label {
    width: 1.6rem;
    height: 1.6rem;
    display: inline-block;
    border: 1px solid var(--base-font);
    border-radius: 0.2rem;
    transition: border 0.1s ease-in-out;
  }
  .checkbox-label-value {
    margin-left: 1rem;
    font-size: 1.6rem;
  }
`;

interface ICheckbox {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const Checkbox = ({ id, label, value, onChange }: ICheckbox) => {
  const [isChecked, setIsChecked] = useState(false);

  function toggleChecked() {
    onChange(isChecked ? "" : value);
    setIsChecked((isChecked) => !isChecked);
  }

  return (
    <div style={{ marginBottom: "1rem" }}>
      <CheckboxWrapper>
        <div className="checkbox">
          <input
            type="checkbox"
            className="checkbox-input"
            id={`checkbox-${id}`}
            checked={isChecked}
            readOnly
          />
          <label
            onClick={() => toggleChecked()}
            className="checkbox-label"
            htmlFor={`checkbox-${id}`}
          />
        </div>
        <p onClick={() => toggleChecked()} className="checkbox-label-value">
          {label}
        </p>
      </CheckboxWrapper>
    </div>
  );
};

export default Checkbox;
