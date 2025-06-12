
import Navbar from './navbar';
import { AppInitialProps } from 'next/app';


const Layout: React.FC<React.PropsWithChildren<AppInitialProps>> = ({ children }) => {
    return (
        <div className='flex flex-col justify-between'>
            <div className='flex-1 justify-center items-center h-40 bg-gray-200' >
                <Navbar /> 
            </div>
            <div className='flex justify-center items-center bg-gray-200' >
                <div>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Layout;