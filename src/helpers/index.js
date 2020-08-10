import { collatedTasks } from '../constants';

export const getCollatedTasksExist = (selectedProject) =>
  getCollatedTasks.find((task) => task.key === selectedProject);
