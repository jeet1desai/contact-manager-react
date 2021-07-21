import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';

const EditUser = () => {

    const history = useHistory();
    const { id } = useParams();

    const [user, setUser] = useState({
        name: "",
        username: '',
        email: '',
        phone: '',
        website: '',
        img: null,
        imgName: '',
        gender: '',
    });

    const { name, username, email, phone, website, img, imgName, gender } = user;

    const onInputChange = (e) => {
        // //console.log(e.target.value);
        // //console.log(e.target.name);
        setUser({ ...user, [e.target.name]: e.target.value });
        // console.log(user);
    }

    const onFileChange = (e) => {
        var selectedFile = e.target.files[0];
        let reader = new FileReader();
        reader.onloadend = () => {
            setUser({ ...user, [e.target.name]: reader.result, imgName: selectedFile.name });
        }
        reader.readAsDataURL(selectedFile)
        // console.log(reader);
    }

    const AddUser = async (e) => {
        e.preventDefault();

        // console.log(user);

        await axios.put(`http://localhost:3001/user/${id}`, user);

        setUser({
            name: "",
            username: '',
            email: '',
            phone: '',
            website: '',
            img: '',
            imgName: '',
            gender: '',
        })

        history.push('/');

    }

    const loadData = async () => {
        const res = await axios.get(`http://localhost:3001/user/${id}`);
        // console.log(res);

        setUser({
            name: res.data.name,
            username: res.data.username,
            email: res.data.email,
            phone: res.data.phone,
            website: res.data.website,
            img: res.data.img,
            imgName: res.data.imgName,
            gender: res.data.gender,
        });
        // setUser(res.data);
    }

    useEffect(() => {
        loadData();
    }, [])

    return (
        <div className="container">
            <h2 className="my-4">Edit User</h2>
            <form onSubmit={AddUser}>
                <div className="mb-3 form-group">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control"
                        id="name" name="name"
                        placeholder="Enter Name"
                        value={name}
                        onChange={(e) => onInputChange(e)}
                    />
                </div>
                <div className="mb-3 form-group">
                    <label htmlFor="username" className="form-label">UserName</label>
                    <input type="text" className="form-control"
                        id="username" name="username"
                        placeholder="Enter UserName"
                        value={username}
                        onChange={(e) => onInputChange(e)}
                    />
                </div>
                <div className="mb-3 form-group">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control"
                        id="eamil" name="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => onInputChange(e)}
                    />
                </div>
                <div className="mb-3 form-group">
                    <label htmlFor="phoneno" className="form-label">Phone No</label>
                    <input type="text" className="form-control"
                        id="phoneno" name="phone"
                        placeholder="Enter Phone No"
                        value={phone}
                        onChange={(e) => onInputChange(e)}
                    />
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
                    <small className="text-danger">{imgName}</small>
                </div>
                <button type="submit" className="btn btn-primary">Edit</button>
            </form>
        </div>
    )
}

export default EditUser;