import React from 'react';
import { FaSpaceShuttle } from 'react-icons/fa';

export const TaskDate = ({ setTaskDate, showTaskDate, setShowTaskDate }) =>
  showTaskDate && (
    <div className='task-date' data-testid='task-date-overlay'>
      <ul className='task-date__list'>
        <li
          onClick={() => {
            setShowTaskDate(false);
            setTaskDate(moment().format('DD/MM/YYYY'));
          }}
        >
          <span>
            <FaSpaceShuttle />
          </span>
        </li>
      </ul>
    </div>
  );
