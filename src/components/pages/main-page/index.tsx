import styles from './styles.module.scss';
import React, { Component } from 'react';
import Search from 'components/search';
import api from '../../api';
import { IResponseCard } from '../../interfaces';
import Card from 'components/card';

export default class MainPage extends Component<
  Record<string, never>,
  { [key: string]: IResponseCard[] | undefined }
> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = { cardsData: [] };

    this.apiHandler = this.apiHandler.bind(this);
  }

  componentDidMount() {
    this.apiHandler();
  }

  componentWillUnmount() {}

  async apiHandler() {
    const response = await api();
    const data = response?.results;
    console.log(data);
    this.setState({ cardsData: data?.length !== 0 ? data : [] });
    console.log('state', this.state);
    /*
    setTimeout(() => {
      console.log('state2', this.state);
    }, 1000);
    */

    // console.log(this.state.cardsData);

    setTimeout(() => {
      // this.setState({ cardsData: data });

      console.log(this.state);
    }, 1000);
  }

  render() {
    return (
      <div className={`${styles.main} ${styles.dotted}`}>
        <>
          <Search />
          {this.state.cardsData!.length > 0 ? (
            <div className={styles.wrapper}>
              {this.state.cardsData?.map((el) => (
                <Card cardData={el} key={el.id} />
              ))}
            </div>
          ) : (
            <h2>Loading....</h2>
          )}
        </>
      </div>
    );
  }
}
