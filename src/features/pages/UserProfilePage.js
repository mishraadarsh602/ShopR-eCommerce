import Footer from "../common/Footer";
import Navbar from "../navbar/Navbar"
import UserProfile from "../user/components/UserProfile";

const UserProfilePage = () => {
  return (
    <div>
         <Navbar>
           <div className="m-auto ">
            My Profile
          
            <UserProfile/>
            </div>
         </Navbar>
         <Footer/>

    </div>
  )
}

export default UserProfilePage