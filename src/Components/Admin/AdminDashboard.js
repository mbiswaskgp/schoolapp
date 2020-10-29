import React from 'react';
import { Link } from "react-router-dom";

function AdminDashboard(props) {

    return (
        <div className="row">
            <div className="col-lg-4">
                <div className="addQuestionTitle text-center">
                    Active Learners
                </div>
                <div className="learnerAndTeachersList">
                    <ul>
                        <li>
                            <span className="nameofStudent">Firstname  Lastname</span>
                            <Link to="/" className="progressBtn">progress</Link>
                        </li>
                        <li>
                            <span className="nameofStudent">Firstname  Lastname</span>
                            <Link to="/" className="progressBtn">progress</Link>
                        </li>
                        <li>
                            <span className="nameofStudent">Firstname  Lastname</span>
                            <Link to="/" className="progressBtn">progress</Link>
                        </li>
                        <li>
                            <span className="nameofStudent">Firstname  Lastname</span>
                            <Link to="/" className="progressBtn">progress</Link>
                        </li>
                        <li>
                            <span className="nameofStudent">Firstname  Lastname</span>
                            <Link to="/" className="progressBtn">progress</Link>
                        </li>
                        <li>
                            <span className="nameofStudent">Firstname  Lastname</span>
                            <Link to="/" className="progressBtn">progress</Link>
                        </li>
                    </ul>
                </div>
                <div className="infogram mt-4">
                    <canvas id="myChart" width="500" height="250"></canvas>
                </div>
            </div>
            <div className="col-lg-4">
                <div className="existingheading text-center">
                    ACTIVE TUTORS
                </div>
                <div className="learnerAndTeachersList">
                    <ul>
                    <li>
                        <span className="nameofStudent">Firstname  Lastname</span>
                        <Link to="/" className="techsDetlsBtn">DETAILS</Link>
                    </li>
                    <li>
                        <span className="nameofStudent">Firstname  Lastname</span>
                        <Link to="/" className="techsDetlsBtn">DETAILS</Link>
                    </li>
                    <li>
                        <span className="nameofStudent">Firstname  Lastname</span>
                        <Link to="/" className="techsDetlsBtn">DETAILS</Link>
                    </li>
                    <li>
                        <span className="nameofStudent">Firstname  Lastname</span>
                        <Link to="/" className="techsDetlsBtn">DETAILS</Link>
                    </li>
                    <li>
                        <span className="nameofStudent">Firstname  Lastname</span>
                        <Link to="/" className="techsDetlsBtn">DETAILS</Link>
                    </li>
                    <li>
                        <span className="nameofStudent">Firstname  Lastname</span>
                        <Link to="/" className="techsDetlsBtn">DETAILS</Link>
                    </li>
                    <li>
                        <span className="nameofStudent">Firstname  Lastname</span>
                        <Link to="/" className="techsDetlsBtn">DETAILS</Link>
                    </li>
                    <li>
                        <span className="nameofStudent">Firstname  Lastname</span>
                        <Link to="/" className="techsDetlsBtn">DETAILS</Link>
                    </li>
                    <li>
                        <span className="nameofStudent">Firstname  Lastname</span>
                        <Link to="/" className="techsDetlsBtn">DETAILS</Link>
                    </li>
                    <li>
                        <span className="nameofStudent">Firstname  Lastname</span>
                        <Link to="/" className="techsDetlsBtn">DETAILS</Link>
                    </li>
                    </ul>

                </div>

            </div>
            <div className="col-lg-4">
                <div className="greenHeading ">
                    TASK LIST - TO DO                                    
                </div>
                <div className="toDoListGroup">
                    <div className="text-right doneSlected">
                        <Link to="/">Done</Link>
                    </div>
                    <div className="green_checkbox">
                        <input type="checkbox" className="" id="createquCheck1" />
                        <label htmlFor="createquCheck1">Create new assessment for year 2 Maths</label>
                    </div>
                    <div className="green_checkbox">
                        <input type="checkbox" className="" id="createquCheck2" />
                        <label htmlFor="createquCheck2">Register new learners</label>
                    </div>

                    <div className="green_checkbox">
                        <input type="checkbox" className="" id="createquCheck3" />
                        <label htmlFor="createquCheck3">Find a year 9  science teacher</label>
                    </div>

                    <div className="green_checkbox">
                        <input type="checkbox" className="" id="createquCheck4" />
                        <label htmlFor="createquCheck4">Check outstanding assessments</label>
                    </div>
                    <div className="green_checkbox">
                        <input type="checkbox" className="" id="createquCheck5" />
                        <label htmlFor="createquCheck5">Contact parents of A new learner</label>
                    </div>
                    <div className="text-right updateCbBtn">
                        <Link to="/">UPDATE</Link>
                    </div>
                    <div className="whatNeedSect">
                        <input type="text" className="whatneedtodone" placeholder="What needs to be done!" />
                        <button className="addTaskBtn">ADD TASK</button>
                    </div>

                </div>                                
            </div>                          
        </div>
                    
    );
}

export default AdminDashboard;