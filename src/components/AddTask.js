import React, { useState } from 'react';
import { FaRegListAlt, FaRegCalendarAlt } from 'react-icon/fa';
import moment from 'moment';
import { firebase } from '../firebase';
import { useSelectedProjectValue } from '../context';

export const AddTask = ({ showAddTaskMain = true, showShouldMain = false }) => (
  <p>Add Task</p>
);
