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
    setSelectedProject: jest.fn(() => 'INBOX')
  }))
}));
