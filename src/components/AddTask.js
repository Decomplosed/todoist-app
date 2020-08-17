import React, { useState } from 'react';
import { FaRegListAlt, FaRegCalendarAlt } from 'react-icon/fa';
import moment from 'moment';
import { firebase } from '../firebase';
import { useSelectedProjectValue } from '../context';

export const AddTask = ({ showAddTaskMain = true, showShouldMain = false }) => {
  const [task, setTask] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [project, setProject] = useState('');
  const [showMain, setShowMain] = useState(showShouldMain);
  const [showProjectOverlay, setshowProjectOverlay] = useState(false);
  const [showTaskDate, setshowTaskDate] = useState(false);

  const { selectedProject } = useSelectedProjectValue();

  const addTask = () => {
    const projectId = project || selectedProject;
    let collatedDate = '';

    if (projectId === 'TODAY') {
      collatedDate = moment().format('DD/MM/YYYY');
    }
  };
};
