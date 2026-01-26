import './App.css'
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom'
import Nav from './components/nav/nav'
import Index from './components/pages/Index'

function App() {


  return (
    <>
      <Nav/>
      <Routes>
        <Route path='/' element={<Index/>}/>
      </Routes>
      
    </>
  )
}

export default App
