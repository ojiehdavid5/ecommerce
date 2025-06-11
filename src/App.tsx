import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import './App.css'
import Sidebar from './components/Sidebar'
import MainContent from './components/MainContent'
import ProductPage from './components/ProductPage'
import TopSellers from './components/TopSellers'
import PopularBlogs from './components/PopularBlogs'
import { FilterProvider } from './components/FilterSearch'

function App() {


  return (
    <FilterProvider>
          <Router>
      <div className="flex h-screen">
        <Sidebar />
        <div className="rounded w-full flex justify-center flex-wrap">
          <Routes>
            <Route path="/" element={<MainContent />} />
            <Route path="/product/:id" element={<ProductPage />} />
          </Routes>
          <div className="">
            <TopSellers />
            <PopularBlogs/>
          </div>
        </div>

      </div>

    </Router>
    

    </FilterProvider>
  )
}

export default App
