import React from 'react';
import cls from './Card.module.css';

interface ICard {
    title: string;
    body: string;
}

const Card = ({ title, body }: ICard) => (
    <div className={cls.Card}>
        <h3>{title}</h3>
        <p>{body}</p>
    </div>
);

export default Card;
