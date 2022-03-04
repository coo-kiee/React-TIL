import { RecoilRoot } from 'recoil';
import CharacterCounter from './characterCounter';
import React from 'react';

function App() {

  return (
    <RecoilRoot>
      <React.Suspense fallback={<div>Loding...</div>}>
      <CharacterCounter />
      </React.Suspense>
    </RecoilRoot>
  );
}

export default App;
