import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { IndividualProject } from '../components/IndividualProject';

beforeEach(cleanup);

jest.mock('../firebase', () => ({
  firebase: {
    firestore: jest.fn(() => ({
      collection: jest.fn(() => ({
        doc: jest.fn(() => ({
          delete: jest.fn(() => Promise.resolve('Never mock firebase!')),
          update: jest.fn(),
        })),
      })),
    })),
  },
}));

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

describe('<IndividualProject />', () => {
  const project = {
    name: '🙌 THE OFFICE',
    projectId: '1',
    userId: 'Jx3X378u2QjdGeEQdasj',
    docId: 'michael-scott',
  };

  describe('Success', () => {
    it('Renders the <IndividualProject />', () => {
      const { getByText } = render(<IndividualProject project={project} />);
      expect(getByText('🙌 THE OFFICE')).toBeTruthy();
    });

    it('Renders the delete overlay and then deletes <IndividualProject /> using onClick', () => {
      const { queryByTestId, getByText } = render(
        <IndividualProject project={project} />,
      );

      fireEvent.click(queryByTestId('delete-project'));
      expect(
        getByText('Are you sure you want to delete this project?'),
      ).toBeTruthy();

      fireEvent.click(getByText('Delete'));
    });
  });
});
