import { useMutation, useQueryClient } from "react-query";
import useAxios from "./useAxios";

export const useMutate = ( (url, querykey, mutateValue, extraKey, initialFn) => {
    
    const queryClient = useQueryClient();
    const objKeys = Object.keys(mutateValue);

    // Options: onMutate, onError, onSetteld
    const options = {
        
        onMutate: async () => {
            
            // 실행중인 refetch를 모두 취소한다
            await queryClient.cancelQueries(querykey);
            
            // 업데이트 하기전에 데이터 보관 - Error 발생 시 사용
            const previousValue = queryClient.getQueryData(querykey);

            // 업데이트 예정인 값 전달
            queryClient.setQueryData(querykey, (prevData) => ({
                ...prevData,
                [extraKey]: [...prevData[extraKey], mutateValue[objKeys]],
            }));
            
            // 입력란 초기화
            initialFn();

            // return 값은 내부적으로 Context API를 이용해서 useMutation의 context로 들어간다.
            return { previousValue };
        },

        // 서버 업데이트 실패 시 이전 값으로 롤백
        onError: (error, variables, context) => {
            console.log(context);
            console.log(context?.previousValue); // onMutate의 return 값이 context에 들어간다.
            console.log('Error: ',error,' variables: ', variables);
            if (context?.previousValue) {
                queryClient.setQueriesData(querykey, previousValue);
            };
        },

        // 성공, 실패 하던 'todos' Query refetch
        onSettled: () => {
            queryClient.invalidateQueries(querykey);
        },
    }

    // return useMutation(() => axios.post(url, mutateValue), options);
    return useMutation(() => useAxios.post(url, mutateValue), options);
});

// { [objKey], [...prevData[objKey], ...mutateValue[objKey]]}
// const updateData = objKeys.reduce((acc, curr, idx) => {
//     console.log(idx, mutateValue[curr]);
//     return { ...acc, [curr]: [...prevData[curr], mutateValue[curr]] }
// }, {...prevData});

// console.log('updateData', updateData);

// return updateData;