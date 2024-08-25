
import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Home from './pages/home'
import LoginPage from './pages/login'
import ModulePage from './pages/module-page'
import RootLayout from './layouts/rootLayout'
import RegisterPage from './pages/register'

function App() {
  const user = localStorage.getItem('token')
  return (
    <>
    <Router>
        <Routes>
            <Route element={<RootLayout />}>
              {user ? <Route path={'/'} element={<Home />}/> : <Route path={'/'} element={<LoginPage />}/>}
              <Route path={'/login'} element={<LoginPage />}/>
              <Route path={'/register'} element={<RegisterPage />}/>
            </Route>
          {user ? <Route path={'/module/:id'} element={<ModulePage />}/> : <Route path={'/'} element={<LoginPage />}/>}
        </Routes>
      </Router>
    
    </>
  )
}

export default App
