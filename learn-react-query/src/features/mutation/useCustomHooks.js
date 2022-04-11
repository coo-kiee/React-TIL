import { useState } from "react";
import { useQuery } from "react-query";
import PrevBtn from "../../components/PrevBtn";
import { useMutate } from "../../utills/useMutate";
import useAxios from "../../utills/useAxios";

const Mutation = () => {

    const [text, setText] = useState('');
    const url = 'https://7higb.sse.codesandbox.io/api/data1';

    const { status, data, error, isFetching } = useQuery(['todos'], async () => {

        const { data: responseData } = await useAxios.get(url);
        console.log('Get Todos', responseData);
        return responseData;
    });

    const addTodoMutation = useMutate(url, ['todos'], {text}, 'items', () => setText(prev => ''));
    
    return (
        <div>
            <h2>Mutation</h2>
            <p>
                In this example, new items can be created using a mutation. The new item
                will be optimistically added to the list in hopes that the server
                accepts the item. If it does, the list is refetched with the true items
                from the list. Every now and then, the mutation may fail though. When
                that happens, the previous list of items is restored and the list is
                again refetched from the server.
            </p>
            <form
                onSubmit={e => {
                    e.preventDefault()
                    addTodoMutation.mutate(text)
                }}
            >
                <input
                    type="text"
                    onChange={e => setText(e.target.value)}
                    value={text}
                />
                <button>{addTodoMutation.isLoading ? 'Creating...' : 'Create'}</button>
            </form>
            <br />
            {status === 'loading' ? (
                'Loading...'
            ) : status === 'error' ? (
                error.message
            ) : (
                <>
                    <div>Updated At: {new Date(data.ts).toLocaleTimeString()}</div>
                    <ul>
                        {data.items.map(datum => (
                            <li key={datum}>{datum}</li>
                        ))}
                    </ul>
                    <div>{isFetching ? 'Updating in background...' : ' '}</div>
                </>
            )}
            <PrevBtn />
        </div>
    );
}

export default Mutation;