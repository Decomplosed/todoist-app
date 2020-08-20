import React, { useState } from 'react';
import { FaRegListAlt, FaRegCalendarAlt } from 'react-icons/fa';
import moment from 'moment';
import { firebase } from '../firebase';
import { useSelectedProjectValue } from '../context';
import { ProjectOverlay } from './ProjectOverlay';
import { TaskDate } from './TaskDate';

export const AddTask = ({
  showAddTaskMain = true,
  showShouldMain = false,
  showQuickAddTask,
  setshowQuickAddTask,
}) => {
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
        <div
          className='add-task__shallow'
          data-testid='show-main-action'
          onClick={() => setShowMain(!showMain)}
        >
          <span className='add-task__plus'>+</span>
          <span className='add-task__text'>Add Task</span>
        </div>
      )}

      {(showMain || showQuickAddTask) && (
        <div className='add-task__main' data-testid='add-task-main'>
          {showQuickAddTask && (
            <>
              <div data-testid='quick-add-task'>
                <h2 className='header'>Quick Add Task</h2>
                <span
                  className='add-task__cancel-x'
                  data-testid='att-task-quick-cancel'
                  onClick={() => {
                    setShowMain(false);
                    setshowProjectOverlay(false);
                    setshowQuickAddTask(false);
                  }}
                >
                  x
                </span>
              </div>
            </>
          )}
          <ProjectOverlay
            setProject={setProject}
            showProjectOverlay={showProjectOverlay}
            setShowProjectOverlay={setshowProjectOverlay}
          />
          <TaskDate setTaskDate={setTaskDate} showTaskDate={showTaskDate} />
          <input
            type='text'
            className='add-task__content'
            data-testid='add-task-content'
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button
            type='button'
            className='add-task__submit'
            data-testid='add-task'
            onClick={() => addTask()}
          >
            Add Task
          </button>
          {!showQuickAddTask && (
            <span
              className='add-task-cancel'
              data-testid='add-task-main-cancel'
              onClick={() => {
                setShowMain(false);
                setshowProjectOverlay(false);
              }}
            >
              Cancel
            </span>
          )}
          <span
            className='add-task__project'
            data-testid='show-project-overlay'
            onClick={() => setshowProjectOverlay(!showProjectOverlay)}
          >
            <FaRegListAlt />
          </span>
          <span
            className='add-task__date'
            data-testid='show-task-date-overlay'
            onClick={() => setshowProjectOverlay(!showTaskDate)}
          >
            <FaRegCalendarAlt />
          </span>
        </div>
      )}
    </div>
  );
};
