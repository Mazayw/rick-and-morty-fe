import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import MainPage from '.';
import { BrowserRouter } from 'react-router-dom';
import * as api from '../../components/api';
import { cardData } from '../../components/card/card-data';

jest.mock('../../components/api');

describe('MainPage', () => {
  it('api call', async () => {
    api.getPageData.mockResolvedValue(cardData);
    render(<MainPage />, { wrapper: BrowserRouter });
    await waitFor(() => {
      screen.queryByText(/rick/i);
    });
  });
});
