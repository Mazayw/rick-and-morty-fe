import styles from './styles.module.scss';
import React, { Component } from 'react';
import Search from 'components/search';
import Card from 'components/card';
import { getPageData, searchByName } from '../../components/api';
import { IResponseCard } from 'components/interfaces';
import Modal from 'components/modal';
// import cardData from '../../components/card copy/card-data';

export default class MainPage extends Component<
  Record<string, never>,
  {
    cardsData: IResponseCard[] | undefined;
    search: string;
    page: number;
    pages: number;
    prev: string | null;
    next: string | null;
    searchText: string;
    clickedCard?: IResponseCard | undefined;
    isModalShow: boolean;
  }
> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      cardsData: [],
      search: '',
      page: 1,
      pages: 0,
      prev: null,
      next: null,
      searchText: '',
      isModalShow: false,
    };

    this.getPageHandler = this.getPageHandler.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.getSearchResultsHandler = this.getSearchResultsHandler.bind(this);
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

  handleClickCard = (cardData: IResponseCard) => {
    this.setState({ clickedCard: cardData, isModalShow: true });
  };

  handleCloseModal = () => {
    this.setState({ isModalShow: false });
  };

  async getSearchResultsHandler() {
    const response = await searchByName(this.state.search);
    this.setState({ searchText: this.state.search });
    console.log(response);
    const data = response?.results;
    this.setState({
      cardsData: data?.length !== 0 ? data : [],
      pages: response?.info.pages ? response?.info.pages : 0,
      prev: response!.info.prev,
      next: response!.info.next,
      page: 1,
    });
    //this.setState({ pages: response?.info.pages ? response?.info.pages : 0 });
  }

  async getPageHandler(search: string | null = this.state.search) {
    const response = await getPageData(search);
    const data = response?.results;
    console.log(search);
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
        {this.state.isModalShow && (
          <Modal
            cardData={this.state.clickedCard!}
            handleCloseModal={() => this.handleCloseModal()}
          />
        )}

        <>
          <div className={styles['search-wrapper']}>
            <Search
              onChangeSearch={this.handleSearch}
              onClickSearch={this.getSearchResultsHandler}
            />
            {this.state.searchText && (
              <h2 className={styles['search-text']}>Searching: {this.state.searchText}</h2>
            )}
          </div>
          {this.state.cardsData!.length > 0 ? (
            <div className={styles.main}>
              <div className={styles.wrapper}>
                {this.state
                  .cardsData! //.filter((el) => el.name.toLowerCase().includes(this.state.search.toLowerCase()))     filter items
                  .map((el) => (
                    <Card
                      cardData={el}
                      key={el.id}
                      handleClickCard={(cardData: IResponseCard) => this.handleClickCard(cardData)}
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
