import styles from './styles.module.scss';
import { IResponseCard } from 'components/interfaces';
import React from 'react';

export default function Card({
  cardData,
  handleClickCard,
}: {
  cardData: IResponseCard;
  handleClickCard: (cardData: IResponseCard) => void;
}) {
  return (
    <div
      className={styles['card-wrapper']}
      data-testid="card"
      onClick={() => handleClickCard(cardData)}
    >
      <img
        src={cardData.image}
        className={styles.image}
        alt={cardData.name}
        title={cardData.name}
      />
      <div className={styles.text}>
        <div className={styles.name}>{cardData.name}</div>
      </div>
    </div>
  );
}
