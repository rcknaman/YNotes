import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
const Signin = (props) => {


    const [credentials, setcredentials] = useState({email:"",password:""});
    let navigate=useNavigate(); 
    const handleClick=async function(e){

        e.preventDefault();
        let url = `http://localhost:5000/api/auth/login`;
        const response = await fetch(url, { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI2M2ExM2M1OGVlNjU2ZDQ4ZDEyM2Y1In0sImlhdCI6MTY1MDcwNjY1N30.zlTZ9RqtcguYyj3FPfo-_rGWbY_a2cU24QcqUZZK4mo'
            },
            body: JSON.stringify({email:credentials.email,password:credentials.password})
        });
        const json=await response.json();
        if(json.success){
            // redirect
            localStorage.setItem('token',json.authtoken);
            navigate('/');
            props.showAlert("Logged in successfully","success");
        }
        else{
            props.showAlert("Invalid Credentials","danger");
        }
        console.log(json);
    }
    const onChange = function (e) {
        setcredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    return (
        <>
        <h2>Login to continue to YNotes</h2>
        <form onSubmit={handleClick}>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" name='email' className="form-control" value={credentials.email} onChange={onChange} id="email" aria-describedby="emailHelp"/>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" name="password" className="form-control" id="password" value={credentials.password} onChange={onChange} />
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
        </form>
        </>
    )
}

export default Signin