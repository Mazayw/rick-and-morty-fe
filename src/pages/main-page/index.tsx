import styles from './styles.module.scss';
import React, { useState, useEffect } from 'react';
import Search from 'components/search';
import Card from 'components/card';
import { getPageData, searchByName } from '../../components/api';
import { IResponseCard } from 'components/interfaces';

export default function MainPage({
  handleClickCard,
}: {
  handleClickCard: (cardData: IResponseCard) => void;
}) {
  const [cardsData, setCardsData] = useState<IResponseCard[] | never>([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [prev, setPrev] = useState<string | null>(null);
  const [next, setNext] = useState<string | null>(null);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    search === '' && getPageHandler();
  }, []);

  const handleSearch = async (text: string) => {
    await setSearch(text);
    if (text === '') {
      getPageHandler();
      setSearchText('');
    }
  };

  const getSearchResultsHandler = async (searchValue = search) => {
    const response = await searchByName(searchValue);
    if (response?.status === 200) {
      const data = response?.data.results;
      setCardsData(data?.length !== 0 ? data : []);
      setPages(response?.data.info.pages ? response?.data.info.pages : 0);
      setPrev(response!.data.info.prev);
      setNext(response!.data.info.next);
      setPage(1);
      setSearchText(searchValue);
    } else {
      setCardsData([]);
    }
  };

  const getPageHandler = async (page: string | null = '') => {
    const response = await getPageData(page);
    if (response?.status === 200) {
      const data = response?.data.results;
      setCardsData(data?.length !== 0 ? data : []);
      setPages(response?.data.info.pages ? response?.data.info.pages : 0);
      setPrev(response!.data.info.prev);
      setNext(response!.data.info.next);
    } else {
      setCardsData([]);
    }
  };

  const noCardsHandler = () => {
    return search === '' ? 'Loading....' : 'Nothing found';
  };

  return (
    <div className={`${styles.main}`}>
      <>
        <div className={styles['search-wrapper']}>
          <Search
            onChangeSearch={(text) => handleSearch(text)}
            onClickSearch={(value) => getSearchResultsHandler(value)}
            getPageHandler={() => getPageHandler()}
          />
          {searchText && <h2 className={styles['search-text']}>Searching: {searchText}</h2>}
        </div>
        {cardsData!.length > 0 ? (
          <div className={styles.main}>
            <div className={styles.wrapper}>
              {cardsData!.map((el) => (
                <Card
                  cardData={el}
                  key={el.id}
                  handleClickCard={(cardData: IResponseCard) => handleClickCard(cardData)}
                />
              ))}
            </div>
            <div className={styles.pagination}>
              <button
                type="button"
                className={`${styles.button}`}
                onClick={() => {
                  getPageHandler(prev);
                  setPage((prev) => prev - 1);
                }}
                disabled={prev === null}
              >
                prev
              </button>
              <div className={`${styles.button} ${styles['page-number']}`}>{page}</div>
              <button
                type="button"
                className={`${styles.button}`}
                onClick={() => {
                  getPageHandler(next);
                  setPage((prev) => prev + 1);
                }}
                disabled={next === null}
              >
                next
              </button>
            </div>
          </div>
        ) : (
          <h2>{noCardsHandler()}</h2>
        )}
      </>
    </div>
  );
}
