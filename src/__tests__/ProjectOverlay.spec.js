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
    it('Renders the <ProjectOverlay />', () => {});
  });
  describe('Failure', () => {
    const showProjectOverlay = true;
  });
});
