import { collatedTasks } from '../constants';

export const getTitle = (projects, projectId) =>
  projects.find((project) => project.projectId === projectId);

export const collatedTasksExist = (selectedProject) =>
  collatedTasks.find((task) => task.key === selectedProject);
