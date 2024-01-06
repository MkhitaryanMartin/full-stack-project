import {useEffect} from 'react';
import { useAppDispatch} from './Hooks/redux';
import { fetchCheckAuth } from './store/reducers/auth/actionAuth';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { setLoader } from './store/reducers/auth/authReducer';
import './App.css';

function App() {

const dispatch = useAppDispatch()

  useEffect(() => {
    if (localStorage.getItem('token')) {
       dispatch(fetchCheckAuth())
    }else{
      dispatch(setLoader(false))
    }
}, [dispatch])

  return (
    <div className="App">
         <RouterProvider router={router}/>
    </div>
  );
}

export default App;
