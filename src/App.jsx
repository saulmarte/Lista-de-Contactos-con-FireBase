import './App.css'
import { Route, Routes } from 'react-router-dom'
import ProtectedRoutes from './components/ProtectRoutes'
import { AuthProvider } from './context/AuthContext'
import Login from './pags/Login'
import CRUD from './pags/CRUD'
import Register from './pags/Register'
function App() {
  return (
    <section className="App">
      <AuthProvider>
        <Routes>
          <Route path="/Register" element={<Register />} />
          <Route path="/LogIn" element={<Login />} />

          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<CRUD />} />
          </Route>
        </Routes>
      </AuthProvider>
    </section>
  )
}

export default App
