import {useMemo, memo} from 'react';
import { useAppDispatch, useAppSelector } from '../../../Hooks/redux';
import { createOnCart, createOnLike } from '../../../features/products/productActions';
import ProductLikeBasketBlock from '../../../components/prodcut-like-basket-block';

const ProductLikeBasket = () => {
    const data = useAppSelector((state) => state.product.data);
    const { user} = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();
    
    const onLike = createOnLike(dispatch);
    const onCart = createOnCart(dispatch);

    const likeUpdate = (id: number) => {
        onLike(id);
    };

    const cartUpdate = (id: number) => {
        onCart(id);
    };

    const like = useMemo(() => user?.products.some(obj => obj.id === data?.id && obj.like === true), [user?.products, likeUpdate]);
    const basket = useMemo(() => user?.products.some(obj => obj.id === data?.id && obj.cart === true), [user?.products, cartUpdate]);
    return (
        data && <ProductLikeBasketBlock id={data.id} likeCount={data.like} like={like} basket={basket} cartUpdate={cartUpdate} likeUpdate={likeUpdate}/>
      );
    };

export default memo(ProductLikeBasket);


