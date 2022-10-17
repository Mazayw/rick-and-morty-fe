import styles from './styles.module.scss';
import React, { Component } from 'react';
import { IResponseCard } from 'components/interfaces';

export default class Modal extends Component<{
  cardData: IResponseCard;
  handleCloseModal: () => void;
}> {
  constructor(props: { cardData: IResponseCard; handleCloseModal: () => void }) {
    super(props);
  }
  card = this.props.cardData;

  render() {
    return (
      <div className={styles['modal-back']} onClick={this.props.handleCloseModal}>
        <div className={styles['card-wrapper']} data-testid="card">
          <img
            src={this.card.image}
            className={styles.image}
            alt={this.card.name}
            title={this.card.name}
          />
          <div className={styles.text}>
            <div className={styles.name}>{this.card.name}</div>
            <ul className={styles.about}>
              <li className={styles.description}>
                <span className={styles.bold}>Location: </span>
                {this.card.location.name}{' '}
              </li>
              <li className={styles.description}>
                <span className={styles.bold}>Origin: </span>
                {this.card.origin.name}
              </li>
              <li className={styles.description}>
                <span className={styles.bold}>Species: </span>
                {this.card.species}
              </li>
              <li className={styles.description}>
                <span className={styles.bold}>Gender: </span>
                {this.card.gender}
              </li>
              <li className={styles.description}>
                <span className={styles.bold}>Type: </span>
                {this.card.type || 'Unknown'}
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
