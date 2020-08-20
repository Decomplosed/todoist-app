import React from 'react';

export const TaskDate = ({ setTaskDate, showTaskDate, setShowTaskDate }) =>
  showTaskDate && (
    <div className='task-date' data-testid='task-date-overlay'>
      <ul className='task-date__list'>
        <li
          onClick={() => {
            setShowTaskDate(false);
            setTaskDate();
          }}
        ></li>
      </ul>
    </div>
  );
