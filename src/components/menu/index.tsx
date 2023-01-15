import styles from './styles.module.scss';
import React, { useEffect } from 'react';
import menuItems from './menu-data';
import { NavLink, Outlet } from 'react-router-dom';
import { useGlobalContext } from 'context/context';
import { getCharacters } from 'components/api';
import { REDUCER_ACTION_TYPE } from 'context/reducer';
import { IResponseCard } from 'components/interfaces';

export default function Menu() {
  const setActive = ({ isActive }: { isActive: boolean }) =>
    isActive ? `${styles.active} ${styles.link}` : styles.link;

  const { state, dispatch } = useGlobalContext();

  /*
  const fetchPage = useCallback(async () => {
    const result = await getCharacters({ page: `${state.page}` });
    if (result?.status === 200) {
      dispatch({
        type: REDUCER_ACTION_TYPE.CHANGE_CARDS_DATA,
        payload: result.data.results as IResponseCard[],
      });
      dispatch({
        type: REDUCER_ACTION_TYPE.CHANGE_TOTAL_PAGES,
      });
    }
    console.log(state, dispatch);
  }, [dispatch]);
  */

  useEffect(() => {
    const onChangePage = async () => {
      const searchParams = { page: `${state.page}` };
      if (state.search) Object.assign(searchParams, { name: state.search });
      const result = await getCharacters(searchParams);
      if (result?.status === 200) {
        dispatch({
          type: REDUCER_ACTION_TYPE.CHANGE_CARDS_DATA,
          payload: result.data.results as IResponseCard[],
        });
        dispatch({
          type: REDUCER_ACTION_TYPE.CHANGE_TOTAL_PAGES,
          payload: result.data.info.pages as number,
        });
      }
    };

    onChangePage();
  }, [state.page, state.search]);

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
