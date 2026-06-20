import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [estaLogado, setEstaLogado] = useState(false);
  const [usuario, setUsuario] = useState(null);
  const [carregandoContexto, setCarregandoContexto] = useState(true);

  // No boot do app, verifica se já existe um Token válido salvo no navegador
  useEffect(() => {
    const token = localStorage.getItem('@Sopro:token');
    const email = localStorage.getItem('@Sopro:email');
    const nome = localStorage.getItem('@Sopro:nome');
    const foto = localStorage.getItem('@Sopro:foto');

    if (token && email) {
      setEstaLogado(true);
      setUsuario({
        email: email,
        displayName: nome || email.split('@')[0],
        photoURL: foto || null
      });
    }
    setCarregandoContexto(false);
  }, []);

  // Função de Login pura que o Header e as páginas chamam
  const login = async (email, nomeDoProvedor, fotoDoProvedor = null) => {
    if (fotoDoProvedor) {
      localStorage.setItem('@Sopro:foto', fotoDoProvedor);
    }
    setEstaLogado(true);
    setUsuario({
      email: email,
      displayName: nomeDoProvedor || email.split('@')[0],
      photoURL: fotoDoProvedor || null
    });
  };

  // Função de Logout limpa
  const logout = async () => {
    localStorage.clear();
    setEstaLogado(false);
    setUsuario(null);
    window.location.href = '/';
  };

  if (carregandoContexto) {
    return null; // Evita piscar a tela enquanto checa o localStorage
  }

  return (
    <AuthContext.Provider value={{ estaLogado, usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);