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
    } else if (projectId === 'NEXT_7') {
      collatedDate = moment().add(7, 'days').format('DD/MM/YYYY');
    }

    return (
      task &&
      projectId &&
      firebase
        .firestore()
        .collection('tasks')
        .add({
          archived: false,
          projectId,
          task,
          date: collatedDate || taskDate,
          userId: 'Jx3X378u2QjdGeEQdasj',
        })
        .then(() => {
          setTask('');
          setProject('');
          setShowMain('');
          setshowProjectOverlay(false);
        })
    );
  };

  return (
    <div
      className={showQuickAddTask ? 'add-task add-task__overlay' : 'add-task'}
      data-testid='add-task-comp'
    >
      {showAddTaskMain && (
        <div className='add-task__shallow' data-testid='show-main-action'></div>
      )}
    </div>
  );
};
