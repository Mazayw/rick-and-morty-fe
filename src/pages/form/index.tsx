import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';

export default class Form extends PureComponent {
  render() {
    return (
      <div className={`${styles.main}`}>
        <h1 className={styles.title}>404</h1>
        <h2 className={styles.subtitle}>Page not found</h2>
        <Link to={'/'} className={styles.link}>
          Back to main page
        </Link>
      </div>
    );
  }
}
