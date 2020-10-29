import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import CommonService from "../../../services/CommonService";

import CustomLoader from "../../Common/CustomLoader";

function TutorList() {

    const [tutors, setTutors] = useState([]);
    const [loader, setLoader] = useState(false);
    const [searchTitle,setSearchTitle] = useState("");

    useEffect(() => {
        retrieveAllTutors();
    }, []);
    
    const retrieveAllTutors = () => {
        setLoader(true);
        CommonService.getAll('tutors')
        .then(response => {
            setTutors(response.data.data.tutors);
            setLoader(false);
        })
        .catch(e => {
            console.log(e);
            setLoader(false);
        });
    };

    const onChangeSearchTitle = e => {
        const searchTitle = e.target.value;
        setSearchTitle(searchTitle);
    };
    const findByTitle = (e) =>{
        var data = {
            title: searchTitle,
        };
        CommonService.findByTitle('tutors/search',data)
            .then(response => {
                setTutors(response.data.data.tutors);
                //console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });


    }

    return (
        <div className="row justify-content-center">
            <div className="col-md-8 col-8">

            </div>
            <div className="col-md-4 col-4">
                <Link to="/admin/tutor/add" className="detailsSection"> Add Tutor <i className="fa fa-plus-circle"></i></Link>
            </div>
            <div className="col-md-12 col-12">
            
                <div className="table-responsive-md">

                    <div className="input-group-append">
                        Search : <input type="text" className="form-control col-4" onChange={onChangeSearchTitle} />
                        <button className="addLearner"  onClick={findByTitle} >Search</button>
                    </div>
                    <table className="table table-borderd learner_table">
                        <thead>
                            <tr>
                            <th colSpan="4">Tutor List</th>                  
                            </tr>
                        </thead>
                        <tbody>
                            {tutors &&
                                tutors.map((tutor, index) => (
                                <tr key={tutor.id}>
                                    <td>{tutor.fname + ' ' + tutor.lname }</td> 
                                    <td>{tutor.email }</td> 
                                    <td>{tutor.tutor.contact_number }</td>                  
                                    <td>
                                        <Link to={"/admin/tutor/edit/" + tutor.id} className="detailsSection">Edit <i className="fa fa-angle-right"></i></Link> &nbsp; 
                                        <Link className="detailsSection" to={"/admin/tutor/assign-learner-list/" + tutor.id} >Assign Learner List<i className="fa fa-angle-right"></i></Link>
                                    </td>
                                </tr>
                            ))}                      
                            
                        </tbody>            
                    </table>
                    {(loader)?
                        <CustomLoader />:''
                    }
                </div>
            </div>   
        </div>
    );
}

export default TutorList;