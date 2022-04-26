import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {

  const onChange = function (e) {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  }
  const [credentials, setcredentials] = useState({ name: "", email: "", password: "", cpassword: "" });

  let navigate = useNavigate();

  const handleClick = async function (e) {

    e.preventDefault();
    let url = `http://localhost:5000/api/auth/create`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI2M2ExM2M1OGVlNjU2ZDQ4ZDEyM2Y1In0sImlhdCI6MTY1MDcwNjY1N30.zlTZ9RqtcguYyj3FPfo-_rGWbY_a2cU24QcqUZZK4mo'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password, name: credentials.name })
    });

    const json = await response.json();
    if (json.success) {
      // redirect
      localStorage.setItem('token', json.authtoken);
      navigate('/signin');
      props.showAlert("Account created successfully", "success");
    } else {
      props.showAlert("Invalid Credentials", "danger");
    }
    console.log(json);
  }

  return (
    <>
      <h2 className='my-5'>Welcome to YNotes</h2>
      <h5 className='my-3'>fill your details up here</h5>
      <form onSubmit={handleClick}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" name="name" className="form-control" minLength={5} value={credentials.name} onChange={onChange} id="name" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" name='email' className="form-control" value={credentials.email} onChange={onChange} id="email" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label" >Password</label>
          <input type="password" name='password' className="form-control" minLength={5} value={credentials.password} onChange={onChange} id="password" />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label" >Confirm Password</label>
          <input type="password" name='cpassword' className="form-control" minLength={5} value={credentials.cpassword} onChange={onChange} id="cpassword" />
        </div>
        <button type="submit" className="btn btn-primary">Sign Up</button>
      </form>
    </>
  )
}

export default Signup