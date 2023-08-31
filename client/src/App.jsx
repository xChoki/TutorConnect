import './App.css'
import { Route, Routes } from 'react-router-dom'
import { UserContextProvider } from './UserContext'

import IndexPage from './pages/IndexPage'
import Layout from './components/COM_Layout'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import axios from 'axios'
import PortalPage from './pages/PortalPage'

axios.defaults.baseURL = 'http://localhost:4000'
axios.defaults.withCredentials = true

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/portal/:subpage?' element={<PortalPage />} />
          <Route path='/portal/:subpage/:action' element={<PortalPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App
