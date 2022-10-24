import styles from './styles.module.scss';
import React, { useEffect, useRef, useState } from 'react';

export default function Search({
  onChangeSearch,
  onClickSearch,
  getPageHandler,
}: {
  onChangeSearch: (text: string) => void;
  onClickSearch: (text: string) => void;
  getPageHandler: () => Promise<void>;
}) {
  const [searchWord, setSearchWord] = useState('');
  const inputEl = useRef(null);

  useEffect(() => {
    onLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // const search = searchWord;
    return () => {
      //if (inputEl.current && inputEl.current!.value)
      localStorage.setItem('search', searchWord);
    };
  }, [searchWord]);

  const onLoad = () => {
    const value = localStorage.getItem('search');

    if (value) {
      onChangeSearch(value);
      onClickSearch(value);
      setSearchWord(value);
    } else {
      getPageHandler();
    }
  };

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchWord(value);
    // localStorage.setItem('search', value);
    onChangeSearch(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onClickSearch(searchWord);
    }
  };

  return (
    <div className={styles['search-wrapper']}>
      <input
        ref={inputEl}
        className={styles.search}
        type="search"
        value={searchWord}
        onChange={inputHandler}
        placeholder="Search"
        name="search"
        onKeyDown={handleKeyDown}
      />
      <img
        src="./icons/search.svg"
        alt="Search icon"
        className={styles.icon}
        onClick={() => onChangeSearch(searchWord)}
      />
    </div>
  );
}
