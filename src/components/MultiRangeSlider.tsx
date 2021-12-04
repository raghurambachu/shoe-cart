import styled from "@emotion/styled";
import { useState } from "react";

const MultiRangeSliderWrapper = styled.div`
  & * {
    box-sizing: border-box;
    padding: 0px;
    margin: 0px;
  }
  display: flex;
  position: relative;
  padding: 0px 10px 40px;
  flex-direction: column;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none;
  user-select: none;

  .bar {
    display: flex;
  }
  .bar * {
    transition: all 100ms;
  }
  .bar.active * {
    transition: none;
  }
  .bar-left {
    width: 25%;
    background-color: var(--slider-track); //slider track
    border-radius: 10px 0px 0px 10px;
    box-shadow: inset 0px 0px 5px var(--slider-track);
    padding: 2px 0px;
  }
  .bar-right {
    width: 25%;
    background-color: var(--slider-track); //slider track
    border-radius: 0px 10px 10px 0px;
    box-shadow: inset 0px 0px 5px var(--slider-track);
  }
  .bar-inner {
    background-color: var(--slider-inner);
    display: flex;
    flex-grow: 1;
    flex-shrink: 1;
    justify-content: space-between;
    position: relative;
    border: solid 1px black;
    justify-content: space-between;
    box-shadow: inset 0px 0px 5px black;
  }
  .bar-inner-left {
    width: 50%;
  }
  .bar-inner-right {
    width: 50%;
  }
  .thumb {
    position: relative;
    z-index: 1;
    cursor: pointer;
  }
  .thumb::before {
    content: "";
    background-color: var(--slider-inner);
    position: absolute;
    width: 20px;
    height: 20px;
    border: solid 1px var(--slider-inner);
    box-shadow: 0px 0px 6px 3px white;
    border-radius: 50%;
    z-index: 1;
    margin: -8px;
    cursor: pointer;
  }
  .input-type-range:focus + .thumb::after {
    content: "";
    position: absolute;
    top: -4px;
    left: -4px;
    width: 11px;
    height: 11px;
    z-index: 2;
    border-radius: 50%;
    border: dotted 1px black;
    box-shadow: 0px 0px 5px white, inset 0px 0px 10px black;
  }
  .thumb * {
    position: absolute;
    width: 30px;
    height: 30px;
    left: -15px;
    margin-top: 15px;
    font-size: 1.05rem;
    text-align: center;
    line-height: 30px;
    font-weight: bold;
    border-radius: 50%;
    color: var(--base-font);
    display: block;
  }
  .thumb:active * {
    display: block;
  }

  .input-type-range {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    opacity: 0;
    pointer-events: none;
  }
  .label {
    display: flex;
    justify-content: space-between;
    padding: 0px;
    margin-top: 10px;
    margin-bottom: -20px;
    /* display: none; */
  }
  .label-min,
  .label-max {
    font-size: 80%;
  }
`;

interface ITriggerOutput {
  min: number;
  max: number;
  minValue: number;
  maxValue: number;
}

interface IMultiRangeSlider {
  min: number;
  max: number;
  step: number;
  minimumValue: number;
  maximumValue: number;
  onChange?: (params: ITriggerOutput) => void;
}

const MultiRangeSlider = ({
  min,
  max,
  step = 1,
  minimumValue,
  maximumValue,
  onChange,
}: IMultiRangeSlider) => {
  let barBox: any = null;
  let startX: any = null;
  let barValue = 0;
  let bar: any = null;

  const [minValue, set_minValue] = useState(minimumValue);
  const [maxValue, set_maxValue] = useState(maximumValue);
  const [barMin, set_barMin] = useState(((minValue - min) / (max - min)) * 100);
  const [barMax, set_barMax] = useState(((max - maxValue) / (max - min)) * 100);

  const triggerChange = (minValue: number, maxValue: number) => {
    let params = { min, max, minValue, maxValue };
    onChange && onChange(params);
  };

  const onBarLeftClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    let _minValue = minValue - step;
    if (_minValue < min) {
      _minValue = min;
    }
    set_minValue(_minValue);
    let _barMin = ((_minValue - min) / (max - min)) * 100;
    set_barMin(_barMin);
    triggerChange(_minValue, maxValue);
  };

  const onInputMinChange = (e: any) => {
    let _minValue = parseFloat(e.target.value);
    if (_minValue > maxValue - step) {
      _minValue = maxValue - step;
    }
    set_minValue(_minValue);
    let _barMin = ((_minValue - min) / (max - min)) * 100;
    set_barMin(_barMin);
    triggerChange(_minValue, maxValue);
  };

  const onLeftThumbMousemove = (e: any) => {
    let clientX = e.clientX;
    if (e.type === "touchmove") {
      clientX = e.touches[0].clientX;
    }
    let dx = clientX - startX;
    let per = dx / barBox.width;
    let val = barValue + (max - min) * per;
    let strSetp = "" + step.toString();
    let fixed = 0;
    strSetp.indexOf(".") >= 0 && (fixed = 2);
    val = parseFloat(val.toFixed(fixed));
    if (val < min) {
      val = min;
    } else if (val > maxValue - step) {
      val = maxValue - step;
    }
    set_minValue(val);
    let _barMin = ((val - min) / (max - min)) * 100;
    set_barMin(_barMin);
    triggerChange(val, maxValue);
  };

  const onLeftThumbMouseup = (e: any) => {
    document.removeEventListener("mousemove", onLeftThumbMousemove);
    document.removeEventListener("mouseup", onLeftThumbMouseup);
    document.removeEventListener("touchmove", onLeftThumbMousemove);
    document.removeEventListener("touchend", onLeftThumbMouseup);
    bar.classList.remove("active");
  };

  const onLeftThumbMousedown = (e: any) => {
    startX = e.clientX;
    if (e.type === "touchstart") {
      if (e.touches.length === 1) {
        startX = e.touches[0].clientX;
      } else {
        return;
      }
    }
    barValue = minValue;
    bar = e.target.parentNode;
    barBox = bar.getBoundingClientRect();
    document.addEventListener("mousemove", onLeftThumbMousemove);
    document.addEventListener("mouseup", onLeftThumbMouseup);
    document.addEventListener("touchmove", onLeftThumbMousemove);
    document.addEventListener("touchend", onLeftThumbMouseup);
    bar.classList.add("active");
  };

  const onInnerBarLeftClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    let _minValue = minValue + step;
    if (_minValue > maxValue - step) {
      _minValue = maxValue - step;
    }
    set_minValue(_minValue);
    let _barMin = ((_minValue - min) / (max - min)) * 100;
    set_barMin(_barMin);
    triggerChange(_minValue, maxValue);
  };

  const onInnerBarRightClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    let _maxValue = maxValue - step;
    if (_maxValue < minValue + step) {
      _maxValue = minValue + step;
    }
    set_maxValue(_maxValue);
    let _barMax = ((max - _maxValue) / (max - min)) * 100;
    set_barMax(_barMax);
    triggerChange(minValue, _maxValue);
  };

  const onBarRightClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    let _maxValue = maxValue + step;
    if (_maxValue > max) {
      _maxValue = max;
    }
    set_maxValue(_maxValue);
    let _barMax = ((max - _maxValue) / (max - min)) * 100;
    set_barMax(_barMax);
    triggerChange(minValue, _maxValue);
  };

  const onInputMaxChange = (e: any) => {
    let _maxValue = parseFloat(e.target.value);
    if (_maxValue < minValue + step) {
      _maxValue = minValue + step;
    }
    set_maxValue(_maxValue);
    let _barMax = ((max - _maxValue) / (max - min)) * 100;
    set_barMax(_barMax);
    triggerChange(minValue, _maxValue);
  };

  const onRightThumbMousemove = (e: any) => {
    let clientX = e.clientX;
    if (e.type === "touchmove") {
      clientX = e.touches[0].clientX;
    }
    let dx = clientX - startX;
    let per = dx / barBox.width;
    let val = barValue + (max - min) * per;
    let strSetp = "" + step;
    let fixed = 0;
    strSetp.indexOf(".") >= 0 && (fixed = 2);
    val = parseFloat(val.toFixed(fixed));
    if (val < minValue + step) {
      val = minValue + step;
    } else if (val > max) {
      val = max;
    }
    set_maxValue(val);
    let _barMax = ((max - val) / (max - min)) * 100;
    set_barMax(_barMax);
    triggerChange(minValue, val);
  };

  const onRightThumbMouseup = (e: any) => {
    document.removeEventListener("mousemove", onRightThumbMousemove);
    document.removeEventListener("mouseup", onRightThumbMouseup);
    document.removeEventListener("touchmove", onRightThumbMousemove);
    document.removeEventListener("touchend", onRightThumbMouseup);
    bar.classList.remove("active");
  };

  const onRightThumbMousedown = (e: any) => {
    startX = e.clientX;
    if (e.type === "touchstart") {
      if (e.touches.length === 1) {
        startX = e.touches[0].clientX;
      } else {
        return;
      }
    }

    barValue = maxValue;
    bar = e.target.parentNode;
    barBox = bar.getBoundingClientRect();
    document.addEventListener("mousemove", onRightThumbMousemove);
    document.addEventListener("mouseup", onRightThumbMouseup);
    document.addEventListener("touchmove", onRightThumbMousemove);
    document.addEventListener("touchend", onRightThumbMouseup);

    bar.classList.add("active");
  };

  return (
    <MultiRangeSliderWrapper>
      <div className="bar">
        <div
          className="bar-left"
          onClick={onBarLeftClick}
          style={{ width: barMin + "%" }}
        ></div>
        <input
          className="input-type-range input-type-range-min"
          type="range"
          min={min}
          max={max}
          step={step}
          value={minValue}
          onInput={onInputMinChange}
        />
        <div
          className="thumb thumb-left"
          onMouseDown={onLeftThumbMousedown}
          onTouchStart={onLeftThumbMousedown}
        >
          <div className="min-value">${minValue}</div>
        </div>
        <div className="bar-inner">
          <div className="bar-inner-left" onClick={onInnerBarLeftClick}></div>
          <div className="bar-inner-right" onClick={onInnerBarRightClick}></div>
        </div>
        <input
          className="input-type-range input-type-range-max"
          type="range"
          min={min}
          max={max}
          step={step}
          value={maxValue}
          onInput={onInputMaxChange}
        />
        <div
          className="thumb thumb-right"
          onMouseDown={onRightThumbMousedown}
          onTouchStart={onRightThumbMousedown}
        >
          <div className="max-value">${maxValue}</div>
        </div>
        <div
          className="bar-right"
          style={{ width: barMax + "%" }}
          onClick={onBarRightClick}
        ></div>
      </div>
    </MultiRangeSliderWrapper>
  );
};

export default MultiRangeSlider;
