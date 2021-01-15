import React from "react";
import styled, { css } from "styled-components";
import CellInfo from "../modules/CellInfo";

// セル
const CellStyle = css`
  border: 1px solid #999;
  float: left;
  font-weight: bold;
  line-height: 8px;
  height: 8px;
  margin-right: -1px;
  margin-top: -1px;
  padding: 0;
  text-align: center;
  width: 8px;
`;

const WhiteCell = styled.div`
  background: #000;
  ${CellStyle};
`;

const BlackCell = styled.div`
  background: #fff;
  ${CellStyle};
`;

const LiveCell: React.FC = () => {
  return <BlackCell />;
};

const DeadCell: React.FC = () => {
  return <WhiteCell />;
};

type CellProps = {
  data: CellInfo;
};

const Cell = React.memo<CellProps>(
  (props) => {
    return props?.data?.isActive ? <WhiteCell /> : <BlackCell />;
  },
  (prev, next) => {
    return prev?.data?.isActive === next?.data?.isActive;
  }
);

export default Cell;
