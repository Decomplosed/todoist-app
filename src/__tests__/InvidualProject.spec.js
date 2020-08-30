import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { useProjectsValue } from '../context';
import { firebase } from '../firebase';
