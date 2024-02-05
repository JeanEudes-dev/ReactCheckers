// src/components/Board.tsx
import React, { useState } from 'react';
import Cell from './Cell';
import styled from '@emotion/styled';
import { PieceType } from '../types';

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
            piece: index < size * 2 ? 'P1Pawn' : index >= size * (size - 2) ? 'P2Pawn' : 'empty',
        }))
    );

    const handleCellClick = (cellId: number) => {
        if (selectedCell !== null) {
            const selectedPiece = initialBoard[selectedCell].piece;
            const selectedPlayer = getCurrentPlayer();

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

    // Helper function to get the player label for the current player
    const getCurrentPlayer = (): 'player1' | 'player2' => {
        return currentPlayer;
    };

    const isValidMove = (piece: PieceType, from: number, to: number, player: 'player1' | 'player2'): boolean => {
        const fromRow = Math.floor(from / size);
        const fromCol = from % size;
        const toRow = Math.floor(to / size);
        const toCol = to % size;
        const isPlayer1 = player === 'player1';

        // Ensure the correct player is moving their pawn
        if ((isPlayer1 && piece !== 'P1Pawn') || (!isPlayer1 && piece !== 'P2Pawn')) {
            return false;
        }

        // A pawn can only move diagonally
        const rowDifference = Math.abs(toRow - fromRow);
        const colDifference = Math.abs(toCol - fromCol);

        if (rowDifference !== 1 || colDifference !== 1) {
            return false;
        }

        // Check if the destination cell is empty or has an opponent's piece
        const destinationPiece = initialBoard[to].piece;

        if (destinationPiece === 'empty' || (isPlayer1 ? destinationPiece === 'P2Pawn' : destinationPiece === 'P1Pawn')) {
            return true;
        }

        return false;
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
                            player={currentPlayer}
                        />
                    ))}
                </BoardContainer>
            </div>
        </>
    );
};

export default Board;