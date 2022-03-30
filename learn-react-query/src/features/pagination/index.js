import axios from "axios";
import { useEffect, useState } from "react"
import { useQuery, useQueryClient } from "react-query"
import PrevBtn from "../../components/PrevBtn";

const Pagination = () => {

    const queryClient = useQueryClient();
    const [page, setPage] = useState(0);

    const fetchProjects = async (page = 0) => {
        const {data} = await axios.get('https://wpndq.sse.codesandbox.io/api/projects?page=' + page);
        return data;
    };

    const { status, data, error, isFetching, isPreviousData } = useQuery(['projects', page], async () => {
        console.log('useQuery');
        return await fetchProjects(page);
    }, { keepPreviousData: true, staleTime: 5000 });

    console.log('data', data, isPreviousData);

    // Prefetch the next page!
    useEffect(() => {

        if (data?.hasMore) {
            const prefetchQuery = queryClient.prefetchQuery(['projects', page + 1], async () => await fetchProjects(page + 1));
            console.log('prefetchQuery', prefetchQuery);
        };

    }, [data, page, queryClient]);

    if(status === 'loading') return <div>Loading...</div>;
    if(status === 'error') return <div>Error: {error.message}</div>;

    return (
        <div>
            <p>
                In this example, each page of data remains visible as the next page is
                fetched. The buttons and capability to proceed to the next page are also
                supressed until the next page cursor is known. Each page is cached as a
                normal query too, so when going to previous pages, you'll see them
                instantaneously while they are also refetched invisibly in the
                background.
            </p>
            {
                // `data` will either resolve to the latest page's data
                // or if fetching a new page, the last successful page's data
                <div>
                    {data.projects.map(project => (<p key={project.id}>{project.name}</p>))}
                </div>
            }
            <div style={{display: "flex", margin: "5px"}}>
                {/* Previous Page */}
                <button
                    onClick={() => setPage(prev => Math.max(prev - 1, 0))}
                    disabled={page === 0}
                >
                    Previous Page
                </button>
                {/* Current Page */}
                <div style={{margin: "5px"}}>Current Page: {page + 1}</div>
                {/* Next Page */}
                <button
                    onClick={() => {
                        setPage(old => (data?.hasMore ? old + 1 : old))
                    }}
                    disabled={isPreviousData || !data?.hasMore}
                >
                    Next Page
                </button>
            </div>
            {
                // Since the last page's data potentially sticks around between page requests,
                // we can use `isFetching` to show a background loading
                // indicator since our `status === 'loading'` state won't be triggered
                isFetching ? <span> Loading...</span> : null
            }
            <PrevBtn />
        </div>
    );
}

export default Pagination;