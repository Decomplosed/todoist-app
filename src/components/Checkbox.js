import { firebase } from '../firebase';

export const Checkbox = ({ id }) => {
  firebase.firestore().collection('tasks').doc(id).update({ archived: true });
};
