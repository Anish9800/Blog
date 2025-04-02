import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Single from './pages/Single'
import Write from './pages/Write'
import Layout from './components/Layout'
import '../style.scss'

function App() {

  const router = createBrowserRouter([
    {
      path : '/',
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path:'/post/:id',
          element: <Single />
        },
        {
          path:'/write',
          element: <Write />
        }
      ]
    },
    {
      path : '/login',
      element: <Login />
    },
    {
      path : '/register',
      element: <Register />
    }
  ])

  return (
    <div className='app'>
      <div className='container'>
        <RouterProvider router={router}/>
      </div>
    </div>
  )
}

export default App
