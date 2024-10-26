import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const token = sessionStorage.getItem('authToken'); // Vérifie si un token est présent

  if (!token) {
    return <Navigate to="/" />; // Redirige vers la page d'authentification si non connecté
  }

  return children;
}
