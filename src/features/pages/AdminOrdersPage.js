import Navbar from "../navbar/Navbar"
import AdminOrders from "../admin/components/AdminOrders"

const AdminOrdersPage = () => {
  return (
    <div>
       <Navbar>
          <AdminOrders/>
       </Navbar>
     </div>
  )
}

export default AdminOrdersPage;