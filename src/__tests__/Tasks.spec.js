import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { Tasks } from '../components/Tasks';
import { useSelectedProjectValue } from '../context';

jest.mock('../context', () => ({
  useSelectedProjectValue: jest.fn(),
  useProjectsValue: jest.fn(() => ({
    projects: [
      {
        name: '🙌 THE OFFICE',
        projectId: '1',
        userId: 'Jx3X378u2QjdGeEQdasj',
        docId: 'michael-scott',
      },
      {
        name: '🚀 DAILY',
        projectId: '2',
        userId: 'Jx3X378u2QjdGeEQdasj',
        docId: 'daily-office',
      },
      {
        name: '🎯 FUTURE',
        projectId: '3',
        userId: 'Jx3X378u2QjdGeEQdasj',
        docId: 'wake-up',
      },
      {
        name: '📚 WORDS',
        projectId: '4',
        userId: 'Jx3X378u2QjdGeEQdasj',
        docId: 'arcade-fire',
      },
      {
        name: '🎵 MUSIC',
        projectId: '5',
        userId: 'Jx3X378u2QjdGeEQdasj',
        docId: 'bella-ciao',
      },
    ],
  })),
}));

jest.mock('../hooks', () => ({
  useTasks: () => ({
    tasks: [
      {
        id: 'mx2taaXpF38vYqMGbVtY',
        archived: false,
        date: '21/07/2019',
        projectId: '1',
        task: "What is love? Baby don't hurt me, don't hurt me... No more!",
        userId: 'Jx3X378u2QjdGeEQdasj',
      },
    ],
  }),
}));

beforeEach(cleanup);

describe('<Tasks />', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Success', () => {
    it('Renders <Tasks /> component', () => {
      useSelectedProjectValue.mockImplementation(() => ({
        setSelectedProject: jest.fn(() => 'INBOX'),
        selectedProject: 'INBOX',
      }));

      const { queryByTestId } = render(<Tasks />);
      expect(queryByTestId('tasks')).toBeTruthy();
      expect(queryByTestId('project-name').textContent).toBe('Inbox');
    });

    it('Renders a <Tasks /> component with a project title', () => {
      useSelectedProjectValue.mockImplementation(() => ({
        setSelectedProject: jest.fn(() => '1'),
        selectedProject: '1',
      }));

      const { queryByTestId } = render(<Tasks />);
      expect(queryByTestId('tasks')).toBeTruthy();
      expect(queryByTestId('project-name').textContent).toBe('🙌 THE OFFICE');
    });

    it('Renders a <Tasks /> component with a collated title', () => {
      useSelectedProjectValue.mockImplementation(() => ({}));
    });
  });
});
