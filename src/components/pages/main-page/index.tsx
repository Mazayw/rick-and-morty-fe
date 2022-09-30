import styles from './styles.module.scss';
import React, { PureComponent } from 'react';
import Search from 'components/search';

export default class MainPage extends PureComponent {
  render() {
    return (
      <div className={`${styles.main} ${styles.dotted}`}>
        <Search />
        <h1>Main</h1>
      </div>
    );
  }
}
