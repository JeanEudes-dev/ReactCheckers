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
  height: 800px;
  margin: 0px auto;
`;

// Board component
const Board: React.FC<BoardProps> = ({ size }) => {
    const [selectedCell, setSelectedCell] = useState<number | null>(null);
    const [currentPlayer, setCurrentPlayer] = useState<'player1' | 'player2'>('player1');
    const [initialBoard, setInitialBoard] = useState<CellData[]>(
        Array.from({ length: size * size }, (_, index) => ({
            id: index,
            piece: index < size * 2 ? 'pawn' : index >= size * (size - 2) ? 'pawn' : 'empty',
        }))
    );

    const handleCellClick = (cellId: number) => {
        if (selectedCell !== null) {
            const selectedPiece = initialBoard[selectedCell].piece;
            const selectedPlayer = selectedPiece === 'pawn' ? 'player1' : 'player2';

            if (isValidMove(selectedPiece, selectedCell, cellId, selectedPlayer)) {
                const updatedBoard = [...initialBoard];
                updatedBoard[cellId].piece = selectedPiece;
                updatedBoard[selectedCell].piece = 'empty';

                switchPlayers();
                setInitialBoard(updatedBoard);
                setSelectedCell(null);
                checkForWin();
            } else {
                setSelectedCell(null);
            }
        } else {
            if (initialBoard[cellId].piece !== 'empty') {
                setSelectedCell(cellId);
            }
        }
    };

    const isValidMove = (piece: PieceType, from: number, to: number, player: 'player1' | 'player2'): boolean => {
        // Implement your specific rules for valid moves based on piece type and player
        return initialBoard[to].piece === 'empty';
    };

    const switchPlayers = () => {
        setCurrentPlayer((prevPlayer) => (prevPlayer === 'player1' ? 'player2' : 'player1'));
    };

    const checkForWin = () => {
        // Implement your win condition logic here
    };

    return (
        <>
            <div>
                <h2>Current Player: {currentPlayer}</h2>
            </div>
            <div className='border'>
                <BoardContainer size={size}>
                    {initialBoard.map((cell) => (
                        <Cell
                            key={cell.id}
                            selected={selectedCell === cell.id}
                            even={(cell.id % size + Math.floor(cell.id / size)) % 2 === 0}
                            onClick={() => handleCellClick(cell.id)}
                            piece={cell.piece}
                        />
                    ))}
                </BoardContainer>
            </div>
        </>
    );
};

export default Board;