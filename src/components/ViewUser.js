import React, { useState, useEffect } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import axios from 'axios';

const ViewUser = () => {

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

    const getData = async () => {
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
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="container my-5">
            <table className="table my-5">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Info</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="col">UserName</th>
                        <td>{username}</td>
                    </tr>
                    <tr>
                        <th scope="col">Name</th>
                        <td>{name}</td>
                    </tr>
                    <tr>
                        <th scope="col">Email</th>
                        <td>{email}</td>
                    </tr>
                    <tr>
                        <th scope="col">Phone No</th>
                        <td>{phone}</td>
                    </tr>
                    <tr>
                        <th scope="col">Website</th>
                        <td>{website}</td>
                    </tr>
                    <tr>
                        <th scope="col">Gender</th>
                        <td>{gender}</td>
                    </tr>
                    <tr>
                    <th scope="col">User Image</th>
                    <td><img src={img} title={imgName} alt="icon" width="200" /></td>
                    </tr>
                </tbody>
            </table>
            <Link to="/" type="button" class="btn btn-outline-dark">Go to Home</Link>
        </div>
    )
}
export default ViewUser;