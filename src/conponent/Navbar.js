import React,{useEffect} from 'react'
import { Link,useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
const Navbar = (props) => {

  let location = useLocation();
  let navigate=useNavigate(); 
  const logoutHandler=function(){
    localStorage.removeItem('token');
    navigate('/signin');
    props.showAlert("Logged out successfully","success");
  }
  useEffect(() => {
    console.log(location.pathname);
  }, [location]);
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">YNotes</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      </ul>
      {!localStorage.getItem('token') && <form className="d-flex">
      <Link className="btn btn-primary mx-2" to="/signin" role="button">Sign In</Link>
      <Link className="btn btn-primary mx-2" to="/signup" role="button">Sign Up</Link>
      </form>}
      {localStorage.getItem('token') && <button className="btn btn-primary" onClick={logoutHandler}>Logout</button>}
      
    </div>
  </div>
</nav>
  )
}

export default Navbar