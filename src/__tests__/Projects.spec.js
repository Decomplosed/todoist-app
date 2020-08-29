import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { Projects } from '../components/Projects';

beforeEach(cleanup);

jest.mock('../context', () => ({
  useSelectedProjectValue: jest.fn(() => ({
    setSelectedProject: jest.fn(() => 'INBOX'),
  })),
  useProjectsValue: jest.fn(() => ({
    projects: [
      {
        name: '🙌 THE OFFICE',
        projectId: '1',
        userId: 'Jx3X378u2QjdGeEQdasj',
        docId: 'michael-scott',
      },
    ],
  })),
}));

describe('<Projects />', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Success', () => {
    it('Renders <Projects />', () => {
      const { queryByTestId } = render(<Projects />);
      expect(queryByTestId('project-action')).toBeTruthy();
    });

    it('Renders <Projects /> adn selects an active project using onClick', () => {
      const { queryByTestId } = render(<Projects />);
    });
  });
});
