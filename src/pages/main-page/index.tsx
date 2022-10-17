import styles from './styles.module.scss';
import React, { Component } from 'react';
import Search from 'components/search';
import Card from 'components/card';
import { getPageData, searchByName } from '../../components/api';
import { IResponseCard } from 'components/interfaces';

export default class MainPage extends Component<
  { handleCloseModal: () => void; handleClickCard: (cardData: IResponseCard) => void },
  {
    cardsData: IResponseCard[] | undefined;
    search: string;
    page: number;
    pages: number;
    prev: string | null;
    next: string | null;
    searchText: string;
  }
> {
  constructor(props: {
    handleCloseModal: () => void;
    handleClickCard: (cardData: IResponseCard) => void;
  }) {
    super(props);
    this.state = {
      cardsData: [],
      search: '',
      page: 1,
      pages: 0,
      prev: null,
      next: null,
      searchText: '',
    };

    this.getPageHandler = this.getPageHandler.bind(this);
  }

  componentDidMount() {
    this.getPageHandler();
  }

  async handleSearch(text: string) {
    await this.setState({ search: text });
    if (text === '') {
      this.getPageHandler();
      this.setState({ searchText: '' });
    }
  }

  async getSearchResultsHandler() {
    const response = await searchByName(this.state.search);
    this.setState({ searchText: this.state.search });
    const data = response?.results;
    this.setState({
      cardsData: data?.length !== 0 ? data : [],
      pages: response?.info.pages ? response?.info.pages : 0,
      prev: response!.info.prev,
      next: response!.info.next,
      page: 1,
    });
  }

  async getPageHandler(search: string | null = this.state.search) {
    const response = await getPageData(search);
    const data = response?.results;
    this.setState({
      cardsData: data?.length !== 0 ? data : [],
      pages: response?.info.pages ? response?.info.pages : 0,
      prev: response!.info.prev,
      next: response!.info.next,
    });
  }

  render() {
    return (
      <div className={`${styles.main}`}>
        <>
          <div className={styles['search-wrapper']}>
            <Search
              onChangeSearch={(text) => this.handleSearch(text)}
              onClickSearch={() => this.getSearchResultsHandler()}
            />
            {this.state.searchText && (
              <h2 className={styles['search-text']}>Searching: {this.state.searchText}</h2>
            )}
          </div>
          {this.state.cardsData!.length > 0 ? (
            <div className={styles.main}>
              <div className={styles.wrapper}>
                {this.state.cardsData!.map((el) => (
                  <Card
                    cardData={el}
                    key={el.id}
                    handleClickCard={(cardData: IResponseCard) =>
                      this.props.handleClickCard(cardData)
                    }
                  />
                ))}
              </div>
              <div className={styles.pagination}>
                <button
                  type="button"
                  className={`${styles.button}`}
                  onClick={() => {
                    this.getPageHandler(this.state.prev);
                    this.setState((state) => {
                      return { page: state.page - 1 };
                    });
                  }}
                  disabled={this.state.prev === null}
                >
                  prev
                </button>
                <div className={`${styles.button} ${styles['page-number']}`}>{this.state.page}</div>
                <button
                  type="button"
                  className={`${styles.button}`}
                  onClick={() => {
                    this.getPageHandler(this.state.next);
                    this.setState((state) => {
                      return { page: state.page + 1 };
                    });
                  }}
                  disabled={this.state.next === null}
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
