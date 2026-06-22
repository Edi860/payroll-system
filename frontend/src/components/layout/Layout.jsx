import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar';
import Navbar from '../Navbar';

const Layout = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`flex min-h-screen ${darkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
      <Sidebar darkMode={darkMode} />
      <div className="flex flex-1 flex-col">
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <main className="flex-1 p-6">
          <Outlet context={{ darkMode }} />
        </main>
      </div>
    </div>
  );
};

export default Layout;