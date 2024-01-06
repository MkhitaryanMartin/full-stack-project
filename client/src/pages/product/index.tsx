import { useEffect } from 'react';
import {Box, Grid, Typography} from '@mui/material';
import Slider from '../../components/swiper';
import FlexContainer from '../../components/flex-container';
import ProductLikeBasket from '../../containers/product/product-like-basket';
import ProductDescription from '../../containers/product/product-description';
import { useAppDispatch, useAppSelector } from '../../Hooks/redux';
import { fetchProducts} from '../../store/reducers/products/actionProducts';
import MyCard from '../../components/card';
import ProductCardList from '../../containers/product/product-card-list';
import {SwiperSlide } from 'swiper/react';
import Sliders from '../../components/slider';
import { fetchComments } from '../../store/reducers/cooment/action';
import { fetchProduct } from '../../store/reducers/products/actionProducts';
import { useParams } from 'react-router-dom';
import Spinner from '../../components/spinner';
import ProductComents from '../../containers/product/product-coments';

const Product = () => {
  const {data, activeProduct} = useAppSelector((state) => state.product);
  const { user, isAuth, loader } = useAppSelector(state => state.auth);
  const {id} = useParams()
  const dispatch = useAppDispatch();

useEffect(() => {
    dispatch(fetchProducts({page:0, category: data?.category.id.toString(), sort:"1"}))
}, [data?.category.id])

useEffect(() => {
  const newId = activeProduct ? activeProduct : id
  if (newId) {
      dispatch(fetchProduct(+newId));
      dispatch(fetchComments({id:newId.toString()}))
  }
}, [id, user, activeProduct]);

return (
   <Box>
    <Grid container m="100px 0"  gap={10} minWidth={280}>
     <Grid item  container justifyContent="center" xs={12} md={4} mb={10}>
     {
      data && <Box width="80%">
        <Slider imgList={data?.images} />
      {isAuth ? <ProductLikeBasket/>: null}
       </Box>
      }
     </Grid>
     <Grid item  xs={12} md={6}><Spinner active={loader}><ProductDescription/></Spinner></Grid>
    </Grid>
    <Typography textAlign="start" variant='h5' m="20px 30px 30px 30px">Similar products</Typography>
    <ProductCardList Element={Sliders} renderContent={(props)=> <SwiperSlide key={props.key}><MyCard {...props} pagination={false}/></SwiperSlide>}/>
    <ProductComents user={user} isAuth={isAuth} id={id}/>
   </Box>
  );
};

export default Product;


