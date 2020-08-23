import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { App } from '../App';

beforeEach(cleanup);

describe('<App />', () => {
  it('Renders the application', () => {
    const { queryByTestId } = render(<App />);
    expect(queryByTestId('application')).toBeTruthy();
  });

  it('Renders the application using dark mode', () => {
    const { queryByTestId } = render(<App darkModeDefault={true} />);
    expect(queryByTestId('application')).toBeTruthy();
  });
});
