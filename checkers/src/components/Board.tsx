// src/components/Board.tsx
import React, { useState } from 'react';
import styled from '@emotion/styled';
import { FaChessPawn, FaChessKing } from 'react-icons/fa'; // You can choose different icons

// Define the types for your pieces
type PieceType = 'empty' | 'pawn' | 'king';

// Define the type for a cell on the board
interface Cell {
    id: number;
    piece: PieceType;
}

// Define the BoardProps type
interface BoardProps {
    size: number; // Size of the board (assuming it's a square board)
}

// Styled component for the board
const BoardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props: BoardProps) => props.size}, 1fr);
  gap: 0px;
  max-width: 400px;
  margin: 0px auto;
`;

// Styled component for a cell
const CellContainer = styled.div<{ selected: boolean; even: boolean }>`
  /* Update the background color based on even or odd cells */
  background-color: ${(props) => (props.selected ? '#6FCF97' : props.even ? '#ad4000' : '#FFFFFF')};
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  height: 50px;
  cursor: pointer;
`;

// Board component
const Board: React.FC<BoardProps> = ({ size }) => {
    // State to track selected cell
    const [selectedCell, setSelectedCell] = useState<number | null>(null);

    // Dummy data for the initial board state
    const initialBoard: Cell[] = Array.from({ length: size * size }, (_, index) => ({
        id: index,
        piece: 'empty',
    }));

    // Function to handle cell click
    const handleCellClick = (cellId: number) => {
        // Implement logic for cell selection here
        setSelectedCell(cellId);
    };

    return (
        <div className='border'>
            <BoardContainer size={size}>
                {initialBoard.map((cell) => (
                    <CellContainer
                        key={cell.id}
                        selected={selectedCell === cell.id}
                        even={(cell.id % size + Math.floor(cell.id / size)) % 2 === 0} // Calculate if the cell is even
                        onClick={() => handleCellClick(cell.id)}
                    >
                        {/* Display different icons based on the piece type */}
                        {cell.piece === 'pawn' && <FaChessPawn />}
                        {cell.piece === 'king' && <FaChessKing />}
                    </CellContainer>
                ))}
            </BoardContainer>
        </div>

    );
};

export default Board;