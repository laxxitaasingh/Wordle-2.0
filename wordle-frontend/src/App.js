import './App.css';
import { BrowserRouter, Route, Routes, Navigate, useParams } from 'react-router-dom';
import { Game } from './pages/Game/Game';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { Room } from './pages/Room/Room';
import { UserName } from './pages/UserName/UserName';

function ProtectedRoute({ children }) {
  const { id } = useParams();
  return sessionStorage.getItem('username') ? children : <Navigate to={`/name/${id}`} />;
}

function App() {
  const temp = ["a","a","a"]
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/game' element={<Game />} />
          <Route path='/name/:id' element={<UserName />} />
          <Route 
            path='/game/:id' 
            element={
              <ProtectedRoute>
                <Room />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </BrowserRouter>
      {/* {temp.forEach((item)=> { return (<div>{item}</div>)})} */}
    </div>
  );
}

export default App;
