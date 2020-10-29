import React from "react";
import { Link  } from "react-router-dom";

import SubjectList from "./SubjectList";

const Subjects = () => {
  
  return (
      <div className="row justify-content-center">
      <div className="col-md-9 col-12">
        <div className="table-responsive-md">
          <Link to="/admin/subject/add" className="detailsSection"> Add Subject <i className="fa fa-angle-right"></i></Link>
          <SubjectList />
        </div>
      </div>   
    </div>
  );
};

export default Subjects;