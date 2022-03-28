import { QueryClient, QueryClientProvider } from 'react-query';
import ClientState from './features/clientState-fail';
import Example from './features/example';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <Example />
      <ClientState />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
