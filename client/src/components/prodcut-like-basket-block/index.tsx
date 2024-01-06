import React from 'react';
import FlexContainer from '../flex-container';
import { Typography, IconButton, Grid } from '@mui/material';
import CreateIcon from '../icon/createIcon';
import { likeJson, starJson } from '../../assets/icon-json';


type Props =  {
    likeUpdate: (id: number)=>void;
    cartUpdate: (id: number)=>void;
    likeCount?: number;
    like?: boolean;
    basket?: boolean;
    id: number
}

const ProductLikeBasketBlock = ({
    likeUpdate,
    cartUpdate,
    likeCount, 
    like,
    basket,
    id
}: Props) => {
    return (
        <Grid container sx={{mt:"40px"}}>
      <Grid item xs={6}>
      <Typography variant='h6'>like:  {likeCount ? likeCount : 0}</Typography>
        <IconButton
          onClick={() => likeUpdate(id)}
          sx={{'&:hover': { backgroundColor: 'lightgrey' } }}
        >
          <CreateIcon icon={likeJson} event='click' checked={like} size={40} className='like' />
        </IconButton>
      </Grid>
   <Grid item xs={6}>
   <Typography variant='h6'>Basket</Typography>
        <IconButton
          onClick={() => cartUpdate(id)}
          sx={{ background: "black", '&:hover': { backgroundColor: 'darkgrey' } }}
        >
          <CreateIcon icon={starJson} checked={basket} size={40} event='click' className='star' />
        </IconButton>
   </Grid>
      </Grid>
    );
};

export default ProductLikeBasketBlock;