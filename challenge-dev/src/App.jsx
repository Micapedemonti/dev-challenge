import './App.css';
import ListaPersonajes from './pages/ListaPersonajes';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Personaje from './pages/Personaje';

function App() {
  return (
    <>
      <div className='App'>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<ListaPersonajes />} />
            <Route path='/:id' element={<Personaje />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}
export default App;
