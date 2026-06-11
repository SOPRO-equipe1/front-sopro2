/* eslint-disable react-refresh/only-export-components */
// src/context/Auth/AuthContext.jsx

import { createContext, useContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import { auth } from './firebase';

const AuthContext = createContext(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth deve ser usado dentro de <AuthProvider>');
  return ctx;
};

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUsuario(user);
      setCarregando(false);
    });
    return unsubscribe;
  }, []);

  const logout = async () => {
    await firebaseSignOut(auth);
  };

  const value = {
    usuario,
    carregando,
    logout,
    estaLogado: !!usuario,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;