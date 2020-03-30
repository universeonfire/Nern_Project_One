import React,{useContext,useState} from 'react';
import { useHistory } from 'react-router-dom';
import axios from "axios";

import Input from '../../Shared/Components/FormElements/Input';
import Button from '../../Shared/Components/FormElements/Button';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../Shared/Util/Validators';

import {useForm} from '../../Shared/Hooks/Form-Hook';
import { AuthContext } from '../../Shared/Context/Auth-Context';
import ErrorModal from '../../Shared/Components/UIElements/ErrorModal';
import LoadingSpinner from '../../Shared/Components/UIElements/LoadingSpinner';

import '../Styles/PlaceForm.css';




const NewPlace = () => {
  const auth = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      },
      address: {
        value: '',
        isValid: false
      },
      location:{
        lat:{
          value:40.7579747,
          isValid: true
        },
        lng:{
          value:-73.9877313,
          isValid: true
        },
        isValid:true
      },
      image:{
        value:"https://thenypost.files.wordpress.com/2019/05/cre-times-square-1.jpg?quality=90&strip=all&w=978&h=652&crop=1",
        isValid:true
      }
       
      
    },
    false
  );
  const history = useHistory();

  const placeSubmitHandler = async event => {
    event.preventDefault();
    const place = {
      title: formState.inputs.title.value,
      description: formState.inputs.description.value,
      address: formState.inputs.address.value,
      location:{
        lat:formState.inputs.location.lat.value,
        lng:formState.inputs.location.lng.value
      },
      image:formState.inputs.image.value, 
      creator: auth.userId
    }
     
    await axios.post("http://localhost:5000/api/places/", place).then(res=>{
      setIsLoading(false);
      history.push("/");
    }).catch(error=>{
      setIsLoading(false);
			setError( error.message);
    });
  };
  const errorHandler = () => {
		setError(null);
	}; 

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorHandler} />
      <form className="place-form" onSubmit={placeSubmitHandler}>
        {isLoading && (
          <div className="center">
          <LoadingSpinner asOverlay />
          </div>
        )}
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
          onInput={inputHandler}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description (at least 5 characters)."
          onInput={inputHandler}
        />
        <Input
          id="address"
          element="input"
          label="Address"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid address."
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          ADD PLACE
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewPlace;

