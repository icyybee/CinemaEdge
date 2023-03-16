import { createContext, useState, useEffect } from 'react';
import { auth, createUserDocumentFromAuth } from '../utils/firebase/firebase.utils';

export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [userAuth, setUserAuth] = useState(null);
  const [userDocRef, setUserDocRef] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setUserAuth(user);

      if (user) {
        const docRef = await createUserDocumentFromAuth(user);
        setUserDocRef(docRef);
      } else {
        setUserDocRef(null);
      }
    });

    return () => unsubscribe();
  }, []);

  console.log('userAuth', userAuth);
  console.log('userDocRef', userDocRef);

  return (
    <UserContext.Provider value={{ userAuth, userDocRef }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;