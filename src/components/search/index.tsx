import styles from './styles.module.scss';
import React, { useEffect, useRef } from 'react';
import { useGlobalContext } from 'context/context';
import { REDUCER_ACTION_TYPE } from 'context/reducer';

export default function Search() {
  const inputEl = useRef(null);
  const { state, dispatch } = useGlobalContext();

  useEffect(() => {
    onLoad();
  }, []);

  useEffect(() => {
    return () => {
      localStorage.setItem('search', state.search);
    };
  }, [state.search]);

  const onLoad = () => {
    const value = localStorage.getItem('search');
    if (value) {
      dispatch({ type: REDUCER_ACTION_TYPE.CHANGE_SEARCH, payload: value });
    }
  };

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch({ type: REDUCER_ACTION_TYPE.CHANGE_SEARCH, payload: value });
  };

  return (
    <div className={styles['search-wrapper']}>
      <input
        ref={inputEl}
        className={styles.search}
        type="search"
        value={state.search}
        onChange={inputHandler}
        placeholder="Search"
        name="search"
      />
      <img src="./icons/search.svg" alt="Search icon" className={styles.icon} />
    </div>
  );
}
