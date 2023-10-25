import { useLocation } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import "./layout.css";
import { Outlet } from "react-router-dom";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import { useTheme } from "../hooks/useTheme";
import { useEffect } from "react";

export const Layout = () => {
  let location = useLocation();
  let { isDark } = useTheme();

  useEffect(() => {
    let body = document.body;
    if (isDark) {
      body.classList.add("bg-dbg");
    } else {
      body.classList.remove("bg-dbg");
    }
  }, [isDark]);
  return (
    <div className={` ${isDark ? "bg-dbg" : "bg-white"} `}>
      <Navbar />

      <SwitchTransition>
        <CSSTransition
          timeout={200}
          classNames={"fade"}
          key={location.pathname}
        >
          <Outlet />
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
};
