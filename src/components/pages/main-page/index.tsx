import styles from './styles.module.scss';
import React, { Component } from 'react';
import Search from 'components/search';
import getPageData from '../../api';
import { IResponseCard } from '../../interfaces';
import Card from 'components/card';

export default class MainPage extends Component<
  Record<string, never>,
  { cardsData: IResponseCard[] | undefined; search: string; page: number; pages: number }
> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = { cardsData: [], search: '', page: 1, pages: 0 };

    this.apiHandler = this.apiHandler.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.paginationHandler = this.paginationHandler.bind(this);
  }

  componentDidMount() {
    this.apiHandler();
  }

  handleSearch(text: string) {
    this.setState({ search: text });
  }

  async apiHandler() {
    const response = await getPageData(this.state.page);
    const data = response?.results;
    this.setState({ cardsData: data?.length !== 0 ? data : [] });
    this.setState({ pages: response?.info.pages ? response?.info.pages : 0 });
  }

  async paginationHandler(page: string) {
    let increment = 1;
    if (page === 'prev') increment = -1;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    await this.setState((state, _props) => ({
      page: state.page + increment,
    }));
    this.apiHandler();
  }

  render() {
    return (
      <div className={`${styles.main}`}>
        <>
          <div className={styles['search-wrapper']}>
            <Search onChangeSearch={this.handleSearch} />
            {this.state.search && (
              <h2 className={styles['search-text']}>Searching: {this.state.search}</h2>
            )}
          </div>
          {this.state.cardsData!.length > 0 ? (
            <div className={styles.main}>
              <div className={styles.wrapper}>
                {this.state
                  .cardsData!.filter((el) =>
                    el.name.toLowerCase().includes(this.state.search.toLowerCase())
                  )
                  .map((el) => (
                    <Card cardData={el} key={el.id} />
                  ))}
              </div>
              <div className={styles.pagination}>
                <button
                  type="button"
                  className={`${styles.button}`}
                  onClick={() => this.paginationHandler('prev')}
                  disabled={this.state.page === 1}
                >
                  prev
                </button>
                <div className={`${styles.button} ${styles['page-number']}`}>{this.state.page}</div>
                <button
                  type="button"
                  className={`${styles.button}`}
                  onClick={() => this.paginationHandler('next')}
                  disabled={this.state.pages === this.state.page}
                >
                  next
                </button>
              </div>
            </div>
          ) : (
            <h2>Loading....</h2>
          )}
        </>
      </div>
    );
  }
}
