import {memo} from "react";
import { Typography, Box, Button } from '@mui/material';
import { formatPrice } from '../../utils';
import FlexContainer from '../../components/flex-container';
import { IProduct } from '../../models/IProducts';
import { useCallback } from 'react';

type Count = number;
type Counter = (count: Count) => void;

type Props = {
  data: IProduct;
  increment: Counter;
  decrement: Counter;
  count: Count;
};

const ProductInfo = ({data, increment, decrement, count }: Props) => {
  const callbacks = {
    increment: useCallback(() => increment(count), [increment, count]),
    decrement: useCallback(() => decrement(count), [decrement, count]),
  };

  return (
    data && (
      <FlexContainer direction="column" minH="300px" sx={{p:"1%"}}>
        <Typography variant="h4">{data?.title}</Typography>
        <Typography variant="h6"  paragraph>{data?.description}</Typography>
        <FlexContainer jC="space-evenly" sx={{mt:"20px"}}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button variant="contained" onClick={callbacks.decrement}>-</Button>
            <Typography variant="h6" style={{ margin: '0 10px'}}>{count}</Typography>
            <Button variant="contained" onClick={callbacks.increment}>+</Button>
          </Box>
          <Typography variant="h6" >Price: {formatPrice(data?.price * count)}</Typography>
        </FlexContainer>
      </FlexContainer>
    )
  );
};

export default memo(ProductInfo);
