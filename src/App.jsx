import { Routes, Route, Navigate } from 'react-router';
import Login from './pages/Login';
import Reporting from './pages/Reporting';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/reporting" element={<Reporting />} />
    </Routes>
  );
}

export default App;
