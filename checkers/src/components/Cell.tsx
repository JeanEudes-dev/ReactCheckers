// src/components/Cell.tsx
import React from 'react';
import styled from '@emotion/styled';
import Piece from './Piece';
import { PieceType } from '../types';

interface CellProps {
    selected: boolean;
    even: boolean;
    onClick: () => void;
    piece: PieceType;
}

const CellContainer = styled.div<{ selected: boolean; even: boolean }>`
  /* Update the background color based on even or odd cells */
  background-color: ${(props) => (props.selected ? '#6FCF97' : props.even ? '#ad4000' : '#FFFFFF')};
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  height: 100px;
  cursor: pointer;
`;

const Cell: React.FC<CellProps> = ({ selected, even, onClick, piece }) => (
    <CellContainer selected={selected} even={even} onClick={onClick}>
        <Piece type={piece} />
    </CellContainer>
);

export default Cell;
