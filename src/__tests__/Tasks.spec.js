import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { Tasks } from '../components/Tasks';
import { useSelectedProjectValue } from '../context';

jest.mock('../context', () => ({
  useSelectedProjectValue: jest.fn(),
  useProjectsValue: jest.fn(() => ({})),
}));
