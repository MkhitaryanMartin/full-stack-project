import Form from '../../components/form';
import { registerSchema } from '../../constant/formValidate';
import { IAuth, IRegister } from '../../models/IAuth';
import { useAppDispatch, useAppSelector } from '../../Hooks/redux';
import { fetchRegistration } from '../../store/reducers/auth/actionAuth';
import { Box, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { inputList } from './inputList';
import "./style.scss"
import Loader from '../../components/Loader';
import MyModal from '../../components/modal';
import { useEffect, useState } from 'react';

const Registration = () => {

    const dispatch = useAppDispatch();
    const { isAuth, errorText, loader, user } = useAppSelector(state => state.auth)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const navigate = useNavigate()

    const handleSubmitRegitration = (data: IRegister) => {
        dispatch(fetchRegistration({...data}))
    }

    const handleClose = () => {
        setIsOpen(false)
        navigate("/")  
    }
    useEffect(() => {
        if (isAuth) {
            setIsOpen(true)
        }
    }, [isAuth])
    return (
        <Box display="flex" justifyContent="center" p="5%">
            {
               false? <Loader /> : <Box>
                    {errorText ? <Typography variant='h4' mb={10} color="error">{errorText}</Typography> : null}
                    <Form schema={registerSchema} onSubmit={handleSubmitRegitration} inputList={inputList} submit='Registration' className='registr' />
                    <Button className='registr__button'><Link to="/login">Login</Link></Button>
                </Box>
            }
            {
               isOpen ? <MyModal handleClose={handleClose} isOpen={isOpen}>
                    <Typography variant='h6' mb={10} color="green">
                        Вы успешно зарегестрировались, на вашу электронную почту отправлена ​​силка переидите по ней чтоб завершить регистрацию</Typography>
                </MyModal> : null
            }
        </Box>
    )
};

export default Registration;