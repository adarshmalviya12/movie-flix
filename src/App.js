
import { Container } from '@mui/material';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import './App.css';
import Header from './components/Header/Header';
import SimpleBottomNavigation from './components/MainNav';
import Movies from './Pages/Movies/Movies';
import Search from './Pages/Search/Search';
import Series from './Pages/Series/Series';
import Trending from './Pages/Trending/Trending';


function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="app">   
        <Container>
          <Routes>
            <Route path="/" element={<Trending />} exact />
            <Route path="/movies" element={<Movies />} exact />
            <Route path="/series" element={<Series />} exact />
            <Route path="/search" element={<Search />} exact />
          </Routes>
        </Container>
      </div>

      <SimpleBottomNavigation />
    </BrowserRouter>
  );
}

export default App;
