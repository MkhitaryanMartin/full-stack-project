import { useState } from 'react';
import {Box, Drawer, Button} from '@mui/material';



type Anchor = 'top' | 'left' | 'bottom' | 'right';


const Aside = ({
    anchor="right"
}) => {
const [open, setOpen]= useState<boolean>(false)

    return (
        <div>
          <Button onClick={()=>setOpen(true)}>{"anchor"}</Button>
          <Drawer
            anchor={"left"}
            open={open}
            onClose={()=>setOpen(false)}
          >
           hay
          </Drawer>
       
    </div>
    );
};

export default Aside;