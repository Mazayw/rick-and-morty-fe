import About from '.';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

describe('About', () => {
  test('render page NotFound', async () => {
    render(<About />, { wrapper: BrowserRouter });
    expect(screen.getByText(/lorem/i)).toBeInTheDocument();
  });
});
