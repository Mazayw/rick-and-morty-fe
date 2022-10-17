import styles from './styles.module.scss';
import React, { Component } from 'react';
import { IResponseCard } from 'components/interfaces';

export default class Card extends Component<{
  cardData: IResponseCard;
  handleClickCard: (cardData: IResponseCard) => void;
}> {
  constructor(props: {
    cardData: IResponseCard;
    handleClickCard: (cardData: IResponseCard) => void;
  }) {
    super(props);
  }
  card = this.props.cardData;

  render() {
    return (
      <div
        className={styles['card-wrapper']}
        data-testid="card"
        onClick={() => this.props.handleClickCard(this.props.cardData)}
      >
        <img
          src={this.card.image}
          className={styles.image}
          alt={this.card.name}
          title={this.card.name}
        />
        <div className={styles.text}>
          <div className={styles.name}>{this.card.name}</div>
        </div>
      </div>
    );
  }
}
