// src/components/Piece.tsx
import React from 'react';
import { FaChessPawn, FaChessKing } from 'react-icons/fa';
import { PieceType } from '../types';

interface PieceProps {
    type: PieceType;
}

const Piece: React.FC<PieceProps> = ({ type }) => (
    <>
        {type === 'pawn' && <FaChessPawn />}
        {type === 'king' && <FaChessKing />}
    </>
);

export default Piece;
