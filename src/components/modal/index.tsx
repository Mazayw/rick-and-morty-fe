import styles from './styles.module.scss';
import React from 'react';
import { IResponseCard } from 'components/interfaces';

export default function Modal({
  cardData,
  handleCloseModal,
}: {
  cardData: IResponseCard;
  handleCloseModal: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}) {
  return (
    <div className={styles['modal-back']} onClick={(event) => handleCloseModal(event)}>
      <div
        className={styles['card-wrapper']}
        data-testid="card"
        onClick={(event) => event.stopPropagation()}
      >
        <img
          src="./icons/close.svg"
          alt="Close icon"
          className={styles.close}
          onClick={(event) => handleCloseModal(event)}
        />
        <img
          src={cardData.image}
          className={styles.image}
          alt={cardData.name}
          title={cardData.name}
        />
        <div className={styles.text}>
          <div className={styles.name}>{cardData.name}</div>
          <ul className={styles.about}>
            <li className={styles.description}>
              <span className={styles.bold}>Location: </span>
              {cardData.location.name}{' '}
            </li>
            <li className={styles.description}>
              <span className={styles.bold}>Origin: </span>
              {cardData.origin.name}
            </li>
            <li className={styles.description}>
              <span className={styles.bold}>Species: </span>
              {cardData.species}
            </li>
            <li className={styles.description}>
              <span className={styles.bold}>Gender: </span>
              {cardData.gender}
            </li>
            <li className={styles.description}>
              <span className={styles.bold}>Type: </span>
              {cardData.type || 'Unknown'}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
