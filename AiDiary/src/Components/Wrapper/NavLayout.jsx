import React from 'react';

// Layout without Navbar for Authentication Routes (Login & Signup)
export const NoNavbarLayout = ({ children }) => {
  return <>{children}</>;
};

// Layout with Navbar for Protected Routes
export const WithNavbarLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};
