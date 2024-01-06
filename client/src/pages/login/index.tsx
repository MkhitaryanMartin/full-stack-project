import Form from '../../components/form';
import { loginSchema} from '../../constant/formValidate';
import { IAuth } from '../../models/IAuth';
import { useAppDispatch, useAppSelector} from '../../Hooks/redux';
import { fetchLogin} from '../../store/reducers/auth/actionAuth';
import { Box, Button, Typography} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import Loader from '../../components/Loader';
import "./style.scss";


const Login = () => {

const dispatch = useAppDispatch();
const {isAuth, loader, errorText}= useAppSelector(state => state.auth)
const navigate = useNavigate();
const location = useLocation()
const path = location?.state?.from || "/";
const inputList = useMemo(()=> ([{name: "email", type:"email"}, {name:"password", type:"password"}]),[]);

const handleSubmitLogin = (data:IAuth)=>{
    dispatch(fetchLogin({...data}))
   if(isAuth) navigate(path)
}

useEffect(()=>{
    if(isAuth) navigate(path)
},[isAuth])
console.log(path)
    return(
        <Box display="flex" justifyContent="center" p="5%">
       {
        loader ? <Loader/>: <Box>
            {errorText ? <Typography variant='h4' mb="60px" color="error">{errorText}</Typography>:""}
        <Form  schema={loginSchema} onSubmit={handleSubmitLogin} inputList={inputList} submit='Login' className='login'/>
        <Button><Link style={{color:"inherit"}} to="/registration">Registration</Link></Button>
        </Box>
       }
    </Box>
    )
};

export default Login;