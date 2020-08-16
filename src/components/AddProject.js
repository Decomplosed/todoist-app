import React, { useState } from 'react';
import { firebase } from '../firebase';
import { generatePushId } from '../helpers';
import { useProjectsValue } from '../context';

export const AddProject = ({ shouldShow = false }) => {
  const [show, setShow] = useState(shouldShow);
  const [projectName, setProjectName] = useState('');

  const projectId = generatePushId();
  const { setProjects } = useProjectsValue();

  const addProject = () =>
    projectName &&
    firebase
      .firestore()
      .collection('projects')
      .add({ projectId, name: projectName, userId: 'Jx3X378u2QjdGeEQdasj' })
      .then(() => {
        setProjects([]);
        setProjectName('');
        setShow(false);
      });
};
