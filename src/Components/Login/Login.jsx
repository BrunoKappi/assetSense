import React, { useState, useRef } from "react";
import "./Login.css";
import { useNavigate } from 'react-router-dom';
import { HandleFirebaseEmailPasswordLogin, LoginSuccess, LoginUtil } from "./LoginUtils";
import { Oval } from "react-loader-spinner";
import SerranoLogo from '../../Images/SerranoLogo.png'

import { Link } from "react-router-dom";
import LogoutHeader from "../LogoutHeader/LogoutHeader";
import { NotificationSucesso, NotificationErro } from "../../NotificationUtils";

function Login() {


    const [IsLogging, setIsLoggin] = useState(false);
    const [Email, setEmail] = useState('');

    const navigate = useNavigate();


    const PasswordRef = useRef()


    //Event Email
    const handleChangeEmail = (e) => {
        const value = e.target.value
        if (value.includes("@") && !value.includes("@serranoautomacao") && e.nativeEvent.inputType !== "deleteContentBackward") {
            const completEmail = value + "serranoautomacao.com.br"
            setEmail(completEmail)
        } else {
            setEmail(value)
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (Email && PasswordRef.current.value) {
            setIsLoggin(true)
            LoginUtil(Email.toLocaleLowerCase(), PasswordRef.current.value).then((message) => {
                LoginSuccess(message)
                setIsLoggin(false)
                NotificationSucesso('Login', 'Login realizado com sucesso!')
                navigate('/App/Dash')
            }).catch((error) => {
                setIsLoggin(false)               
                NotificationErro('Login', HandleFirebaseEmailPasswordLogin(error.toString()))                
            })
        }
    };

    return (
        <div className={localStorage.getItem('AssetSenseTema') === 'Escuro' ? 'LoginContainerEscuro LoginContainer' : 'LoginContainerClaro LoginContainer'}>

            <LogoutHeader />


            <form className="LoginForm" onSubmit={handleSubmit}>


                <div className="LoginImageContainer">
                    <img alt="Logo" src={SerranoLogo}></img>
                </div>              
                <div className="LoginFormGroup">

                    <input placeholder="Email" type="Email" value={Email} onChange={handleChangeEmail} />
                </div>
                <div className="LoginFormGroup">
                    <input placeholder="Senha" ref={PasswordRef} type="Password" />
                </div>
                <div className="LoginFormGroup ForgetPasswordLink">
                    <Link to={'/Forget'}>Esqueci minha senha</Link>
                </div>
                <div className="LoginFormGroup">
                    <button className="LoginButton" type="submit">
                        {IsLogging ? <Oval
                            height={18}
                            width={18}
                            color="#FFFF"
                            wrapperStyle={{}}
                            wrapperClass="LoginSpinnerContainer"
                            secondaryColor="#6e6e6e"
                            strokeWidth={7}
                            strokeWidthSecondary={7}
                        /> : 'Entrar'}
                    </button>
                </div>
            </form >



        </div >
    );
}

export default Login;
