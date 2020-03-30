import React, { useState, useContext } from 'react';
import axios from "axios";

import Card from '../../Shared/Components/UIElements/Card';
import Input from '../../Shared/Components/FormElements/Input';
import Button from '../../Shared/Components/FormElements/Button';
import ErrorModal from '../../Shared/Components/UIElements/ErrorModal';
import LoadingSpinner from '../../Shared/Components/UIElements/LoadingSpinner';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from '../../Shared/Util/Validators';
import { useForm } from '../../Shared/Hooks/Form-Hook';
import { AuthContext } from '../../Shared/Context/Auth-Context';
import '../Styles/Auth.css';

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false
      },
      password: {
        value: '',
        isValid: false
      }
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: '',
            isValid: false
          }
        },
        false
      );
    }
    setIsLoginMode(prevMode => !prevMode);
  };

  const authSubmitHandler =  async event => {
    event.preventDefault();
    setIsLoading(true);
    let user = {
      email: formState.inputs.email.value,
      password: formState.inputs.password.value
    };
    if(!isLoginMode){
      
      user["name"] = formState.inputs.name.value;
       
      await axios.post("http://localhost:5000/api/users/signup",user).then(res => {
        setIsLoading(false);  
        auth.login(res.data.user.id);
      }).catch(error => {
        setIsLoading(false); 
        setError(error.response.data.message || error.message);
        
      });
    }else{
      await axios.post("http://localhost:5000/api/users/signin",user).then(res => {
        setIsLoading(false);  
        
        auth.login(res.data.user.id);
      }).catch(error => {
        setIsLoading(false); 
        setError(error.response.data.message || error.message);
        
      })

    }
    
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorHandler}/>
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay/>}
        <form onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <Input
              element="input"
              id="name"
              type="text"
              label="Your Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a name."
              onInput={inputHandler}
            />
          )}
          <Input
            element="input"
            id="email"
            type="email"
            label="E-Mail"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email address."
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="password"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Please enter a valid password, at least 6 characters."
            onInput={inputHandler}
          />
          <Button type="submit" disabled={!formState.isValid}>
            {isLoginMode ? 'LOGIN' : 'SIGNUP'}
          </Button>
        </form>
        <Button inverse onClick={switchModeHandler}>
          SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
        </Button>
      </Card>
      </React.Fragment>
  );
};

export default Auth;
