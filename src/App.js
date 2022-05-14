import './App.css';
import Articles from './components/Articles';
import Navbar from './components/Navbar';
import NewArticle from './components/NewArticle';
import { BrowserRouter as Router, routes, Route, Routes } from 'react-router-dom';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import ReadEachArticle from './components/ReadEachArticle';

function App() {
  return (
    <div className="App">
        
        <Router>
            <Navbar />
            <Routes>
                <Route path="/register" element={<Register />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/" element={<><NewArticle /><Articles />
                </>}>
                </Route>
                <Route path="/article/:createdBy/:id" element={<ReadEachArticle />}> </Route>
            </Routes>
        </Router>
      
    </div>
  );
}

export default App;
