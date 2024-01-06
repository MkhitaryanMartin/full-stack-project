import React, {useState} from 'react';
import {Card, CardActions, CardContent, Typography, Box,IconButton, Grid} from '@mui/material'
import Slider from '../swiper';
import "./style.scss";
import { useAppSelector } from '../../Hooks/redux';
import { IProduct } from '../../models/IProducts';
import { formatPrice, truncateText } from '../../utils';
import { IUserProduct } from '../../models/IUser';
import { Link, useNavigate } from 'react-router-dom';
import CreateIcon from '../icon/createIcon';
import { likeJson, starJson } from '../../assets/icon-json';


type Props = {
    product: IProduct;
    onlike: (id:number)=>void;
    userProducts: IUserProduct[] | [];
    onCart:(id:number)=>void;
    path: string ;
    isAuth?: boolean;
    handleBuy?:(e:React.MouseEvent<HTMLAnchorElement, MouseEvent>, id:number)=>void;
    pagination?: Record<string, boolean> | boolean
}

export default function MyCard({
    product,
    onlike,
    userProducts,
    onCart,
    path,
    handleBuy,
    isAuth,
    pagination={clickable: true}
}: Props) {
  const [like, setLike]= useState<boolean>(userProducts.some(obj => obj.id === product.id && obj.like === true));
  const [cart, setCart]= useState<boolean>(userProducts.some(obj => obj.id === product.id && obj.cart === true));
  const navigate = useNavigate()
   const {loader} = useAppSelector(state=> state.auth);

    const likeUpdate = (id: number) => {
      if(isAuth){
        setLike(!like);
      onlike(id); 
      }else{
        navigate(path)
      }
    };
    const cartUpdate = (id: number) => {
      if(isAuth){
        setCart(!cart);
      onCart(id); //
      }else{
        navigate(path)
      }
    };
    
    const onBuy:(e:React.MouseEvent<HTMLAnchorElement, MouseEvent>, id:number)=>void=(e, id)=>{
      if(handleBuy){
        handleBuy(e, id)
      }
    }
  return (
    loader ? <p>sda</p>: <>
    <Card sx={{ maxWidth: 345, width: "100%", minWidth:"280px",  height: 600}} className='card'>
     <Grid><Slider  imgList={product?.images} pagination={pagination}/></Grid>
     <Box display="flex" 
     justifyContent="space-between" 
     position="absolute"
      bottom="31%" 
      alignItems="center" 
      width="100%"
      padding="1%"
      sx={{  background:"rgba(0, 0, 0, 0.5)", zIndex:"100000"}}
      >
     <IconButton aria-label="add to favorites" onClick={()=>likeUpdate(product.id)}>
          <CreateIcon icon={likeJson} event='click' checked={like} size={40} className='like' color='white'/>
        </IconButton>
        <IconButton aria-label="add to favorites"  onClick={()=> cartUpdate(product.id)}>
          <CreateIcon icon={starJson} color={!cart ? "#FFFFFF": ""} checked={cart} size={40} event='click' className='star'/>
        </IconButton>
     </Box>
    <Box   position="absolute" bottom={0} sx={{ backgroundColor: "white", zIndex:"100"}}>
    <CardContent sx={{height:"128px"}}>
        <Typography gutterBottom variant="h6" component="div">
        {truncateText(product.title, 20)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {truncateText(product.description, 110)}
        </Typography>
      </CardContent>
      <Box display="flex" justifyContent="space-around" alignItems="center" mt="30px"> 
      <Typography  color="black" fontWeight={"bold"}>
          Price : {formatPrice(product.price)}
        </Typography>
        <CardActions>
        <Link to={path} onClick={(e)=>onBuy(e,product.id)} style={{color:"black"}}>Buy</Link>
      </CardActions>
      </Box>
    </Box>
    </Card>
    </>
  );
}

