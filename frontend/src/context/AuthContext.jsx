import React, { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../Firebase/Firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          setUser({ uid: currentUser.uid, ...userDoc.data() });
        } else {
          setUser(currentUser);
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  const updateCompletedAlgorithms = async (algorithm) => {
    if (user) {
      const userRef = doc(db, "users", user.uid);
      const newCompletedAlgorithms = {
        ...user.completedAlgorithms,
        [algorithm]: true,
      };
      await setDoc(
        userRef,
        { completedAlgorithms: newCompletedAlgorithms },
        { merge: true }
      );
      setUser({ ...user, completedAlgorithms: newCompletedAlgorithms });
    }
  };

  const updateProgress = async (algorithm, progress) => {
    if (user) {
      const userRef = doc(db, "users", user.uid);
      const finalProgress = progress === 99 ? 100 : progress;
      const newProgress = {
        ...user.progress,
        [algorithm]: finalProgress,
      };
      await setDoc(userRef, { progress: newProgress }, { merge: true });
      setUser({ ...user, progress: newProgress });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        logout,
        updateCompletedAlgorithms,
        updateProgress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
