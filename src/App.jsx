import './App.css'
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom'
import Nav from './components/nav/nav'
import Index from './components/pages/Index'
import ProductDetails from './components/pages/ProductDetails'
import Categories from './components/pages/Categories'
import CategoryPage from './components/pages/CategoryPage'
import Wishlist from './components/pages/Wishlist'
import Cart from './components/pages/Cart'  
import Footer from './components/footer/Footer'
import About from './components/pages/About'
import Shipping from './components/pages/Shipping'
import Returns from './components/pages/Returns'
import Contact from './components/pages/Contact'
import NotFound from './components/pages/NotFound'
import Checkout from './components/pages/Checkout'
import Brands from './components/pages/Brands'

import GlobalCartModal from './components/modals/GlobalCartModal'

function App() {


  return (
    <>
      <Nav/>
      <Routes>
        <Route path='/' element={<Index/>}/>
        <Route path='/product/:id' element={<ProductDetails/>}/>
        <Route path='/wishlist' element={<Wishlist/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/categories' element={<Categories/>}/>
        <Route path='/category/:id' element={<CategoryPage/>}/>
        
        {/* Info Pages */}
        <Route path='/about' element={<About/>}/>
        <Route path='/shipping' element={<Shipping/>}/>
        <Route path='/returns' element={<Returns/>}/>
        <Route path='/contact' element={<Contact/>}/>
        
        {/* Checkout */}
        <Route path='/checkout' element={<Checkout/>}/>

        {/* Brands */}
        <Route path='/brands' element={<Brands/>}/>
        
        {/* 404 */}
        <Route path='*' element={<NotFound/>}/>
      </Routes>
      <GlobalCartModal/>
      <Footer/>
    </>
  )
}

export default App
