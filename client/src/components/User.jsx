import user from "./gamer.png"
import { Link } from 'react-router-dom'
function User() {
    

  return (
    <div>
        <Link to={"/me"}>
            <img  src={user} alt="" />
        </Link>
    </div>
  )
}

export default User
