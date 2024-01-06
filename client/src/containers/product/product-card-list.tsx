import React, {useState, ReactElement } from 'react';
import { useAppDispatch, useAppSelector } from '../../Hooks/redux';
import { createOnCart, createOnLike } from '../../features/products/productActions';
import MyModal from '../../components/modal';
import Loader from '../../components/Loader';
import { useLocation } from 'react-router-dom';
import { setActiveProduct} from '../../store/reducers/products/productReducer';

type Props = {
    renderContent: (props: any) => ReactElement; 
    Element?: React.ElementType;
  };

const ProductCardList = ({renderContent, Element=React.Fragment}: Props) => {
    const dispatch = useAppDispatch();
    const { data,isLoading } = useAppSelector((state) => state.products);
    const { user, isAuth, loader } = useAppSelector((state => state.auth))
    const userProducts = user?.products ? user.products : [];
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const {pathname} = useLocation()

 
    const handleBuy = (e:React.MouseEvent<HTMLAnchorElement, MouseEvent>, id: number) => {
        if(pathname.includes('product/')){
            dispatch(setActiveProduct(id))
            e.preventDefault()

        }else{
            dispatch(setActiveProduct(null))
        }
        if (!user?.isActivated && isAuth) {
            setIsOpen(true)
            
        }
    }

    const handleClose = () => {
        setIsOpen(false)
    }

    const onlike = createOnLike(dispatch)
    const onCart = createOnCart(dispatch)
    return (
      <>
        <Element>
            {
                loader || isLoading ? <Loader /> : data && data.map((product) => {
                    const path = !user?.isActivated && isAuth ? "#" : `/product/${product.id}`
                    return renderContent({onlike, onCart, key:product._id, userProducts, product, path, handleBuy, isAuth})
                })
            }
        </Element>
        <MyModal isOpen={isOpen} handleClose={handleClose}>
        silkov anci or bace
    </MyModal>
      </>
    );
};

export default ProductCardList;