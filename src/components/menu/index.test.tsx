import Menu from '.';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import menuItems from './menu-data';

describe('Menu', () => {
  it('Menu render', () => {
    render(<Menu />, { wrapper: BrowserRouter });
    expect(screen.getAllByRole('link')).toHaveLength(menuItems.length);
  });
});
