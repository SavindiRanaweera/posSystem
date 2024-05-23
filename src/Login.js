import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./utils/Authcontext";

const LoginPage= () => {

    const { login } = useAuth();
    const navigate = useNavigate();

    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();

        const data = {
            username : username,
            password: password
        };

        axios
      .post("http://localhost:8081/auth/login", data)
      .then(function (response) {
        login(response.data);
        navigate("/");
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    return(
        <div className="container">
            <div className="login p-4 shadow rounded">
                <h1 class= "text-center" >Login</h1>

                <form onSubmit={handleLogin}>
                    <div class="mb-4 mt-4 row">
                        <label>
                            Username:
                            <input type="text" onChange={ (e) => {
                                setUsername(e.target.value);
                            }} name="username"/>
                        </label>
                    </div>
                    <div class="mb-3 row">
                        <label>
                            Password:
                            <input type="password" onChange={ (e) => {
                                setPassword(e.target.value);
                            }} name="password"/>
                        </label>
                    </div>

                    <div className= "text-end">
                        <button  type="submit" class="btn btn-primary">Login</button>
                    </div>        
                    
                </form>
            </div>
            
        </div>
    )

}

export default LoginPage;