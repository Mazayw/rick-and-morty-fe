import MainPage from './pages/main-page/index';
import styles from './app.module.scss';
import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import NotFound from './pages/not-found/index';
import Menu from 'components/header';
import About from './pages/about';
import Form from './pages/form/index';
import { IResponseCard } from './components/interfaces';
import Modal from 'components/modal';
import { ContextProvider } from 'context/context';

export default function App() {
  /*  Record<string, never>,
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
*/
  const [clickedCard, setClickedCard] = useState<IResponseCard | undefined>(undefined);
  const [isModalShow, setIsModalShow] = useState(false);

  const handleClickCard = (cardData: IResponseCard) => {
    setClickedCard(cardData);
    setIsModalShow(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    //event.stopPropagation();
    //event.preventDefault();
    setIsModalShow(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <ContextProvider>
      <div className={styles.dotted}>
        {isModalShow && <Modal cardData={clickedCard!} handleCloseModal={handleCloseModal} />}

        <Routes>
          <Route path="/" element={<Menu />}>
            <Route
              index
              element={
                <MainPage
                  handleClickCard={(cardData: IResponseCard) => handleClickCard(cardData)}
                />
              }
            />
            <Route path="about" element={<About />} />
            <Route path="form" element={<Form />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </div>
    </ContextProvider>
  );
}
