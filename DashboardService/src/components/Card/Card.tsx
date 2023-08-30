import React, { ReactNode, memo } from 'react';
import cls from './Card.module.css';

interface ICard {
    thumbnail?: string;
    title?: string;
    children: ReactNode;
}

const Card = (props: ICard) => {
    const { thumbnail, children, title } = props;

    return (
        <div className={cls.Card}>
            {thumbnail ? (
                <div className={cls.ImageCard}>
                    <img
                        src={thumbnail}
                        title={title || 'img-info'}
                    />
                </div>
            ) : (
                ''
            )}
            <div className={cls.CardInfo}>{children}</div>
        </div>
    );
};

export default Card;
