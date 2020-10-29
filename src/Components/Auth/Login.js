import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { Redirect } from 'react-router-dom';

import { login } from "../../store/actions/auth";

import validate from "../../Validator";

import Banner from "../Layouts/Banner";
import Footer from "../Layouts/Footer";
import Header from "../Layouts/Header";

const Login = (props) => {

    const [useremail, setUseremail]         = useState("");
    const [userpassword, setUserpassword]   = useState("");
    const [loading, setLoading]             = useState(false);
    const [error, setError]                 = useState("");

    const { isLoggedIn,userRoleData } = useSelector(state => state.auth);
    const { message } = useSelector(state => state.message);

    const dispatch = useDispatch();

    const onChangeUseremail = (e) => {
        const useremail = e.target.value;
        setUseremail(useremail);
    };

    const onChangeUserPassword = (e) => {
        const userpassword = e.target.value;
        setUserpassword(userpassword);
    };

    const handleLogin = (e) => {
        e.preventDefault();
    
        setLoading(true);
        
        const userData = {
            useremail: useremail,
            userpassword: userpassword,            
        };
        
        const { isValid, errors } = validate.loginValidate(userData);
        
        if (isValid) {
            setError("");
            dispatch(login(useremail, userpassword))
                .then(() => {
                    // console.log(isLoggedIn);
                    // console.log(userRoleData);
                    // console.log(message);
                    if(userRoleData==1){    
                        console.log(userRoleData);                    
                        props.history.push("/admin");
                        window.location.reload();
                       
                    }else if(userRoleData==2){
                        props.history.push("/tutor");
                        window.location.reload();
                    }else if(userRoleData==3){
                        props.history.push("/learner");
                        window.location.reload();
                    }
                    
                })
                .catch(() => {
                    setLoading(false);
                    if(message=='Request failed with status code 401'){
                        errors.message = "Email or password mismatch";
                        setError(errors);
                    }else{
                        errors.message = "Email or password mismatch.Please Try again";
                        setError(errors);
                    }
                });
        } else {
            setLoading(false);
            setError(errors);         
        }
      };
      if (isLoggedIn && userRoleData==1) {
        return <Redirect to="/admin" />;
      }
      else if (isLoggedIn && userRoleData==2) {
        return <Redirect to="/tutor" />;
      }else if (isLoggedIn && userRoleData==3) {
        ///return <Redirect to="/tutor" />;
      }
    return (
        <div>
            <Header/>
            <Banner/>
            <section className="login_section">
                <div className="container">
                <div className="learner_title">
                    <h2>ACCESS THE SYSTEM</h2>  
                    
                    <form onSubmit={handleLogin}>
                        {message && (
                            <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                                {error.message}
                            </div>
                            </div>
                        )}
                        <div className="form-group">
                            <input type="text" className="loginInput" placeholder="Enter your email address" name="useremail" onChange={onChangeUseremail} /> 
                            <span className="errorMsg"> {error && error.useremail}</span>        
                        </div>
                        <div className="form-group">
                            <input type="password" className="loginInput" placeholder="Enter your password"  name="userpassword" onChange={onChangeUserPassword} /> 
                            <span className="errorMsg"> {error && error.userpassword}</span>        
                        </div>       
                        <div className="text-center">
                            <button className="logInBtnAr" disabled={loading}>
                            {loading && (
                                <span className="spinner-border spinner-border-sm"></span>
                            )}
                                LOGIN
                            </button>                            
                        </div>
                    </form>        
                </div>  
                </div>
            </section>
            <Footer/>        
        </div>
    );
}

export default Login;