import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { ProjectOverlay } from '../components/ProjectOverlay';
import { useSelectedProjectValue } from '../context';

beforeEach(cleanup);

jest.mock('../context');
