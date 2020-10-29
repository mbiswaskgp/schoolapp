import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import CommonService from "../../../services/CommonService";

import CustomLoader from "../../Common/CustomLoader";

import { ToastContainer, toast } from 'react-toastify';

const AssignLearnerList = (props) => {
    const [learners, setLearners] = useState([]);
    const [loader, setLoader] = useState(false);
    const [searchTitle,setSearchTitle] = useState("");
    var tutorId=props.match.params.id;

    useEffect(() => {
        console.log(tutorId);
        retrieveAllAssignLearners(props.match.params.id);
    }, [props.match.params.id]);

    const retrieveAllAssignLearners = (tutor_id) => {
        setLoader(true);
        CommonService.getById('tutor-assign-learners',tutor_id)
        .then(response => {
            setLearners(response.data.data.learners);
            if(response.data.data.total==0){
                toast.info('No record found');
            }
            setLoader(false);            
        })
        .catch(e => {
            setLoader(false);
            console.log(e);
            toast.error(e,{autoClose: false});            
        });
    };
    //const notify = () => toast.error("Wow so easy !");

    return (
        <div className="row justify-content-center">
            <div className="col-md-8 col-8">

            </div>
            <div className="col-md-4 col-4">
                <Link to={"/admin/tutor/assign-learner/" + tutorId} className="detailsSection"> Assign Learner <i className="fa fa-plus-circle"></i></Link>
            </div>
            <div className="col-md-12 col-12">
                
                <div className="table-responsive-md">
                {(loader)?
                    <CustomLoader />:''
                }
        {/* <button onClick={notify}>Notify !</button> */}
                <ToastContainer />
                </div>
            </div>            
        </div>
    );
};

export default AssignLearnerList;