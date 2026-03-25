import React, { useEffect } from 'react';
import Auth from '@/auth/Auth';
import useAppContext from '@/hooks/useAppContext';
import InnerLayout from '@/components/innerLayout';

export const Layout = ({ children }) => {
  const [auth, setAuth] = React.useState(false);

  const { userToken } = useAppContext();
  const authToken = Auth.token();

  useEffect(() => {
    if (userToken || authToken) {
      setAuth(true);
    }
    else {
      
    }
  }, []);

  return auth ? <InnerLayout>{children}</InnerLayout> : children;
};
