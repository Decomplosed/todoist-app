import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { AddProject } from '../components/AddProject';

jest.mock('../context', () => ({
  useSelectedProjectValue: jest.fn(),
  useProjectsValue: jest.fn(() => ({
    projects: [],
  })),
}));
