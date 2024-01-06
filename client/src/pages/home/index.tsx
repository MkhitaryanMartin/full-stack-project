import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../Hooks/redux';
import { Box, Grid} from '@mui/material';
import HomeCategory from '../../containers/home-containers/home-category-filter';
import ProductCardList from '../../containers/product/product-card-list';
import HomePagination from '../../containers/home-containers/pagination';
import { fetchProducts} from '../../store/reducers/products/actionProducts';
import HomeCardLayout from '../../components/home-card-layout';
import MyCard from '../../components/card';


const Home = () => {
  const dispatch = useAppDispatch();
  const {page, category, sort, search} = useAppSelector((state) => state.products);


  useEffect(() => {
      dispatch(fetchProducts({page, sort, category, search}))
  }, [category,page, sort, search])

 return (
    <Box
      p="5% 1%"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
    <HomeCategory/>
     <HomeCardLayout>
      <ProductCardList  
      renderContent={(props)=>  <Grid 
      container
       justifyContent="center" 
       item xs={12} sm={6} md={4} lg={4} xl={3}
       key={props.key}>
        <MyCard {...props}/>
      </Grid>} />   
     </HomeCardLayout>
     <HomePagination/>
    </Box>
  );
};

export default Home;