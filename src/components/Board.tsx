import React from "react";
import Cell from "./Cell";
import CellInfo from "../modules/CellInfo";

type State = {
  cellRowList: CellInfo[][];
};

class Board extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = {
      cellRowList: [],
    };
  }

  componentDidMount = () => {
    this.initCellRowList();
  };

  initCellRowList = () => {
    const n: number = 8;
    let cellRowList: CellInfo[][] = [];

    for (let i = 0; i < n; i++) {
      let rowList: CellInfo[] = [];
      for (let j = 0; j < n; j++) {
        let cell: CellInfo = new CellInfo();
        cell.x = i;
        cell.y = j;
        cell.isActive = false;
        rowList.push(cell);
      }
      cellRowList.push(rowList);
    }

    this.setState({
      cellRowList: cellRowList,
    });

    console.log("init");
    console.log(cellRowList);
  };

  render = () => {
    const { cellRowList } = this.state;
    console.log("????");
    console.log(cellRowList);
    return (
      <div style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <button>hoge</button>
        {cellRowList.map((row: CellInfo[], index: number) => {
          return (
            <div
              key={`row_${index}`}
              style={{
                display: "table",
              }}
            >
              {row.map((cell: CellInfo) => {
                return <Cell key={`cell_${cell.x}_${cell.y}`} data={cell} />;
              })}
            </div>
          );
        })}
      </div>
    );
  };
}

export default Board;
