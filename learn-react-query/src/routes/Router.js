import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Index from '../features';
import ClientState from '../features/clientState-fail';
import Example from '../features/example';
import Mutation from '../features/mutation';
import Pagination from '../features/pagination';

const Routers = () => {
    return ( 
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Index/>} />
                <Route path='/pagination' element={<Pagination/>} />
                <Route path='/example' element={<Example/>} />
                <Route path='/clientState' element={<ClientState />} />
                <Route path='/mutation' element={<Mutation />} />
            </Routes>
        </BrowserRouter>
     );
}
 
export default Routers;