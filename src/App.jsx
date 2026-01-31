import './App.css'
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom'
import Nav from './components/nav/nav'
import Index from './components/pages/Index'
import ProductDetails from './components/pages/ProductDetails'
import Categories from './components/pages/Categories'

function App() {


  return (
    <>
      <Nav/>
      <Routes>
        <Route path='/' element={<Index/>}/>
        <Route path='/product/:id' element={<ProductDetails/>}/>
        <Route path='/categories' element={<Categories/>}/>
      </Routes>
      
    </>
  )
}

export default App
