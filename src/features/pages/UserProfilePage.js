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
    </div>
  )
}

export default UserProfilePage