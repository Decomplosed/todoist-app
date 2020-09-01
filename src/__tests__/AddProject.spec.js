import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { AddProject } from '../components/AddProject';

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
        userId: 'jlIFXIwyAL3tzHMtzRbw',
        docId: 'arcade-fire',
      },
      {
        name: '🎵 MUSIC',
        projectId: '5',
        userId: 'jlIFXIwyAL3tzHMtzRbw',
        docId: 'bella-ciao',
      },
    ],
    setProjects: jest.fn(),
  })),
}));

jest.mock('../firebase', () => ({
  firebase: {
    firestore: jest.fn(() => ({
      collection: jest.fn(() => ({
        add: jest.fn(() => Promise.resolve('I am resolved!')),
      })),
    })),
  },
}));

beforeEach(cleanup);

describe('<AddProject />', () => {
  describe('Success', () => {
    it('Renders <AddProject />', () => {
      const { queryByTestId } = render(<AddProject />);
      expect(queryByTestId('add-project')).toBeTruthy();
    });

    it('Renders <AddProject /> and adds a project using onClick', () => {})
  });
});
