/* eslint-disable react-hooks/rules-of-hooks */
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Loading from '../pages/Loading';

const privateRoute = ({children}) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const location=useLocation()
    const {user,loading}=useAuth();

    if(loading){
        return <Loading/>
    }
    if(user){
        return children;
    }
    return (<Navigate to="/login" state={{from:location}} replace/>);
};

export default privateRoute;