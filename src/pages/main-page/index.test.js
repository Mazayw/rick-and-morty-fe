import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import MainPage from '.';
import { BrowserRouter } from 'react-router-dom';

describe('MainPage', () => {
  it('render App component', async () => {
    render(<MainPage />, { wrapper: BrowserRouter });
    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
    expect(await screen.findByText(/prev/i)).toBeInTheDocument();
    expect(await screen.findByText(/next/i)).toBeInTheDocument();
  });

  it('render list of cards', async () => {
    render(<MainPage />, { wrapper: BrowserRouter });
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    expect(await screen.findAllByTestId('card')).toHaveLength(20);
  });

  it('search component', async () => {
    const setItem = jest.spyOn(Storage.prototype, 'setItem');
    const getItem = jest.spyOn(Storage.prototype, 'getItem');

    render(<MainPage />, { wrapper: BrowserRouter });
    expect(screen.queryByText(/test /i)).toBeNull();
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
    expect(screen.queryByText(/search/i)).toBeNull();
    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'test' } });
    // expect(screen.getByText(/test/i)).toBeInTheDocument();
    expect(setItem).toHaveBeenCalled();
    expect(getItem).toHaveBeenCalled();
  });

  it('change page', async () => {
    render(<MainPage />, { wrapper: BrowserRouter });
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    expect(await screen.findAllByTestId('card')).toHaveLength(20);
    fireEvent.click(await screen.findByText(/next/i));
    expect(await screen.findAllByTestId('card')).toHaveLength(20);
    fireEvent.click(await screen.findByText(/prev/i));
    expect(await screen.findAllByTestId('card')).toHaveLength(20);
  });
});
