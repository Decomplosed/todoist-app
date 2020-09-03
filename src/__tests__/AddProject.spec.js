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

    it('Renders <AddProject /> and adds a project using onClick', () => {
      const { queryByTestId } = render(<AddProject shouldShow />);
      expect(queryByTestId('add-project')).toBeTruthy();

      fireEvent.change(queryByTestId('project-name'), {
        target: { value: 'Best project in the world!' },
      });
      expect(queryByTestId('project-name').value).toBe(
        'Best project in the world!',
      );
      fireEvent.click(queryByTestId('add-project-submit'));
    });

    it('Hides the project overlay when cancelled using onClick', () => {
      const { queryByTestId, getByText } = render(<AddProject shouldShow />);

      expect(queryByTestId('add-project')).toBeTruthy();
      expect(queryByTestId('add-project-inner')).toBeTruthy();

      fireEvent.click(getByText('Cancel'));
      expect(queryByTestId('add-project')).toBeTruthy();
      expect(queryByTestId('add-project-inner')).toBeFalsy();
    });

    it('Hides the project overlay when cancelled using onKeyDown', () => {
      const { queryByTestId, getByText } = render(<AddProject shouldShow />);

      expect(queryByTestId('add-project')).toBeTruthy();
      expect(queryByTestId('add-project-inner')).toBeTruthy();

      fireEvent.keyDown(getByText('Cancel'), {
        key: 'a',
        code: 65,
      });
      expect(queryByTestId('add-project')).toBeTruthy();
      expect(queryByTestId('add-project-inner')).toBeTruthy();

      fireEvent.keyDown(getByText('Cancel'), {
        key: 'Enter',
        code: 13,
      });
      expect(queryByTestId('add-project')).toBeTruthy();
      expect(queryByTestId('add-project-inner')).toBeFalsy();
    });

    it('Hides the project overlay using onClick singular and reverse action', () => {
      const { queryByTestId } = render(<AddProject shouldShow />);

      expect(queryByTestId('add-project')).toBeTruthy();
      expect(queryByTestId('add-project-inner')).toBeTruthy();

      fireEvent.click(queryByTestId('add-project-action'));
      expect(queryByTestId('add-project')).toBeTruthy();
      expect(queryByTestId('add-project-inner')).toBeFalsy();
    });

    it('Hides the project overlay using onKeyDown singular and reverse action', () => {
      const { queryByTestId } = render(<AddProject shouldShow />);

      expect(queryByTestId('add-project')).toBeTruthy();
      expect(queryByTestId('add-project-inner')).toBeTruthy();

      fireEvent.keyDown(queryByTestId('add-project-action'), {
        key: 'a',
        code: 65,
      });
      expect(queryByTestId('add-project')).toBeTruthy();
      expect(queryByTestId('add-project-inner')).toBeTruthy();

      fireEvent.keyDown(queryByTestId('add-project-action'));
    });
  });
});
