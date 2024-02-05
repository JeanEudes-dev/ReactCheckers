// src/components/Piece.tsx
import React from 'react';
import { FaChessKing } from 'react-icons/fa';
import { GiChessPawn } from 'react-icons/gi';
import { PieceType } from '../types';

interface PieceProps {
    type: PieceType;
    player: 'player1' | 'player2';
}

const Piece: React.FC<PieceProps> = ({ type, player }) => {


    return (
        <>
            {type === 'P1Pawn' && <GiChessPawn style={{ fontSize: '30px', color: '#1E88E5' }} />}
            {type === 'P2Pawn' && <GiChessPawn style={{ fontSize: '30px', color: '#FF8A65' }} />}
            {type === 'king1' && <FaChessKing style={{ fontSize: '30px', color: '#1E88E5' }} />}
            {type === 'king2' && <FaChessKing style={{ fontSize: '30px', color: '#FF8A65' }} />}
        </>
    );
};

export default Piece;
