import { useQuery } from "react-query";
import useAxios from "../../common/hook/useAxios";
import axios from 'axios';

const Example = () => {
    
    const fetcher = async () => {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        return response.data[0];
    };

    const { isLoading, error, data } = useQuery("example", fetcher, { retry: 0});

    if (isLoading) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message

    console.log(data, isLoading, error);

    return (
        <div>
            <h1>{data.id}</h1>
            <p>{data.name}</p>
            <strong>👀 {data.username}</strong>
            <strong>✨ {data.email}</strong>
            <strong>🍴 {data.phone}</strong>
        </div>
    );
}

export default Example;