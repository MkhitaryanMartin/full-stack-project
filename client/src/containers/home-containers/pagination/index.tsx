import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../Hooks/redux';
import {Pagination} from '@mui/material';
import { setPage } from '../../../store/reducers/products/productsReducer';
import { useTheme, useMediaQuery } from '@mui/material';



const HomePagination = () => {
    const dispatch = useAppDispatch();
    const {totalCount, page} = useAppSelector((state) => state.products);
    const count =Math.ceil((totalCount)/ 10);
    const currentPage = page === 0 ? 1 : (page / 10) + 1

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
       const page =( value - 1) * 10
        dispatch(setPage(page))
      }
      const theme = useTheme();
      const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    return (
        <Pagination size={isSmallScreen ? "small" : "medium"}  sx={{mt:"56px"}} count={count} color="secondary" onChange={handleChange} page={currentPage}/>
    );
};

export default HomePagination;