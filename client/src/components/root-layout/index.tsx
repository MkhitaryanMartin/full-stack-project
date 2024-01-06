import {useLocation, useOutlet } from "react-router-dom";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import {routes} from "../../router/index";
import Header from "../header";
import "./style.scss";

export default function Layout() {
    const location = useLocation()
    const currentOutlet = useOutlet()
    const { nodeRef } =
      routes.find((route) => route.path === location.pathname) ?? {}
    return (
      <>
  
        <div >
          <Header />
          <SwitchTransition>
            <CSSTransition
              key={location.pathname}
              nodeRef={nodeRef}
              timeout={300}
              classNames="page"
              unmountOnExit
            >
              {(state) => (
                <div ref={nodeRef} className="page">
                  <main>{currentOutlet}</main>
                </div>
              )}
            </CSSTransition>
          </SwitchTransition>
        </div>
      
      </>
    )
  }