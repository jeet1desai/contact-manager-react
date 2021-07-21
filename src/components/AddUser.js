import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const AddUser = () => {
    const history = useHistory();

    const [user, setUser] = useState({
        name: '',
        username: '',
        email: '',
        phone: '',
        website: '',
        img: null,
        imgName: '',
        gender: '',
        error:{

        }
    });

    // const [error, setError] = useState({});
    

    const { name, username, email, phone, website, img, imgName, gender, error } = user;


    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }
    const onFileChange = (e) => {
        var selectedFile = e.target.files[0];
        let reader = new FileReader();
        reader.onloadend = () => {
            setUser({ ...user, [e.target.name]: reader.result, imgName: selectedFile.name });
        }
        reader.readAsDataURL(selectedFile)
    }

    function validateForm() {
        let formIsValid = true;
        let errors = {};

        if (name.length === 0) {
            errors['ename'] = "Please enter your name";
            formIsValid = false;
        }

        if (username.length === 0) {
            errors['eusername'] = "Please enter your username";
            formIsValid = false;
        }

        if (email.length === 0) {
            errors['eemail'] = "Please enter your email";
            formIsValid = false;
        }

        if (username.length > 0) {
            if (!username.match(/^[a-zA-Z ]*$/)) {
                errors["username"] = "*Please enter alphabet characters only.";
                formIsValid = false;
            }
        }


        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (email.length > 0) {
            if (!pattern.test(email)) {
                errors["eemail"] = "*Please enter valid email-ID.";
                formIsValid = false;
            }
        }

        if (phone.length > 0) {
            if (!phone.match(/^[0-9]{10}$/)) {
                errors["ephone"] = "*Please enter valid mobile no.";
                formIsValid = false;
            }
        }

        setUser({...user, error: errors});

        console.log(user);

        return formIsValid;
    }


    const AddUser = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            setUser({...user, error:{}});
            await axios.post("http://localhost:3001/user", user);
            history.push('/');
        }
    }



    return (
        <div className="container">
            <h2 className="my-4">Add User</h2>
            <form onSubmit={AddUser}>
                <div className="mb-3 form-group">
                    <label htmlFor="name" className="form-label">Name *</label>
                    <input type="text" className="form-control"
                        id="name" name="name"
                        placeholder="Enter Name"
                        value={name}
                        onChange={(e) => onInputChange(e)}
                    />
                    <small className="text-danger">{error.ename}</small>
                </div>
                <div className="mb-3 form-group">
                    <label htmlFor="username" className="form-label">UserName *</label>
                    <input type="text" className="form-control"
                        id="username" name="username"
                        placeholder="Enter UserName"
                        value={username}
                        onChange={(e) => onInputChange(e)}
                    />
                    <small className="text-danger">{error.eusername}</small>
                </div>
                <div className="mb-3 form-group">
                    <label htmlFor="email" className="form-label">Email *</label>
                    <input type="text" className="form-control"
                        id="eamil" name="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => onInputChange(e)}
                    />
                    <small className="text-danger">{error.eemail}</small>
                </div>
                <div className="mb-3 form-group">
                    <label htmlFor="phoneno" className="form-label">Phone No</label>
                    <input type="text" className="form-control"
                        id="phoneno" name="phone"
                        placeholder="Enter Phone No"
                        value={phone}
                        onChange={(e) => onInputChange(e)}
                    />
                    <small className="text-danger">{error.ephone}</small>
                </div>
                <div className="mb-3 form-group">
                    <label htmlFor="website" className="form-label">Website</label>
                    <input type="text" className="form-control"
                        id="website" name="website"
                        placeholder="Enter Website  Address"
                        value={website}
                        onChange={(e) => onInputChange(e)}
                    />
                </div>
                <div className="mb-3 form-group">
                    <label htmlFor="gender" className="form-label">Gender</label>
                    <select className="form-control"
                        id="gender" name="gender"
                        value={gender} onChange={(e) => onInputChange(e)}
                    >
                        <option value=''>Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="unknown">Unknown</option>
                    </select>
                </div>
                <div className="mb-3 form-group">
                    <label htmlFor="img" className="form-label">User Image</label>
                    <input id="img" type="file" className="form-control"
                        name="img" onChange={(e) => onFileChange(e)}
                    />
                </div>
                <button type="submit" className="btn btn-primary mb-5">Add</button>
            </form>
        </div>
    )
}

export default AddUser;
