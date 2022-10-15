import styles from './styles.module.scss';
import React, { Component } from 'react';
import { ICardForm } from 'components/interfaces';

export default class FormCard extends Component<{
  cardData: ICardForm;
}> {
  constructor(props: { cardData: ICardForm }) {
    super(props);
  }

  render() {
    const { email, date, select, checkbox, switcher, imagePreviewUrl } = this.props.cardData;

    return (
      <div className={styles['card-wrapper']} data-testid="card">
        <div className={styles['image-wrapper']}>
          {' '}
          <img
            src={imagePreviewUrl as string}
            className={styles.image}
            alt="Uploaded image"
            title="Uploaded image"
          />
        </div>
        <div className={styles.text}>
          <ul className={styles.about}>
            <li className={styles.description}>
              <span className={styles.bold}> E-mail: </span>
              {email}{' '}
            </li>
            <li className={styles.description}>
              <span className={styles.bold}>Date: </span>
              {date}
            </li>
            <li className={styles.description}>
              <span className={styles.bold}>Charater: </span>
              {select}
            </li>
            <li className={styles.description}>
              <span className={styles.bold}>Receive news by mail: </span>
              {checkbox ? 'Yes' : 'No'}
            </li>
            <li className={styles.description}>
              <span className={styles.bold}> Receive advertisements: </span>
              {switcher ? 'Yes' : 'No'}
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
