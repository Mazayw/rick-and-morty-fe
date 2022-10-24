import Form from '.';
import { fireEvent, getByTestId, render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';

describe('Form', () => {
  test('render page Form', async () => {
    const blob = new Blob(['foo'], { type: 'image/jpeg' });
    const { container } = render(<Form />, { wrapper: BrowserRouter });

    expect(screen.getByText(/advertisements/i)).toBeInTheDocument();
    expect(screen.getByText(/e-mail/i)).toBeInTheDocument();
    expect(screen.getByText(/Date/i)).toBeInTheDocument();
    expect(screen.getByText(/Charater/i)).toBeInTheDocument();
    expect(screen.getByText(/news/i)).toBeInTheDocument();
    expect(screen.getByText(/advertisements/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    await act(async () => {
      fireEvent.change(screen.getByTestId('email'), { target: { value: 'test' } });
    });
    expect(screen.queryByText(/invalid/i)).toBeInTheDocument();
    fireEvent.change(screen.getByTestId('date'), { target: { value: '2022-01-05' } });
    fireEvent.change(screen.getByTestId('select'), { target: { value: 'Rick' } });
    fireEvent.change(screen.getByTestId('checkbox'), { target: { checked: true } });
    fireEvent.change(screen.getByTestId('switcher'), { target: { checked: true } });
    fireEvent.change(screen.getByTestId('file'), { target: { files: [blob] } });
    screen.getByTestId('file'), { target: { files: [blob] } };
    fireEvent.click(getByTestId(container, 'submit'));
    fireEvent.click(getByTestId(container, 'submit'));
    await act(async () => {
      fireEvent.change(screen.getByTestId('email'), { target: { value: 'test@gmail.com' } });
    });
    expect(screen.queryByText(/invalid/i)).toBeNull();
  });
});
