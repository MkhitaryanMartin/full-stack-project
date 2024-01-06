import React from 'react';
import { Box } from '@mui/material';
import { NavLink } from 'react-router-dom';

type Props = {
    routes: { path: string, name: string }[]
}

const Nav = ({
    routes
}: Props) => {
    return (
        <Box
            component={"nav"}
            flexGrow={1}
            display={"flex"}
            sx={{display:"flex", justifyContent:"space-between"}}
        >
            {
                routes.map((link) => {
                    return <NavLink to={link.path}  key={link.path}>{link.name}</NavLink>
                })
            }
        </Box>
    );
};

export default Nav;