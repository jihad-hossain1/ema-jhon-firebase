import React, { createContext, useEffect, useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import app from "../../firebase.config";

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true)

  function createUser(email, password) {
setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password);
  }
  const signIn = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password);
  };
  const logOut = () => {
    return signOut(auth);
  };
  // observer user auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false)
    });
    // stop observing while unmonting
    return () => {
      return unsubscribe();
    };
  }, []);
  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    logOut,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
