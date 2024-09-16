
import './App.css'
import Header from './Header'
import Layout from './Layout';
import CreatePost from './pages/CreatePost';
import IndexPage from './pages/IndexPage';
import LogInPage from './pages/LogInPage';
import RegisterPage from './pages/RegisterPage';
import Post from './Post'
import { Route, Routes } from 'react-router-dom';
import { UserContextProvider } from './UserContext';

function App() {
  return (
    <UserContextProvider >
      <Routes>
        <Route path='/' element={<Layout />}>
        <Route index element={
          <IndexPage />
        } />

        <Route path='/login' element={
          <LogInPage />
        } />

        <Route path='/register' element={
          <RegisterPage />
        } />
        </Route>

        <Route path='/create' element={
          <CreatePost />
        } />
        
        <Route path='/create' element={
          <CreatePost />
        } />
      </Routes>
    </UserContextProvider>
  )
}

export default App
