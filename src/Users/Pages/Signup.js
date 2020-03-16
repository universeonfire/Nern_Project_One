import React from "react";
import {Link} from "react-router-dom";

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
            firstName:{
                value:"",
                isValid:false
            },
            lastName:{
                value:"",
                isValid:false
            },
            mail:{
                value:"",
                isValid:false
            },
            password:{
                value:"",
                isValid:false
            },
            passwordConfirmation:{
                value:"",
                isValid:false
            }

        },false
    )

    const onSubmitHandler = (event) =>{
        event.preventDefault()
        console.log(formState.inputs)
    }
    const onCheck = (event) =>{
        event.preventDefault()
        console.log(formState)
    }

    return(
        <form className="auth-form" onSubmit={onSubmitHandler}>
            <Input
                id="firstName"
                element="input"
                type="text"
                label="First Name"
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler}
                errorText="Please enter a valid first name."
            />
            <Input
                id="lastName"
                element="input"
                type="text"
                label="Last Name"
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler}
                errorText="Please enter a valid last name."
            />
            <Input
                id="mail"
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
            <Input
                id="passwordConfirmation"
                element="input"
                type="password"
                label="Password Confirmation"
                validators={[VALIDATOR_PASSCONF(formState.inputs.password)]}
                onInput={inputHandler}
                errorText="Please enter same password to confirm."
            />
             
            <Button type="submit" disabled={!formState.isValid}>Sign Up</Button>
            <Link to={`/auth`}><Button inverted  >Sign In</Button></Link>

        </form>
       
    )
};


export default Signup;