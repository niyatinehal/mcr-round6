import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Home } from './Home';
import { SinglePage } from './SinglePage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/:id' element={<SinglePage/>} />
      </Routes>
    </div>
  );
}

export default App;
