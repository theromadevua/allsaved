import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import BootstrapNavbar from './modules/navbar/componets/NavBar/NavBar';
import { useUIStore } from './store/UIStore';
import { useAuth } from './hooks/useAuth';


const App: React.FC = () => {
  const setDarkMode = useUIStore(state => state.setDarkMode);
  const {fetchUser} = useAuth()

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') === 'dark';
    setDarkMode(storedTheme);

    fetchUser()
  }, [setDarkMode]);

  return (
      <div className="min-vh-100">
        <BootstrapNavbar />
        
        <main className="container-fluid py-4">
          <div className="row justify-content-center">
            <div className="col-12 col-xl-10">
              <Outlet />
            </div>
          </div>
        </main>
        
      </div>
  );
};

export default App;