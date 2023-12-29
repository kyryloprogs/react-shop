// Breadcrumbs.tsx
import { Icon, Typography } from '@mui/material';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icons from '../components/UtilsComponents/Icons';

const Breadcrumbs: React.FC = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);



    return (
        <div className='flex flex-row items-center ml-20 mb-3'>
            <Link to="/"><Typography variant='sideBarName'>Home</Typography></Link>
            {pathnames && <Typography variant='sideBarName'><Icons.SvgArrow/></Typography>}
            {pathnames.map((name, index) => {
                const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
                const isLast = index === pathnames.length - 1;
                return isLast ? (
                    <span key={name}><Typography variant='sideBarName'>{name}</Typography></span>
                ) : (
                    <span key={name}>
                        <Link to={routeTo}><Typography variant='sideBarName'>{name}</Typography></Link> <Icons.SvgArrow/>
                    </span>
                );
            })}
        </div>
    );
};

export default Breadcrumbs;