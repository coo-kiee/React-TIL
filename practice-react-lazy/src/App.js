import { lazy, Suspense } from 'react'

const Lazy = lazy(() => import('./LazyImg'))

function App() {
  return (
    <div className="App">
      <div>Lazy Loding Compnent</div>
      <img src="/logo192.png" alt="" />
      {/* <Lazy /> */}
    </div>
  );
}

export default App;
