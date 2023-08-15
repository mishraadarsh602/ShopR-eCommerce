import Footer from "../common/Footer";
import Navbar from "../navbar/Navbar"
import UserOrders from "../user/components/UserOrders";

const UserOrdersPage = () => {
  return (
    <div>
         <Navbar>
           <div className="m-auto ">
            My Orders
          
            <UserOrders/>
            </div>
         </Navbar>
         <Footer/>

    </div>
  )
}

export default UserOrdersPage