import React, { useState, useEffect } from "react";
import { Link  } from "react-router-dom";

import { Multiselect } from 'multiselect-react-dropdown';
import TutorService from "../../../services/TutorService";
import CommonService from "../../../services/CommonService";
import validate from "../../../Validator";

function TutorAdd() {
    const initialTutorState = {
        fname: "",
        lname: "",
        email: "",
        contact_number: "",
        subject_id: {},
        level_id: {},
        learning_center: "",
    };
    const [tutor, setTutor] = useState(initialTutorState);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

    const [allSubjects, setAllSubjects] = useState();

    const [allLevels, setAllLevels] = useState();
    const [message, setMessage] = useState();

    const [selectedValue, setSelectedValue] = useState([]);

    useEffect(() => {
        getAllSubject();
        getAlllevel();
        //console.log(props.match.params.id);       
    },[]);

    const getAllSubject = () => {
        CommonService.getAll('subjects')
        .then(response => {
            setAllSubjects(response.data.data.subjects);
            console.log(response.data.data);       
        })
        .catch(e => {
            console.log(e);
        });
    }
    
    const getAlllevel = () => {
        CommonService.getAll('levels')
        .then(response => {
            setAllLevels(response.data.data.levels);
            console.log(response.data.data);       
        })
        .catch(e => {
            console.log(e);
        });
    }

    const handleInputChange = event => {
        const { name, value } = event.target;
        setTutor({ ...tutor, [name]: value });
        //console.log(tutor);
    };
    const handleSubjectMultiselectChange = (selectedList, selectedItem) => {
        console.log(selectedList);
        setTutor({ ...tutor, 'subject_id': selectedList });
        console.log(tutor);
        
    }
    const removeSubjectMultiselectChange = (selectedList, removedItem) => {
        console.log(selectedList);
        setTutor({ ...tutor, 'subject_id': selectedList });
        console.log(tutor);
    }
    const handleLevelMultiselectChange = (selectedList, selectedItem) => {
        console.log(selectedList);
        setTutor({ ...tutor, 'level_id': selectedList });
    }
    const removeleLevelMultiselectChange = (selectedList, removedItem) => {
        console.log(selectedList);
        setTutor({ ...tutor, 'level_id': selectedList });
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

    const handleSubmitTutor = (e) => {
        e.preventDefault();
        
        const { isValid, errors } = validate.createTutorValidate(tutor);
         ///console.log(errors);
        if (isValid) {
            setError("");
            TutorService.create(tutor)
            .then(response => {
                console.log(response.data);
                if(response.data.success){
                    if(response.data.message==='validation_failed'){
                        var validationError = response.data.data[0];
                        setError(validationError);
                    }else if(response.data.message==='email_send_fail'){
                        var validationError = response.data.data[0];
                        //setError(validationError);
                        setMessage('Email send failed');
                    }else{
                        setMessage('Tutor created successfully');
                        setTutor(initialTutorState);
                        setSelectedValue([]);

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
                    
                    <form onSubmit={handleSubmitTutor} className="w-100">
                    <div className="greenHeading">
                        Register new Tutor                        
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control textAra" placeholder="Firstname" name="fname" value={tutor.fname} onChange={handleInputChange} />
                        <span className="errorMsg">{error && error.fname}</span> 
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control textAra" placeholder="Lastname" name="lname" value={tutor.lname} onChange={handleInputChange} />
                        <span className="errorMsg">{error && error.lname}</span>
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control textAra" placeholder="Email" name="email" value={tutor.email} onChange={handleInputChange} />
                        <span className="errorMsg">{error && error.email}</span>
                    </div> 
                    <div className="form-group">
                        <input type="text" className="form-control textAra" placeholder="Telephone" name="contact_number" value={tutor.contact_number} onChange={handleInputChange} />
                        <span className="errorMsg">{error && error.contact_number}</span>
                    </div>                 
                    <div className="form-group">
                        {/* <select name="subject_id" className="form-control textAra">
                            <option value=""> Subject </option>
                            <option value="">1</option>
                        </select> */}
                        <Multiselect
                            name="subject_id"
                            id="subject_id"
                            placeholder="Subject"
                            options={allSubjects}
                            displayValue="name"
                            onSelect={handleSubjectMultiselectChange}
                            onRemove={removeSubjectMultiselectChange}
                        />
                        <span className="errorMsg">{error && error.subject_id}</span>
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
                        />
                        <span className="errorMsg">{error && error.level_id}</span>
                    </div>        
                    <div className="form-group">
                        <input type="text" className="form-control textAra" placeholder="Learning Centre" name="learning_center" value={tutor.learning_center} onChange={handleInputChange} />
                    </div>
                    
                    <div className="form-group">
                        <textarea name="note" cols="30" rows="5" className="form-control textAra"  placeholder="Notes" onChange={handleInputChange}></textarea>
                    </div>
                    <div className="text-right">
                        <Link to={'/admin/tutor'} className="addLearner">Back</Link>&nbsp;
                        <button className="addLearner">ADD LEARNER</button>
                    </div>
                    </form>
                </div>            
            </div>
        </div>
    );
}

export default TutorAdd;