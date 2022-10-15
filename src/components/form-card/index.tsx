import styles from './styles.module.scss';
import React, { Component } from 'react';
import { ICardForm } from 'components/interfaces';

export default class FormCard extends Component<{
  cardData: ICardForm;
}> {
  constructor(props: { cardData: ICardForm }) {
    super(props);
  }

  card = this.props.cardData;
  reader = new FileReader();

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

/*
export interface ICardForm {
  email?: string | undefined;
  date?: string | undefined;
  select?: string | undefined;
  checkbox?: boolean | undefined;
  switcher?: boolean | undefined;
  file?: FileList | undefined | null;
}

<div className={styles.main}>
        <form onSubmit={this.handleSubmit} className={styles.form}>
          <label>
            E-mail:
            <input
              type="text"
              ref={this.input}
              className={styles.name}
              onChange={this.onChangeEmail}
            />
          </label>
          {this.state && this.state['emailError'] && <h2>{this.state.emailError}</h2>}
          <label>
            Start date:
            <input type="date" defaultValue="2022-01-01" ref={this.date}></input>
          </label>
          <label>
            Select charater:
            <select ref={this.select}>
              <option value="Rick">Rick</option>
              <option value="Morty">Morty</option>
              <option value="Summer">Summer</option>
              <option value="Beth">Beth</option>
              <option value="Jerry">Jerry</option>
            </select>
          </label>
          <label>
            I agree to receive news by mail:
            <input type="checkbox" ref={this.checkbox}></input>
          </label>
          <label className={styles.switch}>
            I agree to receive advertisements:
            <input type="checkbox" ref={this.switcher}></input>
            <span className={`${styles.slider} ${styles.round}`}></span>
          </label>
          <label>
            Select a file:
            <input type="file" id="myfile" name="myfile"></input>
          </label>
          <input type="submit" value="Submit" disabled={this.state.submitDisabled} />
        </form>

*/
