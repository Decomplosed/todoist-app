import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { AddTask } from '../components/AddTask';
import { firebase } from '../firebase';
import { useSelectedProjectValue } from '../context';

beforeEach(cleanup);

jest.mock('../context', () => ({
  useSelectedProjectValue: jest.fn(() => ({ selectedProject: 1 })),
  useProjectsValue: jest.fn(),
}));

jest.mock('../firebase', () => ({
  firebase: {
    firestore: jest.fn(() => ({
      collection: jest.fn(() => ({
        add: jest.fn(() => Promise.resolve('Never mock firebase')),
      })),
    })),
  },
}));

describe('<AddTask />', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Success', () => {
    it('Renders the <AddTask />', () => {
      const { queryByTestId } = render(<AddTask />);
      expect(queryByTestId('add-task-comp')).toBeTruthy();
    });

    it('Renders the <AddTask /> quick overlay', () => {
      const setShowQuickAddTask = jest.fn();
      const { queryByTestId } = render(
        <AddTask
          showAddTaskMain
          showShouldMain={false}
          showQuickAddTask
          setShowQuickAddTask
        />,
      );

      expect(queryByTestId('quick-add-task')).toBeTruthy();
      expect(setShowQuickAddTask.toHaveBeenCalled(1));
    });
  });
});
