import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Pagination from 'reactjs-hooks-pagination';

import CommonService from "../../../services/CommonService";

import CustomLoader from "../../Common/CustomLoader";

function LearnerList() {
    const pageLimit = 2; //Count of items per page
    const [learners, setLearners] = useState([]);
    const [loader, setLoader] = useState(false);
    const [searchTitle,setSearchTitle] = useState("");

    const [offset, setOffset]               = useState(0);
    const [totalRecords, setTotalRecords]   = useState(0);

    useEffect(() => {
        retrieveAllLearners();
    }, []);
    
    const retrieveAllLearners = () => {
        setLoader(true);
        var data = {
            page: 0,
            pageLimit:pageLimit 
        };
        CommonService.getAllWithPage('learners/search',data)
        .then(response => {
            setLearners(response.data.data.learners);
            setTotalRecords(response.data.data.total);
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
    const findByTitle = (ofset,pageLimit) =>{
        var data = {
            title: searchTitle,
            page: ofset,
            pageLimit:pageLimit 
        };
        //console.log(data);
        CommonService.findByTitle('learners/search',data)
            .then(response => {
                console.log(response.data);
                setLearners(response.data.data.learners);
                setTotalRecords(response.data.data.total);
            })
            .catch(e => {
                console.log(e);
            });
    }

    const onPageChanged = page => {
        const offset = (page - 1) * pageLimit;
        setOffset(offset);
        findByTitle(offset,pageLimit);
    }
    

    return (
        <div>
            <div className="row justify-content-center">
                <div className="col-md-8 col-8">

                </div>
                <div className="col-md-4 col-4">
                    <Link to="/admin/learner/add" className="detailsSection"> Add learner <i className="fa fa-plus-circle"></i></Link>
                </div>
                <div className="col-md-12 col-12">
                
                    <div className="table-responsive-md">

                        <div className="input-group-append">
                            Search : <input type="text" className="form-control col-4" onChange={onChangeSearchTitle} />
                            <button className="addLearner"  onClick={findByTitle(0,pageLimit)} >Search</button>
                        </div>
                        <table className="table table-borderd learner_table">
                        <thead>
                            <tr>
                            <th colSpan="4">learner List</th>                  
                            </tr>
                        </thead>
                        <tbody>
                            {learners &&
                                learners.map((learner, index) => (
                                <tr key={learner.id}>
                                    <td>{learner.fname + ' ' + learner.lname}</td> 
                                    <td>{learner.email }</td> 
                                    <td>{learner.learner.contact_number}</td>                  
                                    <td>
                                        <Link to={"/admin/learner/edit/" + learner.id} className="detailsSection">Edit <i className="fa fa-angle-right"></i></Link> &nbsp; 
                                        <Link to={"/admin/learner/"} className="detailsSection" onClick={() => ''}>Remove <i className="fa fa-angle-right"></i></Link>
                                    </td>
                                </tr>
                            ))}                      
                            
                        </tbody>            
                        </table>
                        <Pagination
                            totalRecords={totalRecords}
                            pageLimit={pageLimit}
                            pageRangeDisplayed={1}
                            onChangePage={onPageChanged}
                        />         
                        {(loader)?
                            <CustomLoader />:''
                        }
                    </div>
                </div>   
            </div>
        </div>
    );
}

export default LearnerList;