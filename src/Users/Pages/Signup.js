import React from "react";
import {Link} from "react-router-dom";
import axios from "axios";

import Input from '../../Shared/Components/FormElements/Input';
import Button from '../../Shared/Components/FormElements/Button';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_PASSCONF,
  VALIDATOR_REQUIRE
} from '../../Shared/Util/Validators';
import {useForm} from '../../Shared/Hooks/Form-Hook';

import "../Styles/Auth.css";

const Signup = () => {
    const [formState,inputHandler] = useForm(
        {
            name:{
                value:"",
                isValid:false
            },
            email:{
                value:"",
                isValid:false
            },
            password:{
                value:"",
                isValid:false
            }

        },false
    )

    const onSubmitHandler = async (event) =>{
        event.preventDefault()
         
        const user = {
            name : formState.inputs.name,
            email: formState.inputs.email,
            password: formState.inputs.password
        };

        await axios.post("http://localhost:5000/api/users/signup",{user}).then(res => {
                console.log(res);
        });
        
    }
    const onCheck = (event) =>{
        event.preventDefault()
        console.log(formState)
    }

    return(
        <form className="auth-form" onSubmit={onSubmitHandler}>
            <Input
                id="name"
                element="input"
                type="text"
                label="User Name"
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler}
                errorText="Please enter a valid first name."
            />
             
            <Input
                id="email"
                element="input"
                type="text"
                label="Mail address"
                validators={[VALIDATOR_EMAIL()]}
                onInput={inputHandler}
                errorText="Please enter a valid e-mail address."
            />
            <Input
                id="password"
                element="input"
                type="password"
                label="Password"
                validators={[VALIDATOR_MINLENGTH(8)]}
                onInput={inputHandler}
                errorText="Please enter a valid password (at least 8 characters)."
            />
            
             
            <Button type="submit" disabled={!formState.isValid}>Sign Up</Button>
            <Link to={`/auth`}><Button inverted  >Sign In</Button></Link>

        </form>
       
    )
};


export default Signup;