import { useAppDispatch, useAppSelector} from '../../Hooks/redux';
import { createOnCart, createOnLike } from '../../features/products/productActions';
import MyCard from '../../components/card';
import { Box, Typography, Grid } from '@mui/material';
import Store from "./store"


const Basket = () => {

const {user, isAuth} = useAppSelector((state)=> state.auth)
const {data} = useAppSelector((state)=> state.products)
const dispatch = useAppDispatch()
const newData = data.filter(item => user?.products?.some(elem => elem.id === item.id && elem.cart === true))
const userProducts = user?.products ? user.products : []
const onlike = createOnLike(dispatch)
const onCart = createOnCart(dispatch)

 return (
        <Box display="flex" flexWrap="wrap" justifyContent="space-around" pt={10}>
            {
               !newData.length ? <Box display="flex" justifyContent="center" sx={{ height: "800px", width: "100%"}}>
               <Store /> 
             </Box>
              : newData.map((product)=>{
                return <MyCard
                onCart={onCart}
                onlike={onlike}
                product={product}
                key={product.id}
                userProducts= {userProducts}
                path={`/product/${product.id}`}
                isAuth={isAuth}
                />
               })
            }
        </Box>
    );
};

export default Basket;