import {createContext} from 'react';

const userContext = createContext({
  currentUser: {},
  setCurrentUser: (userData) => {
  },
});

export default userContext
