import { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import Header from './Header';
import Navigation from './Navigation';
const MainLayout = () => {
  const navigate = useNavigate();
  const [expandNav, setExpandNav] = useState(true);
  return (
    <div className="mainLayout">
      <Header expandNav={expandNav} setExpandNav={setExpandNav} toggleNav={() => setExpandNav(!expandNav)} />
      <main className="dashboardMainSection">
        <Navigation expandNav={expandNav} setExpandNav={setExpandNav} />
        <div className="dashboardBody">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
export default MainLayout;
