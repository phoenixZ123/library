import { useLocation } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import './layout.css'
import { Outlet } from 'react-router-dom';
import {SwitchTransition,CSSTransition} from 'react-transition-group';

export const Layout = () => {
  let location=useLocation();

  return (
    <div className="relative">
      <div className=" fixed z-10 ">
        <Navbar />
      </div>

      <SwitchTransition>
        <CSSTransition
          timeout={200}
          classNames={"fade"}
          key={location.pathname}
        >
          <div className="lg:ml-[170px] md:ml-10 w-[685px] absolute z-1 mt-10">
            <Outlet />
          </div>
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
}
