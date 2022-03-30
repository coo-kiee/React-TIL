import { useQuery, useQueryClient } from "react-query";
import axios from 'axios';
import PrevBtn from "../../components/PrevBtn";

const Example = () => {
    
    const fetcher = async () => {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        return response.data[0];
    };

    const { isLoading, error, data } = useQuery("example", async () => await fetcher());
    
    console.log(data);

    // Client
    const queryClient = useQueryClient();
    
    // console.log('queryClient',queryClient);
    console.log('Example, key: example',queryClient.getQueryData('example'));
    console.log('Example, key: test',queryClient.getQueryData('test'));

    if (isLoading) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message

    // console.log(data, isLoading, error);

    return (
        <div>
            <h1>{data.id}</h1>
            <p>{data.name}</p>
            <strong>👀 {data.username}</strong>
            <strong>✨ {data.email}</strong>
            <strong>🍴 {data.phone}</strong>
            <PrevBtn />
        </div>
    );
}

export default Example;