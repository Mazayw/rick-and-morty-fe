import React, { PureComponent } from 'react';
import styles from './styles.module.scss';

export default class NotFound extends PureComponent {
  render() {
    return (
      <div className={`${styles.main} ${styles.dotted}`}>
        <h1>NotFound</h1>
      </div>
    );
  }
}
