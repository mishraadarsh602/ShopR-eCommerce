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
    </div>
  )
}

export default UserOrdersPage