import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Loader = () => {
    return (
        <Box sx={{ display: 'flex', justifyContent:"center", alignItems:"center", height:"90vh", width:"100vw",backgroundColor: 'rgba(128, 128, 128, 0.1)'}}>
            <CircularProgress />
        </Box>
    );
};

export default Loader;