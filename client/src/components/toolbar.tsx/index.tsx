import { Toolbar, IconButton,  } from "@mui/material";
import MenuIcon from "../icon/menuIcon";
import Nav from "../nav";
import CreateIcon from "../icon/createIcon";
import { basketJson, userJson } from "../../assets/icon-json";


type Props ={
    routes: {path:string, name:string}[];
    isOpen : boolean;
    handleToogle: ()=> void;
    isAuth: boolean;
    handleNavigate: ()=> void;
    handleOpenAside: ()=> void;
    isActivated: boolean | undefined
}

const MyToolbar = ({
    routes, 
    isOpen, 
    handleToogle, 
    isAuth, 
    handleNavigate,
    handleOpenAside,
    isActivated
    
}: Props) => {
    return (
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', backgroundColor:"gray",}}>
        {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
        >
            <MenuIcon isOpen={isOpen} handleToggle={handleToogle}/>
        </IconButton> */}
        <Nav routes={routes}/>
        {
            isAuth && isActivated ? <>
            <IconButton onClick={handleNavigate}>
          <CreateIcon  icon={basketJson}/>
        </IconButton>
            </>
        :null
        }
        {
            isAuth ? <IconButton onClick={handleOpenAside}>
            <CreateIcon  icon={userJson}/>
          </IconButton>: null
        }
    </Toolbar>
    );
};

export default MyToolbar;