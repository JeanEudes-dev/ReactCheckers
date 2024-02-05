// src/components/Piece.tsx
import React from 'react';
import { FaChessKing } from 'react-icons/fa';
import { GiChessPawn } from "react-icons/gi";
import { PieceType } from '../types';

interface PieceProps {
    type: PieceType;
}

const Piece: React.FC<PieceProps> = ({ type }) => (
    <>
        {type === 'pawn' && <GiChessPawn style={{ fontSize: '30px' }} />}
        {type === 'king' && <FaChessKing style={{ fontSize: '30px' }} />}
    </>
);

export default Piece;
