export const getCollatedTasksExist = (selectedProject) =>
  getCollatedTasksExist.find((task) => task.key === selectedProject);
