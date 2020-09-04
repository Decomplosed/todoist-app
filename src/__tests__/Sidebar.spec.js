import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { Sidebar } from '../components/layout/Sidebar';

beforeEach(cleanup);

jest.mock('../context', () => ({
  useSelectedProjectValue: jest.fn(() => ({
    setSelectedProject: jest.fn(() => 'INBOX'),
  })),
  useProjectsValue: jest.fn(() => ({
    setProjects: jest.fn(),
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

describe('<Sidebar />', () => {
  describe('Success', () => {
    it('Renders the <Sidebar />', () => {
      const { queryByTestId } = render(<Sidebar />);
      expect(queryByTestId('sidebar')).toBeTruthy();
    });

    it('Changes the active project to inbox in collated tasks', () => {
      const { queryByTestId } = render(<Sidebar />);
      expect(queryByTestId('sidebar')).toBeTruthy();

      fireEvent.click(queryByTestId('inbox-action'));
      fireEvent.keyDown(queryByTestId('inbox-action'), {
        key: 'a',
        code: 65,
      });
      fireEvent.keyDown(queryByTestId('inbox-action'), {
        key: 'Enter',
        code: 13,
      });

      expect(queryByTestId('inbox').classList.contains('active')).toBeTruthy();
      expect(queryByTestId('today').classList.contains('active')).toBeFalsy();
      expect(queryByTestId('next_7').classList.contains('active')).toBeFalsy();
    });

    it('Changes the active project to today in collated tasks', () => {
      const { queryByTestId } = render(<Sidebar />);
      expect(queryByTestId('sidebar')).toBeTruthy();
    });
  });
});
