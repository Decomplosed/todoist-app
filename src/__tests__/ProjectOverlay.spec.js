import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { ProjectOverlay } from '../components/ProjectOverlay';
import { useSelectedProjectValue } from '../context';

beforeEach(cleanup);

jest.mock('../context', () => ({
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

describe('<ProjectOverlay />', () => {
  describe('Success', () => {
    it('Renders the <ProjectOverlay /> and calls setShowProjectOverlay using onClick', () => {
      const showProjectOverlay = true;
      const setProject = jest.fn();
      const setShowProjectOverlay = jest.fn(() => !showProjectOverlay);

      const { queryByTestId } = render(
        <ProjectOverlay
          showProjectOverlay
          setProject={setProject}
          setShowProjectOverlay={setShowProjectOverlay}
        />,
      );
      expect(queryByTestId('project-overlay')).toBeTruthy();

      fireEvent.click(queryByTestId('project-overlay-action'));
      expect(setProject).toHaveBeenCalled();
    });

    it('Renders the <ProjectOverlay /> and calls setShowProjectOverlay using onKeyDown', () => {
      const showProjectOverlay = true;
      const setProject = jest.fn();
      const setShowProjectOverlay = jest.fn(() => !showProjectOverlay);

      const { queryByTestId } = render(
        <ProjectOverlay
          showProjectOverlay
          setProject={setProject}
          setShowProjectOverlay={setShowProjectOverlay}
        />,
      );
      expect(queryByTestId('project-overlay')).toBeTruthy();

      fireEvent.keyDown(queryByTestId('project-overlay-action'), {
        key: 'a',
        code: 65,
      });
      expect(setProject).not.toHaveBeenCalled();

      fireEvent.keyDown(queryByTestId('project-overlay-action'), {
        key: 'Enter',
        code: 13,
      });
      expect(setProject).toHaveBeenCalled();
    });
  });
  describe('Failure', () => {
    it('<ProjectOverlay /> does not render with any projects', () => {
      useProjectsValue.mockImplementation(() => ({
        projects: [],
      }));

      const { queryByTestId } = render(<ProjectOverlay showProjectOverlay />);
    });
  });
});
