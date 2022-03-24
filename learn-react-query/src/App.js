import { QueryClient, QueryClientProvider } from 'react-query';
import Example from './pages/example/Example';

const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  );
}

export default App;
