import React , {useEffect, useState ,useContext} from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from "axios";

import Input from '../../Shared/Components/FormElements/Input';
import Button from '../../Shared/Components/FormElements/Button';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../Shared/Util/Validators';
import {useForm} from '../../Shared/Hooks/Form-Hook';
import {AuthContext} from '../../Shared/Context/Auth-Context';
import ErrorModal from '../../Shared/Components/UIElements/ErrorModal';
import LoadingSpinner from '../../Shared/Components/UIElements/LoadingSpinner';
import Card from '../../Shared/Components/UIElements/Card';

import '../Styles/PlaceForm.css';



const UpdatePlace = () => {
  const [identifiedPlace, setIdentifiedPlace] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
  const placeId = useParams().placeId;
  const history = useHistory();
  const auth = useContext(AuthContext);

  const [formState,inputHandler, setFormData] = useForm ({
        title:{
          value: "",
          isValid: false
        },
        description:{
          value: "",
          isValid: false
        }
      },false
  );
      
   

  useEffect(() => {

    const getPlace = async () =>{
      setIsLoading(true);
      await axios.get(`http://localhost:5000/api/places/${placeId}`).then(res=>{
        
        setIdentifiedPlace(res.data.place);
        setFormData(
          {
            title:{
                  value: res.data.place.title,
                  isValid: true
                  },
            description:{
              value: res.data.place.description,
              isValid: true
            }
          },true
        )
        setIsLoading(false);
      }).catch(error=>{
        setIsLoading(false);
			  setError( error.message);
      }); 
    };
    getPlace();
    
  }, [setFormData,placeId]);

  const submitHandler = async event => {
    event.preventDefault()
    setIsLoading(true);
    const patches = {
      title:formState.inputs.title.value,
      description:formState.inputs.description.value
    }
    await axios.patch(`http://localhost:5000/api/places/${placeId}`,patches).then(res=>{
      setIsLoading(false);
      history.push(`/${auth.userId}/places`);
    }).catch(error=>{
      setIsLoading(false);
      setError(error.message);
    })
  }

  const errorHandler = () => {
		setError(null);
	}; 

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner/>
      </div>
    );
  }

  if (!identifiedPlace && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find place!</h2>
        </Card>
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorHandler} />
      {!isLoading && identifiedPlace && <form className="place-form" onSubmit={submitHandler} >
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
          onInput={inputHandler}
          initialValue={identifiedPlace.title}
          initialIsValid={true}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description (min. 5 characters)."
          onInput={inputHandler}
          initialValue={identifiedPlace.description}
          initialIsValid={true}
        />
        <Button type="submit" disabled={!formState.isValid}>
          UPDATE PLACE
        </Button>
      </form>}
    </React.Fragment>  
  );
};

export default UpdatePlace;
