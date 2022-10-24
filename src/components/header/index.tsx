import styles from './styles.module.scss';
import React from 'react';
import menuItems from './menu-data';
import { NavLink, Outlet } from 'react-router-dom';

export default function Menu() {
  const setActive = ({ isActive }: { isActive: boolean }) =>
    isActive ? `${styles.active} ${styles.link}` : styles.link;

  return (
    <>
      <div className={styles.header}>
        {menuItems.map((el) => (
          <NavLink className={setActive} to={el.link} key={el.name} end>
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
