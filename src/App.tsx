import MainPage from './pages/main-page/index';
import styles from './app.module.scss';
import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import NotFound from './pages/not-found/index';
import Menu from 'components/header';
import About from './pages/about';
import Form from './pages/form/index';
import { IResponseCard } from './components/interfaces';
import Modal from 'components/modal';

export default class App extends Component<
  Record<string, never>,
  {
    clickedCard?: IResponseCard | undefined;
    isModalShow: boolean;
  }
> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      isModalShow: false,
    };
  }

  handleClickCard = (cardData: IResponseCard) => {
    this.setState({ clickedCard: cardData, isModalShow: true });
    document.body.style.overflow = 'hidden';
  };

  handleCloseModal = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    event.preventDefault();
    this.setState({ isModalShow: false });
    document.body.style.overflow = 'auto';
  };
  render() {
    return (
      <div className={styles.dotted}>
        {this.state.isModalShow && (
          <Modal
            cardData={this.state.clickedCard!}
            handleCloseModal={(event) => this.handleCloseModal(event)}
          />
        )}

        <Routes>
          <Route path="/" element={<Menu />}>
            <Route
              index
              element={
                <MainPage
                  handleClickCard={(cardData: IResponseCard) => this.handleClickCard(cardData)}
                />
              }
            />
            <Route path="about" element={<About />} />
            <Route path="form" element={<Form />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </div>
    );
  }
}
