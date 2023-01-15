import styles from './styles.module.scss';
import React from 'react';
import Search from 'components/search';
import Card from 'components/card';

import { IResponseCard } from 'components/interfaces';
import { useGlobalContext } from 'context/context';
import { REDUCER_ACTION_TYPE } from 'context/reducer';

export default function MainPage({
  handleClickCard,
}: {
  handleClickCard: (cardData: IResponseCard) => void;
}) {
  const { state, dispatch } = useGlobalContext();
  console.log(state, dispatch);

  const noCardsHandler = () => {
    return state.search === '' ? 'Loading....' : 'Nothing found';
  };

  return (
    <div className={`${styles.main}`}>
      <>
        <div className={styles['search-wrapper']}>
          <Search />
          {state.search && <h2 className={styles['search-text']}>Searching: {state.search}</h2>}
        </div>
        {state.cardsData.length > 0 ? (
          <div className={styles.main}>
            <div className={styles.wrapper}>
              {state.cardsData.map((el) => (
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
                  dispatch({ type: REDUCER_ACTION_TYPE.PREV_PAGE });
                }}
                disabled={state.page <= 1}
              >
                prev
              </button>
              <div className={`${styles.button} ${styles['page-number']}`}>{state.page}</div>
              <button
                type="button"
                className={`${styles.button}`}
                onClick={() => {
                  dispatch({ type: REDUCER_ACTION_TYPE.NEXT_PAGE });
                }}
                disabled={state.page >= state.totalPages}
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
