import axios from "axios";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

const Mutation = () => {

    const queryClient = useQueryClient();
    const [text, setText] = useState('');

    const { status, data, error, isFetching } = useQuery(['todos'], async () => {
        console.log('Get Todos')
        const { data } = await axios.get('https://7higb.sse.codesandbox.io/api/data');
        return data;
    });

    const addTodoMutation = useMutation( text => axios.post('https://7higb.sse.codesandbox.io/api/data', {text}), {

        // Options: onMutate, onError, onSetteld
        onMutate: async text => {
            
            // 실행중인 refetch를 모두 취소한다
            await queryClient.cancelQueries(['todos']);
            
            // 업데이트 하기전에 데이터 보관 - Error 발생 시 사용
            const previousValue = queryClient.getQueryData(['todos']);
            
            queryClient.setQueryData(['todos'], prev => ({
                ...prev,
                items: [...prev.items, text],
            }));
            
            // 입력란 초기화
            setText(prev => '');

            return previousValue;
        },

        // 서버 업데이트 실패 시 이전 값으로 롤백
        onError: (error, variables, previousValue) => {
            console.log('Error: ',error,' variables: ', variables);
            queryClient.setQueriesData(['todos'], previousValue);
        },

        // 성공, 실패 하던 'todos' Query refetch
        onSettled: () => {
            queryClient.invalidateQueries(['todos']);
        },
    });

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
        </div>
    );
}

export default Mutation;