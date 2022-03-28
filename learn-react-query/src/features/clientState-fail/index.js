import { QueryCache, useQuery, useQueryClient } from "react-query";

// 실패!! - useQuery(Hook)은 handle 함수 내부에서 호출할 수 없다.
const ClientState = () => {
    
    const testObj = [{id:1, name: "테스트1"}, {id:2, name: "테스트2"}];
    const promiseTest = async () => {
        return await Promise.resolve(testObj);
    };

    const { isLoading, error, data } = useQuery("test", promiseTest, { retry: 0});

    // store 데이터 조회
    const queryClient = useQueryClient();
    console.log('Test, key: test',queryClient.getQueryData('test'));
    console.log('Test, key: example',queryClient.getQueryData('example'));

    if (isLoading) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message

    console.log(data[0].id, isLoading, error);

    return (
        <div>
            <h1>{data[0].id}</h1>
            <p>{data[0].name}</p>
        </div>
    );
}

export default ClientState;