import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import MainPage from '.';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

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
    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'rick' } });
    const input = screen.getByRole('searchbox');
    fireEvent.keyDown(screen.getByRole('searchbox'), { key: 'Enter', keyCode: 13, charCode: 13 });
    input.focus();
    await userEvent.keyboard('{enter}');
    // expect(screen.queryByText(/rick/i)).toBeInTheDocument();

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
