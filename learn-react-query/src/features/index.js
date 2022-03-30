import { Link } from "react-router-dom";

const Index = () => {
    return ( 
        <div>
            <h1><Link to="/example">Example</Link></h1>
            <h1><Link to="/clientState">ClientState</Link></h1>
            <h1><Link to="/pagination">Pagination</Link></h1>
        </div>
     );
}
 
export default Index;