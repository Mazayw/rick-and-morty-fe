import Card from './';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { IResponseCard } from 'components/interfaces';
import cardData from './card-data';

describe('Card', () => {
  it('Card render', () => {
    render(
      <Card
        cardData={cardData as IResponseCard}
        handleClickCard={function (cardData: IResponseCard): void {
          console.log(cardData);
        }}
      />
    );

    expect(screen.getByText(/Rick Sanchez/i)).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
  });
});
