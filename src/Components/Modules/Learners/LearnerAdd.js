import React, { useState, useEffect } from "react";
import { Link  } from "react-router-dom";
import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";

import { Multiselect } from 'multiselect-react-dropdown';
import CommonService from "../../../services/CommonService";
import validate from "../../../Validator";

function LearnerAdd() {
    const initialLearnerState = {
        fname: "",
        lname: "",
        email: "",
        contact_number: "",
        level_id: {},
        centre_id: "",
        parent_name: "",
        dob: "",
        note: ""
    };
    const [learner, setLearner]     = useState(initialLearnerState);
    const [loader, setLoader]       = useState(false);
    const [error, setError]         = useState(false);

    const [allCentres, setAllCentres] = useState();

    const [allLevels, setAllLevels] = useState();
    const [message, setMessage]     = useState();
    const [startDate, setStartDate] = useState('');

    const [selectedValue, setSelectedValue] = useState([]);

    useEffect(() => {
        getAllCentre();
        getAlllevel();
    },[]);

    const getAllCentre = () => {
        CommonService.getAll('centres')
        .then(response => {
            setAllCentres(response.data.data.centres);
                
        })
        .catch(e => {
            console.log(e);
        });
    }

    const getAlllevel = () => {
        CommonService.getAll('levels')
        .then(response => {
            setAllLevels(response.data.data.levels);
        })
        .catch(e => {
            console.log(e);
        });
    }

    const handleInputChange = event => {
        const { name, value } = event.target;
        setLearner({ ...learner, [name]: value });
    };
    const handleLevelMultiselectChange = (selectedList) => {
        setLearner({ ...learner, 'level_id': selectedList });
    }
    const removeleLevelMultiselectChange = (selectedList) => {
        setLearner({ ...learner, 'level_id': selectedList });
    }

    const handleCentreMultiselectChange = (selectedList) => {
        setLearner({ ...learner, 'centre_id': selectedList });
    }
    const removeCentreMultiselectChange = (selectedList) => {
        setLearner({ ...learner, 'centre_id': selectedList });
    }

    const handleDateChange = event =>{
        setStartDate(event);
        setLearner({ ...learner, 'dob': event });
    }

    const handleSubmitLearner = (e) => {
        e.preventDefault();
        setLoader(true);
        //const { isValid, errors } = validate.createLearnerValidate(learner);
        //console.log(errors);
        const isValid = true;
        const errors = {};
        if (isValid) {
            setError("");
            CommonService.create('learners',learner)
            .then(response => {
                setLoader(false);
                if(response.data.success){
                    if(response.data.message==='validation_failed'){
                        var validationError = response.data.data[0];
                        setError(validationError);
                    }else if(response.data.message==='email_send_fail'){
                        var validationError = response.data.data[0];
                        setMessage('Email send failed');
                    }else{
                        setMessage('Learner created successfully');
                        setLearner(initialLearnerState);
                        setSelectedValue([]);
                    }                   
                }
            })
            .catch(e => {
                setLoader(false);
                console.log(e.message);
            });
        }else{
            setLoader(false);
            setError(errors);
        }
    }

    return (
        <div className="learner_title">
            <div className="col-lg-12 ">
                <div className="register-form">
                    
                        <div>
                            <h5>{message}</h5>                       
                        </div>
                    
                    <form onSubmit={handleSubmitLearner} className="w-100">
                    <div className="greenHeading">
                        Register new Learner                        
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control textAra" placeholder="Firstname" name="fname" value={learner.fname} onChange={handleInputChange} />
                        <span className="errorMsg">{error && error.fname}</span> 
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control textAra" placeholder="Lastname" name="lname" value={learner.lname} onChange={handleInputChange} />
                        <span className="errorMsg">{error && error.lname}</span>
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control textAra" placeholder="Email" name="email" value={learner.email} onChange={handleInputChange} />
                        <span className="errorMsg">{error && error.email}</span>
                    </div> 
                    <div className="form-group">
                        <input type="text" className="form-control textAra" placeholder="Telephone" name="contact_number" value={learner.contact_number} onChange={handleInputChange} />
                        <span className="errorMsg">{error && error.contact_number}</span>
                    </div>       
                    <div className="form-group">
                        <Multiselect
                            name="level_id"
                            id="level_id"
                            placeholder=" Year/Level "
                            options={allLevels}
                            displayValue="name"
                            onSelect={handleLevelMultiselectChange}
                            onRemove={removeleLevelMultiselectChange}
                            selectionLimit="1"
                        />
                        <span className="errorMsg">{error && error.level_id}</span>
                    </div> 
                    <div className="form-group">
                        <Multiselect
                            name="centre_id"
                            id="centre_id"
                            placeholder="Select Centre"
                            options={allCentres}
                            displayValue="name"
                            onSelect={handleCentreMultiselectChange}
                            onRemove={removeCentreMultiselectChange}
                            selectionLimit="1"
                        />
                        <span className="errorMsg">{error && error.level_id}</span>
                    </div> 
                    <div className="form-group">
                        <input type="text" className="form-control textAra" placeholder="Parent/guardian name" name="parent_name" value={learner.parent_name} onChange={handleInputChange} />
                        <span className="errorMsg">{error && error.parent_name}</span>
                    </div> 
                    <div className="form-group">
                    <DatePicker placeholderText="Enter your dob"
                        className="form-control textAra" 
                        selected={startDate} 
                        onChange={handleDateChange} 
                        showYearDropdown={true} 
                        
                    />
                        
                    </div>          
                    <div className="form-group">
                        <textarea name="note" cols="30" rows="5" className="form-control textAra" placeholder="Notes" onChange={handleInputChange}></textarea>
                    </div>
                    <div className="text-right">
                        <Link to={'/admin/learner'} className="addLearner">Back</Link>&nbsp;
                        <button className="addLearner" {...loader?'disabled':''} >ADD LEARNER</button>
                        
                    </div>
                    </form>
                </div>            
            </div>
        </div>
    );
}

export default LearnerAdd;