import AdminOrders from "../admin/components/AdminOrders"
import Navbar from "../navbar/Navbar";
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