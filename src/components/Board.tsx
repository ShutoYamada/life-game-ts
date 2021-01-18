import React from "react";
import Cell from "./Cell";
import CellInfo from "../modules/CellInfo";
import { generateRandomActiveCellPoint } from "../utils/CellUtil";

type State = {
  // 行数
  rowCount: number;
  // 初期のアクティブセル数
  defaultActiveCount: number;
  // セル行のリスト
  cellRowList: CellInfo[][];
};

class Board extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = {
      rowCount: 8,
      defaultActiveCount: 12,
      cellRowList: [],
    };
  }

  componentDidMount = () => {
    this.initCellRowList();
  };

  /**
   * セル行リストを初期化
   */
  initCellRowList = () => {
    const { rowCount, defaultActiveCount } = this.state;
    // アクティブなセルの座標リストを乱数生成
    const activePointList: {
      x: number;
      y: number;
    }[] = generateRandomActiveCellPoint(rowCount, defaultActiveCount);
    let cellRowList: CellInfo[][] = [];

    // 各セルの組み立て
    for (let i = 0; i < rowCount; i++) {
      let rowList: CellInfo[] = [];
      for (let j = 0; j < rowCount; j++) {
        let cell: CellInfo = new CellInfo();
        cell.x = i;
        cell.y = j;
        cell.isActive = !!activePointList.find((p) => {
          return p.x === cell.x && p.y === cell.y;
        });
        rowList.push(cell);
      }
      cellRowList.push(rowList);
    }

    this.setState({
      cellRowList: cellRowList,
    });
  };

  render = () => {
    const { cellRowList } = this.state;
    return (
      <div style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <button>Start</button>
        <div style={{ margin: "2% auto auto auto" }}>
          {cellRowList.map((row: CellInfo[], index: number) => {
            return (
              <div
                key={`row_${index}`}
                style={{
                  display: "table",
                  margin: "auto",
                }}
              >
                {row.map((cell: CellInfo) => {
                  return <Cell key={`cell_${cell.x}_${cell.y}`} data={cell} />;
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  };
}

export default Board;
