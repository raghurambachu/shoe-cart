import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import { IAppState } from "../context/AppContext";
import { IProduct } from "../interfaces";
import { collectCountOfProductsForEachDataPoint } from "../utilities";

const HistogramChartWrapper = styled.div`
  //even multirange slider has been given extra padding of 10px on side
  height: 60px;
  width: calc(100% - 20px);
  position: relative;
`;

interface IBar {
  height: number;
  left: number;
  width: number;
}

const Bar = styled.div`
  position: absolute;
  height: ${({ height }: IBar) => `${height}px`};
  width: ${({ width }: IBar) => `${width}px`};
  left: ${({ left }: IBar) => `${left}px`};
  background: var(--section-border);

  z-index: 1;
  bottom: 0;
`;

/* Ruler kind of thing
     ${({ height }) =>
    height  &&
    `
  &::before {
    content: "";
    background: black;
    width: 0.5px;
    margin-left: -0.75px;
    height: 2px;
    bottom: 0;
    position: absolute;
  }
  `}
*/

interface IHistogramChart {
  appState: IAppState;
  merchandiseData: IProduct[]; //Data which we get from api
}

const HistogramChart = ({ appState, merchandiseData }: IHistogramChart) => {
  const {
    range: { initial, selected },
  } = appState;

  const chartWrapperRef = useRef<HTMLDivElement>(null);
  const xUnit = 50; //needs to be taken from appConfig;
  const totalUnits = (initial[1] - initial[0]) / xUnit;

  // height in number(px value) depicting height of each
  const [heightForEachUnit, setHeightForEachUnit] = useState<number[]>([]);
  const [maxCount, setMaxCount] = useState(0);
  const [totalWidth, setTotalWidth] = useState(0);

  useEffect(() => {
    const getDataPointsAndRespectiveProductCount =
      collectCountOfProductsForEachDataPoint({
        min: initial[0],
        max: initial[1],
        merchandiseData,
        xUnit,
        selectedRange: selected,
      });
    const maxCount = Math.max(...getDataPointsAndRespectiveProductCount);
    setMaxCount(maxCount);
    // This has been done to keep original MaxCount -> on changing selected range this was changing as per the new dataset, but this needs to be based on original dataset, so controlled in mount
  }, []);

  useEffect(() => {
    const getDataPointsAndRespectiveProductCount =
      collectCountOfProductsForEachDataPoint({
        min: initial[0],
        max: initial[1],
        merchandiseData,
        xUnit,
        selectedRange: selected,
      });

    const chartCoords: DOMRect | undefined =
      chartWrapperRef?.current?.getBoundingClientRect();

    //   Max Count of products is equivalent to whole height of the chart-wrapper
    //   Below it would never be zero, but just for typescript check
    const multiplyingFactor = (chartCoords?.height || 0) / maxCount;
    const barChartHeightsForEachUnit =
      getDataPointsAndRespectiveProductCount.map(
        (count) => count * multiplyingFactor
      );
    setTotalWidth(chartCoords?.width || 0);
    setHeightForEachUnit(barChartHeightsForEachUnit);
  }, [appState.range.selected, maxCount]); //to ensure on changing the selected range the other parts where the range doesnt exists to 0 height bars.

  return (
    <HistogramChartWrapper ref={chartWrapperRef}>
      {heightForEachUnit.map((height, index) => {
        //   index shud,nt be used but there is nothing unique
        return (
          <Bar
            key={index}
            height={height}
            width={totalWidth / totalUnits} //width of 1 unit
            left={(totalWidth / totalUnits) * index}
          />
        );
      })}
    </HistogramChartWrapper>
  );
};

export default HistogramChart;
