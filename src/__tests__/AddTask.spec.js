import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { AddTask } from '../components/AddTask';
import { firebase } from '../firebase';
import { useSelectedProjectValue, useProjectsValue } from '../context';

beforeEach(cleanup);

jest.mock('../context', () => ({
  useSelectedProjectValue: jest.fn(() => ({ selectedProject: 1 })),
  useProjectsValue: jest.fn(() => ({ projects: [] })),
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
    });

    it('Renders the <AddTask /> main showable using onClick', () => {
      const { queryByTestId } = render(<AddTask showAddTaskMain />);

      fireEvent.click(queryByTestId('show-main-action'));
      expect(queryByTestId('add-task-main')).toBeTruthy();
    });

    it('Renders the <AddTask /> main showable using keyDown', () => {
      const { queryByTestId } = render(<AddTask showAddTaskMain />);

      fireEvent.keyDown(queryByTestId('show-main-action'), {
        key: 'a',
        code: 65,
      });
      expect(queryByTestId('add-task-main')).toBeFalsy();

      fireEvent.keyDown(queryByTestId('show-main-action'), {
        key: 'Enter',
        code: 13,
      });
      expect(queryByTestId('add-task-main')).toBeTruthy();
    });

    it('Renders the <AddTask /> project overlay when using onClick', () => {
      const { queryByTestId } = render(
        <AddTask showAddTaskMain shouldShowMain />,
      );

      fireEvent.click(queryByTestId('show-main-action'));
      expect(queryByTestId('add-task-main')).toBeTruthy();

      fireEvent.click(queryByTestId('show-project-overlay'));
      expect(queryByTestId('project-overlay')).toBeTruthy();
    });

    it('renders the <AddTask /> project overlay when using onKeyDown', () => {
      const { queryByTestId } = render(<AddTask showAddTaskMain />);

      fireEvent.keyDown(queryByTestId('show-main-action'), {
        key: 'a',
        code: 65,
      });
      expect(queryByTestId('add-task-main')).toBeFalsy();

      fireEvent.keyDown(queryByTestId('show-main-action'), {
        key: 'Enter',
        code: 13,
      });
      expect(queryByTestId('add-task-main')).toBeTruthy();

      fireEvent.keyDown(queryByTestId('show-project-overlay'), {
        key: 'a',
        code: 65,
      });
      expect(queryByTestId('project-overlay')).toBeFalsy();

      fireEvent.keyDown(queryByTestId('show-project-overlay'), {
        key: 'Enter',
        code: 13,
      });
      expect(queryByTestId('project-overlay')).toBeTruthy();
    });

    it('Renders the <AddTask /> task date overlay using onKeyDown', () => {
      const { queryByTestId } = render(<AddTask showAddTaskMain />);

      fireEvent.click(queryByTestId('show-main-action'));
      expect(queryByTestId('add-task-main')).toBeTruthy();

      fireEvent.click(queryByTestId('show-task-date-overlay'));
      expect(queryByTestId('task-date-overlay')).toBeTruthy();
    });

    it('Hides the <AddTask /> main when cancel is clicked using onClick', () => {
      const { queryByTestId } = render(<AddTask showAddTaskMain />);

      fireEvent.click(queryByTestId('show-main-action'));
      expect(queryByTestId('add-task-main')).toBeTruthy();

      fireEvent.click(queryByTestId('add-task-main-cancel'));
      expect(queryByTestId('add-task-main')).toBeFalsy();
    });

    it('Hides the <AddTask /> main when cancel is clicked using onKeyDown', () => {
      const { queryByTestId } = render(<AddTask showAddTaskMain />);

      fireEvent.keyDown(queryByTestId('show-main-action'), {
        key: 'a',
        code: 65,
      });
      expect(queryByTestId('add-task-main')).toBeFalsy();

      fireEvent.keyDown(queryByTestId('show-main-action'), {
        key: 'Enter',
        code: 13,
      });
      expect(queryByTestId('add-task-main')).toBeTruthy();

      fireEvent.keyDown(queryByTestId('add-task-main-cancel'), {
        key: 'a',
        code: 65,
      });
      expect(queryByTestId('add-task-main')).toBeTruthy();

      fireEvent.keyDown(queryByTestId('add-task-main-cancel'), {
        key: 'Enter',
        code: 13,
      });
      expect(queryByTestId('add-task-main')).toBeFalsy();
    });

    it('Renders the <AddTask /> for quick add task and then clicks cancel using onClick', () => {
      const showQuickAddTask = true;
      const setShowQuickAddTask = jest.fn(() => !showQuickAddTask);
      const { queryByTestId } = render(
        <AddTask setShowQuickAddTask={setShowQuickAddTask} showQuickAddTask />,
      );

      fireEvent.click(queryByTestId('show-main-action'));
      expect(queryByTestId('add-task-main')).toBeTruthy();

      fireEvent.click(queryByTestId('add-task-quick-cancel'));
      expect(setShowQuickAddTask).toHaveBeenCalled();
    });

    it('Renders the <AddTask /> for quick add task and then clicks cancel using onKeyDown', () => {
      const showQuickAddTask = true;
      const setShowQuickAddTask = jest.fn(() => !showQuickAddTask);
      const { queryByTestId } = render(
        <AddTask setShowQuickAddTask={setShowQuickAddTask} showQuickAddTask />,
      );

      fireEvent.keyDown(queryByTestId('show-main-action'), {
        key: 'a',
        code: 65,
      });
      expect(setShowQuickAddTask).not.toHaveBeenCalled();

      fireEvent.keyDown(queryByTestId('add-task-quick-cancel'), {
        key: 'Enter',
        code: 13,
      });
      expect(setShowQuickAddTask).toHaveBeenCalled();
    });

    it('Renders the <AddTask /> and adds a task to the inbox', () => {
      useSelectedProjectValue.mockImplementation(() => ({
        selectedProject: 'INBOX',
      }));
      const showQuickAddTask = true;
      const setShowQuickAddTask = jest.fn(() => !showQuickAddTask);
      const { queryByTestId } = render(
        <AddTask
          showQuickAddTask={showQuickAddTask}
          setShowQuickAddTask={setShowQuickAddTask}
        />,
      );

      fireEvent.click(queryByTestId('show-main-action'));
      expect(queryByTestId('add-task-content')).toBeTruthy();

      fireEvent.change(queryByTestId('add-task-content'), {
        target: { value: 'I am a new task and I am amazing!' },
      });
      expect(queryByTestId('add-task-content').value).toBe(
        'I am a new task and I am amazing!',
      );

      fireEvent.click(queryByTestId('add-task'));
      expect(setShowQuickAddTask).toHaveBeenCalled();
    });

    it('Renders the <AddTask /> and adds a task to TODAY', () => {
      useSelectedProjectValue.mockImplementation(() => ({
        selectedProject: 'TODAY',
      }));
      const showQuickAddTask = true;
      const setShowQuickAddTask = jest.fn(() => !showQuickAddTask);
      const { queryByTestId } = render(
        <AddTask
          showQuickAddTask={showQuickAddTask}
          setShowQuickAddTask={setShowQuickAddTask}
        />,
      );

      fireEvent.click(queryByTestId('show-main-action'));
      expect(queryByTestId('add-task-content')).toBeTruthy();

      fireEvent.change(queryByTestId('add-task-content'), {
        target: { value: 'I am a new task and I am amazing!' },
      });
      expect(queryByTestId('add-task-content').value).toBe(
        'I am a new task and I am amazing!',
      );

      fireEvent.click(queryByTestId('add-task'));
      expect(setShowQuickAddTask).toHaveBeenCalled();
    });

    it('Renders the <AddTask /> and adds a task to NEXT_7', () => {
      useSelectedProjectValue.mockImplementation(() => ({
        selectedProject: 'NEXT_7',
      }));
      const showQuickAddTask = true;
      const setShowQuickAddTask = jest.fn(() => !showQuickAddTask);
      const { queryByTestId } = render(
        <AddTask
          showQuickAddTask={showQuickAddTask}
          setShowQuickAddTask={setShowQuickAddTask}
        />,
      );

      fireEvent.click(queryByTestId('show-main-action'));
      expect(queryByTestId('add-task-content')).toBeTruthy();

      fireEvent.change(queryByTestId('add-task-content'), {
        target: { value: 'I am a new task and I am amazing!' },
      });
      expect(queryByTestId('add-task-content').value).toBe(
        'I am a new task and I am amazing!',
      );

      fireEvent.click(queryByTestId('add-task'));
      expect(setShowQuickAddTask).toHaveBeenCalled();
    });

    it('Renders the <AddTask /> and adds a task with a task date', () => {
      useSelectedProjectValue.mockImplementation(() => ({
        selectedProject: '1',
      }));
      const { queryByTestId } = render(<AddTask showMain />);

      fireEvent.click(queryByTestId('show-main-action'));
      expect(queryByTestId('add-task-content')).toBeTruthy();
      expect(queryByTestId('add-task-main')).toBeTruthy();

      fireEvent.change(queryByTestId('add-task-content'), {
        target: { value: 'I am the most amazing task ever!' },
      });
      expect(queryByTestId('add-task-content').value).toBe(
        'I am the most amazing task ever!',
      );

      fireEvent.click(queryByTestId('show-task-date-overlay'));
      expect(queryByTestId('task-date-overlay')).toBeTruthy();

      fireEvent.click(queryByTestId('task-date-tomorrow'));
      expect(queryByTestId('task-date-overlay')).toBeFalsy();

      fireEvent.click(queryByTestId('add-task'));
    });
  });
});
