import Navbar from "../navbar/Navbar"
import AdminProductList from '../admin/components/AdminProductList'
import Footer from "../common/Footer"

const Home = () => {
  return (
    <div>
         <Navbar>
         <AdminProductList/>

         </Navbar>
         <Footer/>

    </div>
  )
}

export default Home