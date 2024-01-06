import { Box, AppBar, Drawer, Button, Avatar, Typography } from '@mui/material';
import { headerRoutes } from '../../router';
import { useAppDispatch, useAppSelector } from '../../Hooks/redux';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MyToolbar from '../toolbar.tsx';
import { fetchLogout } from '../../store/reducers/auth/actionAuth';


export default function Header() {
    const { isAuth, user } = useAppSelector(state => state.auth);
    const routes = isAuth ? headerRoutes.filter(link => link.path !== "/login") : headerRoutes;
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const navigate = useNavigate();
    const [open, setOpen] = useState<boolean>(false);
    const dispatch = useAppDispatch();


    const handleNavigate = () => {
        navigate("/basket")
    }
    const handleToogle = () => {
        setIsOpen(!isOpen)
    }
    const handleOpenAside = () => {
        setOpen(true)
    }

    const handleCloseAside = () => {
        setOpen(false)
    }
    const handleLogout = () => {
        handleCloseAside()
        dispatch(fetchLogout())

    }

    return (
        <Box sx={{ flexGrow: 1, mb:"50px" }} component="header">
            <AppBar position="fixed">
                <MyToolbar
                    routes={routes}
                    isOpen={isOpen}
                    handleNavigate={handleNavigate}
                    handleToogle={handleToogle}
                    isAuth={isAuth}
                    isActivated={user?.isActivated}
                    handleOpenAside={handleOpenAside}
                />
            </AppBar>
            <Drawer
                anchor={"right"}
                open={open}
                onClose={handleCloseAside}
            >
                <Box
                    component="aside"
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-around"
                    alignItems="center"
                    minHeight={400}
                    p="25px 10px"
                >
                    <Avatar alt="Remy Sharp" src={user?.photo} sx={{ width: 100, height: 100 }} />
                    <Typography  variant='h6'>Email: {user?.email} </Typography>
                    <Typography variant='h6'>Name: {user?.firstName} {user?.lastName} </Typography>
                    <Typography variant='h6'>Phone: {user?.phone}</Typography>
                    <Button onClick={handleLogout}>Exit</Button>
                </Box>
            </Drawer>
        </Box>
    );
}
