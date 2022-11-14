import React from 'react';
import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container);
import App from './App.jsx'



// const App = () => {
// return (
//   <div>
//     <h1>Hello World!</h1>
//   </div>
//   );
// }
root.render(<App />);