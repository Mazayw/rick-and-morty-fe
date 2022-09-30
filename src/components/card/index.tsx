import styles from './styles.module.scss';
import React, { Component } from 'react';
import { IResponseCard } from 'components/interfaces';

export default class Card extends Component<{ cardData: IResponseCard }> {
  constructor(props: { cardData: IResponseCard }) {
    super(props);
  }
  card = this.props.cardData;

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <div className={styles['card-wrapper']}>
        <img src={this.card.image} className={styles.image} />
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
    );
  }
}
// <button type="button">Search</button>

/*
export interface IResponseCard {
  created: string;
  episode: string[];
  gender: string;
  id: number;
  image: string;
  location: IResponseCardLocation;
  name: string;
  origin: IResponseCardLocation;
  species: string;
  status: string;
  type: string;
  url: string;
}
*/
