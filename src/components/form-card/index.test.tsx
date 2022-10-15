import FormCard from '.';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { ICardForm } from 'components/interfaces';
import cardData from './card-data';

describe('Card Form', () => {
  it('Card Form render', () => {
    render(<FormCard cardData={cardData as ICardForm} />);
    expect(screen.getByText(/e-mail/i)).toBeInTheDocument();
    expect(screen.getByText(/Date/i)).toBeInTheDocument();
    expect(screen.getByText(/Charater/i)).toBeInTheDocument();
    expect(screen.getByText(/news/i)).toBeInTheDocument();
    expect(screen.getByText(/advertisements/i)).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
  });
});
