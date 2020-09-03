import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { Header } from '../components/layout/Header';

jest.mock('../context', () => ({
  useSelectedProjectValue: jest.fn(() => ({ selectedProject: 1 })),
  useProjectsValue: jest.fn(() => ({ projects: [] })),
}));

beforeEach(cleanup);

describe('<Header />', () => {
  describe('Success', () => {
    it('Renders the <Header /> component', () => {
      const { queryByTestId } = render(<Header />);
      expect(queryByTestId('header')).toBeTruthy();
    });

    it('Renders the <Header /> component and activates dark mode using onClick.', () => {
      const darkMode = false;
    });
  });
});
