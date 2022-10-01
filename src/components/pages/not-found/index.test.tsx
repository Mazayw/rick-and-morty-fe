import NotFound from './';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

describe('NotFound', () => {
  test('render page NotFound', async () => {
    render(<NotFound />, { wrapper: BrowserRouter });
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });
});
