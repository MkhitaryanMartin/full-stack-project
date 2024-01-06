import {useState } from 'react';
import {useAppSelector } from '../../../Hooks/redux';
import ProductInfo from '../../../components/product-info';

const ProductDescription = () => {
    const {data} = useAppSelector((state) => state.product);
    const [count, setCount] = useState(0);
    const increment = (value: number) => {
        setCount(value + 1);
    };

    const decrement = (value: number) => {
        if (value > 0) {
            setCount(value - 1);
        }
    };

 return (

     data && <ProductInfo data={data} increment={increment} decrement={decrement} count={count}/>
    );
};

export default ProductDescription;


