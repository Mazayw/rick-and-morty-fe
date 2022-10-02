import styles from './styles.module.scss';
import React, { Component } from 'react';
import menuItems from './menu-data';
import { NavLink, Outlet } from 'react-router-dom';

export default class Menu extends Component {
  setActive = ({ isActive }: { isActive: boolean }) =>
    isActive ? `${styles.active} ${styles.link}` : styles.link;

  render() {
    return (
      <>
        <div className={styles.header}>
          {menuItems.map((el) => (
            <NavLink className={this.setActive} to={el.link} key={el.name} end>
              {el.name}
            </NavLink>
          ))}
        </div>
        <main>
          <Outlet />
        </main>
      </>
    );
  }
}
