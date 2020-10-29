import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Multiselect } from 'multiselect-react-dropdown';

import CommonService from "../../../services/CommonService";

import CustomLoader from "../../Common/CustomLoader";

import validate from "../../../Validator";

const AssignLearner = (props) => {
    const [allLearners, setAllLearners] = useState([]);
    const [learners, setLearners] = useState([]);
    const [tutor, setTutor] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTitle,setSearchTitle] = useState("");
    const [error,setError] = useState("");
    
    var tutorId=props.match.params.id;
    
    useEffect(() => {
        setLoading(true);
        getAllLearners();  
        getTutorData(props.match.params.id);
    },[props.match.params.id]);

    const getAllLearners = () => {
        CommonService.getAll('tutor/alllearners')
        .then(response => {
            setAllLearners(response.data.data.allLearners);
            console.log(response.data.data);       
            setLoading(false);
        })
        .catch(e => {
            console.log(e);
        });
    }

    const getTutorData = (id) => {
        CommonService.getById('tutors',id)
        .then(response => {
            if(response.data.success){
                console.log(response.data.data.tutors);
                var tutors = {
                    fname: response.data.data.tutors.fname,
                    lname: response.data.data.tutors.lname,
                    email: response.data.data.tutors.email,
                    contact_number: response.data.data.tutors.contact_number,
                    subject_id: response.data.data.tutors.tutor_subjects,
                    level_id: response.data.data.tutors.tutor_levels,
                    learning_center: response.data.data.tutors.learning_center,
                    tutor_learners: response.data.data.tutors.tutor_learners,
                }
                setTutor(tutors);
                
            }else{
                //setMessage('Record not found');
            }
        })
        .catch(e => {
            console.log(e);
        });
    }
    const handleLevelMultiselectChange = (selectedList, selectedItem) => {
        console.log(selectedList);
        
        setLearners(selectedList);
    }
    const removeleLevelMultiselectChange = (selectedList, removedItem) => {
        console.log(selectedList);
        setLearners(selectedList);
       
    }
    const handleSubmitAssignedLearner = (e) => {
        e.preventDefault();
        console.log(learners);
        setError("");
        var data = {
            'learners':  learners
        }
        const isValid = true;
        if (isValid) {
            setError("");
            CommonService.update('tutors/updateAssignLearner', props.match.params.id, data)
            .then(response => {
                console.log(response.data.success);
                if(response.data.success){

                }
                
            })
            .catch(e => {
                console.log(e.message);
            });
        }else{
            //setError(errors);
        }
    }
    
    return (
        <div className="learner_title">
            <div className="col-lg-12 ">
                <div className="register-form">
                    <form  onSubmit={handleSubmitAssignedLearner}  className="w-100">
                        <div className="form-group">
                            
                            
                            <span className="errorMsg">{error}</span>
                            {(loading)?
                                <CustomLoader />:

                                <Multiselect
                                    name="learners_id"
                                    id="learners_id"
                                    displayValue={"email"}
                                    placeholder="Select Learners"
                                    options={allLearners}
                                    selectedValues = {tutor.tutor_learners}                                    
                                    onSelect={handleLevelMultiselectChange}
                                    onRemove={removeleLevelMultiselectChange}
                                    loading={false}
                                />
                            } 
                        </div> 
                        
                        <div className="text-right">
                            <Link to={'/admin/tutor/assign-learner-list/'+tutorId} className="addLearner">Back</Link>&nbsp;
                            <button className="addLearner">Save Assigned Learner</button>
                        </div>
                    </form>
                </div>            
            </div>
        </div>
    );
};

export default AssignLearner;