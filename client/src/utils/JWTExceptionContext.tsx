// src/context/JWTExceptionContext.tsx
import React, { createContext, useState } from 'react';

export const JWTExceptionContext = createContext<any>(null);

export const JWTExceptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [jwtError, setJwtError] = useState<string | null>(null);

  const handleJwtError = (error: number) => {
    if (error === 401 || error === 405) {
      setJwtError(`Error: ${error === 401 ? 'Invalid token' : 'Token expired'}`);
    }
  };

  const clearJwtError = () => setJwtError(null);

  return (
    <JWTExceptionContext.Provider value={{ jwtError, handleJwtError, clearJwtError }}>
      {jwtError && <div className="jwt-error-overlay">{jwtError}</div>}
      {children}
    </JWTExceptionContext.Provider>
  );
};
