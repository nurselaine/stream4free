import React from 'react';
import './App.css';
import { ChakraProvider } from '@chakra-ui/react';

import Hero  from './pages/home';
import Hello from './pages/hello';
import Video from './components/video';

function App() {
  return (
    <ChakraProvider>
    <div className="App">
      <Hero />
      <Hello />
      <Video />
    </div>
    </ChakraProvider>
  );
}

export default App;
