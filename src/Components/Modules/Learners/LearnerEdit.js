import React, { useState, useEffect } from "react";
import { Link  } from "react-router-dom";

import DatePicker from "react-datepicker";

import { Multiselect } from 'multiselect-react-dropdown';
import CommonService from "../../../services/CommonService";
import validate from "../../../Validator";

import CustomLoader from "../../Common/CustomLoader";

function LearnerEdit(props) {

    const initialLearnerState = {
        fname: "",
        lname: "",
        email: "",
        contact_number: "",
        level_id: {},
        centre_id: "",
        parent_name: "",
        dob: ""
    };
    const [learner, setLearner]         = useState(initialLearnerState);
    const [loader, setLoader]           = useState(false);
    const [error, setError]             = useState(false);

    const [startDate, setStartDate]     = useState();
    const [allCentres, setAllCentres]   = useState();

    const [allLevels, setAllLevels]     = useState();
    const [message, setMessage]         = useState();

    useEffect(() => {
        getAlllevel();
        getAllCentre();
        
        getLearner(props.match.params.id);
        
        //console.log(props.match.params.id);       
    },[props.match.params.id]);
    
    const getAllCentre = () => {
        CommonService.getAll('centres')
        .then(response => {
            setAllCentres(response.data.data.centres);
            //console.log(response.data.data);       
        })
        .catch(e => {
            console.log(e);
        });
    }

    const getAlllevel = () => {
        CommonService.getAll('levels')
        .then(response => {
            setAllLevels(response.data.data.levels);
            //console.log(response.data.data);       
        })
        .catch(e => {
            console.log(e);
        });
    }

    const getLearner = (id) => {
        //e.preventDefault();
        setLoader(true);
        CommonService.getById('learners',id)
        .then(response => {
            //console.log(response);
            if(response.data.success){
                //console.log(response.data.data.learners);
                var learners = {
                    fname: response.data.data.learners.fname,
                    lname: response.data.data.learners.lname,
                    email: response.data.data.learners.email,
                    contact_number: response.data.data.learners.contact_number,
                    level_id: response.data.data.learners.current_level_id,
                    centre_id: response.data.data.learners.centre_id,
                    parent_name: response.data.data.learners.parent_name,
                    dob: new Date(response.data.data.learners.dob),
                    note: response.data.data.learners.note,
                }
                setStartDate(new Date(response.data.data.learners.dob));
                setLearner(learners);
                setLoader(false);
            }else{
                setMessage('Record not found');
                setLoader(false);
            }
        })
        .catch(e => {
            console.log(e);
            setLoader(false);
        });
    }
       
    const handleInputChange = event => {
        const { name, value } = event.target;
        setLearner({ ...learner, [name]: value });
        //console.log(learner);
    };
    const handleDateChange = event =>{
        console.log(event);
        setStartDate(event);
        setLearner({ ...learner, 'dob': event });
    }
    const handleLevelMultiselectChange = (selectedList, selectedItem) => {
        console.log(selectedList);
        setLearner({ ...learner, 'level_id': selectedList });
    }
    const removeleLevelMultiselectChange = (selectedList, removedItem) => {
        console.log(selectedList);
        setLearner({ ...learner, 'level_id': selectedList });
    }
    const handleCentreMultiselectChange = (selectedList) => {
        setLearner({ ...learner, 'centre_id': selectedList });
    }
    const removeCentreMultiselectChange = (selectedList) => {
        setLearner({ ...learner, 'centre_id': selectedList });
    }

    // const getAllSubject = () => {
    //     SubjetcService.getAll()
    //     .then(response => {
    //         setSubjects(response.data.data.subjects);
    //         setLoader(false);
    //     })
    //     .catch(e => {
    //         console.log(e);
    //         setLoader(false);
    //     });
    // }

    const handleSubmitLearner = (e) => {
        e.preventDefault();
        console.log(learner);

        const { isValid, errors } = validate.createLearnerValidate(learner);
        console.log(props.match.params.id);
        if (isValid) {
            setError("");
            CommonService.update('learners', props.match.params.id, learner)
            .then(response => {
                
                if(response.data.success){
                    if(response.data.message==='validation_failed'){
                        var validationError = response.data.data[0];
                        setError(validationError);
                    }else if(response.data.message==='email_send_fail'){
                        var validationError = response.data.data[0];
                        //setError(validationError);
                        setMessage('Email send failed');
                    }else{
                        setMessage('Learner update successfully');
                        //setLearner(initialLearnerState);
                        //setSelected([]);
                    }                   
                }
            })
            .catch(e => {
                console.log(e.message);
            });
        }else{
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
                        {(loader)?
                            <CustomLoader />:
                        
                    <form onSubmit={handleSubmitLearner} className="w-100">
                    <div className="greenHeading">
                        Edit Learner                       
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
                        <input type="text" className="form-control textAra" placeholder="Email" name="email" value={learner.email} onChange={handleInputChange} disabled />
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
                            placeholder="Select Year/Level"
                            options={allLevels}
                            selectedValues = {learner.level_id}
                            displayValue="name"
                            onSelect={handleLevelMultiselectChange}
                            onRemove={removeleLevelMultiselectChange}
                            labelledBy={"Select"}
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
                            selectedValues = {learner.centre_id}
                        />
                        <span className="errorMsg">{error && error.level_id}</span>
                    </div>        
                    <div className="form-group">
                        <input type="text" className="form-control textAra" placeholder="Parent/guardian name" name="parent_name" value={learner.parent_name} onChange={handleInputChange} />
                        <span className="errorMsg">{error && error.parent_name}</span>
                    </div>
                    <div className="form-group">
                        <DatePicker 
                        className="form-control textAra" 
                        selected={startDate} 
                        onChange={handleDateChange} 
                        placeholderText="Enter your dob"
                        showYearDropdown={true} />
                        
                    </div> 
                    <div className="form-group">
                        <textarea name="note" cols="30" rows="5" className="form-control textAra" placeholder="Notes" value={learner.note} onChange={handleInputChange} />
                    </div>
                    <div className="text-right">
                        <Link to={'/admin/learner'} className="addLearner">Back</Link>&nbsp;
                        <button className="addLearner">Save LEARNER</button>
                    </div>
                    </form>
                    }
                </div>            
            </div>
        </div>
    );
}

export default LearnerEdit;