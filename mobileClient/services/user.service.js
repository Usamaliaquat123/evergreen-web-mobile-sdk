/* eslint-disable no-unused-vars */
import { firebase } from '../config';

const userService = {
  userExists: (email) => {
    firebase.database().on('users', (snapshot) => {
      const data = snapshot.val();
      console.log('====================================');
      console.log(data);
      console.log('====================================');
      if (data.length > 0) return false;
      return true;
    });
  },
  getAllUsers: () => {
    firebase.database().ref('users', (snapdata) => snapdata.val());
  },
};
export default userService;
