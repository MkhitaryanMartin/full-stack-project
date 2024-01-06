import React from 'react';
import {Grid } from '@mui/material';

type Props = {
  children: React.ReactNode;
}

const HomeCardLayout = ({ children }: Props) => {


  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={2}
    >
      {children}
    </Grid>

  );
};

export default HomeCardLayout;
