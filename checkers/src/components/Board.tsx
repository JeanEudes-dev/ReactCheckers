// src/components/Board.tsx
import React, { useState } from 'react';
import Cell from './Cell';
import styled from '@emotion/styled';

// Define the types for your pieces
type PieceType = 'empty' | 'pawn' | 'king';

// Define the type for a cell on the board
interface CellData {
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
width: 800px;
height:800px;
  margin: 0px auto;
`;

// Board component
const Board: React.FC<BoardProps> = ({ size }) => {
    // State to track selected cell
    const [selectedCell, setSelectedCell] = useState<number | null>(null);

    // Dummy data for the initial board state
    const initialBoard: CellData[] = Array.from({ length: size * size }, (_, index) => ({
        id: index,
        piece: index % 2 === 0 ? 'pawn' : 'king',
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
                    <Cell
                        key={cell.id}
                        selected={selectedCell === cell.id}
                        even={(cell.id % size + Math.floor(cell.id / size)) % 2 === 0} // Calculate if the cell is even
                        onClick={() => handleCellClick(cell.id)}
                        piece={cell.piece}
                    />
                ))}
            </BoardContainer>
        </div>
    );
};

export default Board;
