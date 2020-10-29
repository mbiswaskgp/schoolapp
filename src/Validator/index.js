import { isEmpty, isEmail } from "./validations";

const loginValidate = data => {
    let errors = {};
    
    if (isEmpty(data.useremail)) {
        errors.useremail = "This field is required";
    }else if (!isEmail(data.useremail)) {
        errors.useremail = "Enter valid email";
    }

    if (isEmpty(data.userpassword)) {
        errors.userpassword = "This field is required";
    }
    console.log(errors);
    return {
        errors,
        isValid: isEmpty(errors)
    };
};

const createTutorValidate = data => {
    console.log(data);
    let errors = {};
    if (isEmpty(data.fname)) {
        errors.fname = "This field is required";
    }
    if (isEmpty(data.lname)) {
        errors.lname = "This field is required";
    }
    if (isEmpty(data.lname)) {
        errors.lname = "This field is required";
    }
    if (isEmpty(data.email)) {
        errors.email = "This field is required";
    }else if (!isEmail(data.email)) {
        errors.email = "Enter valid email";
    }
    
    if (isEmpty(data.contact_number)) {
        errors.contact_number = "This field is required";
    }
    
    if (data.subject_id[0]==null) {
        errors.subject_id = "This field is required";
    }
    
    if (data.level_id[0]==null) {
        errors.level_id = "This field is required";
    }
    
    console.log(errors);
    return {
        errors,
        isValid: isEmpty(errors)
    };
};

const createLearnerValidate = data => {
    console.log(data);
    let errors = {};
    if (isEmpty(data.fname)) {
        errors.fname = "This field is required";
    }
    if (isEmpty(data.lname)) {
        errors.lname = "This field is required";
    }
    if (isEmpty(data.email)) {
        errors.email = "This field is required";
    }else if (!isEmail(data.email)) {
        errors.email = "Enter valid email";
    }
    if (isEmpty(data.contact_number)) {
        errors.contact_number = "This field is required";
    }
    if (data.level_id[0]==null) {
        errors.level_id = "This field is required";
    }
    if (isEmpty(data.parent_name)) {
        errors.parent_name = "This field is required";
    }
    console.log(errors);
    return {
        errors,
        isValid: isEmpty(errors)
    };
};

export default {
    loginValidate,
    createTutorValidate,
    createLearnerValidate
};
