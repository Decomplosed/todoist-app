import React, { useState } from 'react';
import { useSelectedProjectValue, useProjectsValue } from '../context';

export const Projects = ({ activeValue = true }) => {
  const [active, setActive] = useState(activeValue);
  const { setSelectedProject } = useSelectedProjectValue();
};
