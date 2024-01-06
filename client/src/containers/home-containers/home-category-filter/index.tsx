import { useCallback, useEffect, useMemo, memo, ChangeEvent, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../Hooks/redux';
import { fetchProductCategory } from '../../../store/reducers/products/actionProducts';
import Slider from '../../../components/swiper';
import Select from '../../../components/select';
import { Box, Button, Grid, TextField } from '@mui/material';
import Loader from '../../../components/Loader';
import { resetFilter, setCategory, setSearch, setSort } from '../../../store/reducers/products/productsReducer';
import { debounce } from 'lodash';



const HomeCategory = () => {
  const dispatch = useAppDispatch();
  const { data, isLoading } = useAppSelector((state) => state.productCategory);
  const { category, sort} = useAppSelector(state => state.products);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    dispatch(fetchProductCategory())
  }, [])


  const categoryImg = data.map((el) => {
    return el.image
  })

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(e.target.value))
  }

  
  const callbacks = {
    onChategory: useCallback((id: string) => dispatch(setCategory(id)), [category]),
    onSort: useCallback((id: string) => dispatch(setSort(id)), [sort]),
    onChangeDebounce: useCallback(debounce(e => onSearch(e), 600), [onSearch]),
     onReset : useCallback(() => {
      if (ref.current !== null) {
        ref.current.value = ''; 
      }
      dispatch(resetFilter());
    }, [])
  }

  const options = {
    category: useMemo(() => ([{ id: "all", name: "ALL" }, ...data]), [data]),
    sort: useMemo(() => ([{ title: "Price increase", id: "11804", value: "1" }, { title: "Price decrease", id: "1180as4", value: "-1" }]), [sort])
  }

  return (
    isLoading ? <Loader /> : <Box width="100%" display="flex" flexDirection="column" height="600px" justifyContent="space-around" mb="30px">
      <Box sx={{maxHeight:"90%", minHeight:"200px"}}>
      <Slider imgList={categoryImg} pagination={{clickable:true}}/>
      </Box>
      <Grid container justifyContent="center" m="30px 0" spacing={2}>
  <Grid item xs={12} md={3}>
    <Select options={options.category} value={category} title="name" valueKey="id" onChange={callbacks.onChategory} />
  </Grid>
  <Grid item xs={12} md={3}>
    <Select options={options.sort} value={sort} onChange={callbacks.onSort} />
  </Grid>
  <Grid item xs={12} md={3}>
    <TextField inputRef={ref}  id="standard-search" placeholder='Search' type="search" variant="standard" onChange={callbacks.onChangeDebounce}/>
  </Grid>
  <Grid item xs={12} md={3}>
    <Button sx={{ height: "50px" }} onClick={callbacks.onReset}>Reset</Button>
  </Grid>
</Grid>
    </Box>
  );
};

export default memo(HomeCategory);