import React from 'react';
import { Switch, Route } from "react-router-dom";

import Banner from "../Layouts/Banner";
import Footer from "../Layouts/Footer";
import AdminHeader from "../Layouts/Admin/AdminHeader";

import AdminDashboard from "./AdminDashboard";
import Subjects from "../Modules/Subjects/Subjects";
import SubjectForm from "../Modules/Subjects/SubjectForm";
import SubjectEdit from "../Modules/Subjects/SubjectEdit";

import Levels from "../Modules/Levels/Levels";
import LevelEdit from "../Modules/Levels/LevelEdit";
import LevelAdd from "../Modules/Levels/LevelAdd";

import TutorList from "../Modules/Tutors/TutorList";
import TutorAdd from "../Modules/Tutors/TutorAdd";
import TutorEdit from "../Modules/Tutors/TutorEdit";
import AssignLearner from "../Modules/Tutors/AssignLearner";
import AssignLearnerList from "../Modules/Tutors/AssignLearnerList";

import LearnerList from "../Modules/Learners/LearnerList";
import LearnerAdd from "../Modules/Learners/LearnerAdd";
import LearnerEdit from "../Modules/Learners/LearnerEdit";


function Admin(props) {

    return (
        <div>
            <AdminHeader/>
            <Banner/>
                <section className="question-management">
                    <div className="container">
                        <Switch>
                            <Route exact path={["/admin","/admin/dashboard"]}><AdminDashboard /></Route>
                            {/* subject */}
                            <Route exact path={`/admin/subject`}><Subjects /></Route>
                            <Route exact path={`/admin/subject/add`}><SubjectForm /></Route>
                            <Route exact path="/admin/subject/edit/:id" component={SubjectEdit}></Route>

                            {/* level */}
                            <Route exact path={`/admin/level`}><Levels /></Route>
                            <Route exact path={`/admin/level/add`}><LevelAdd /></Route>
                            <Route exact path="/admin/Level/edit/:id" component={LevelEdit}></Route>

                            {/* tutor */}
                            <Route exact path={`/admin/tutor`}><TutorList /></Route>
                            <Route exact path={`/admin/tutor/add`}><TutorAdd /></Route>
                            <Route exact path="/admin/tutor/edit/:id" component={TutorEdit}></Route>
                            <Route exact path="/admin/tutor/assign-learner/:id" component={AssignLearner}></Route>
                            <Route exact path="/admin/tutor/assign-learner-list/:id" component={AssignLearnerList}></Route>
                            {/* learner */}
                            <Route exact path={`/admin/learner`}><LearnerList /></Route>
                            <Route exact path={`/admin/learner/add`}><LearnerAdd /></Route>
                            <Route exact path="/admin/learner/edit/:id" component={LearnerEdit}></Route>
                        </Switch>                        
                    </div>
                </section>
            <Footer/>            
        </div>
    );
}

export default Admin;