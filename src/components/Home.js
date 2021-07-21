import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {

    const [users, setUsers] = useState([])

    useEffect(() => {
        loadData();
    }, [])

    const loadData = async () => {
        const result = await axios.get("http://localhost:3001/user");
        // console.log(result.data);
        setUsers(result.data);
    }

    const deleteUser = async (id) => {
        await axios.delete(`http://localhost:3001/user/${id}`);
        loadData();
    }

    return (
        <div className="container">
            <div className="py-4">
                <div className="my-4 d-flex justify-content-between">
                    <h3>Home</h3>
                    <Link to="/user/add" className="btn btn-success me-2">Add User</Link>
                </div>
                

                <table className="table border shadow px-2">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">UserName</th>
                            <th scope="col">Email</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.length === 0 ? <tr>
                                        <td colSpan="5" className="text-center">No Record Found...</td></tr>:
                            users.map((user, index) => {
                                return (
                                    <tr key={index}>
                                        <th>{index+1}</th>
                                        <td>{user.name}</td>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <Link to={`/user/${user.id}`} className="btn btn-info mx-1">View</Link>
                                            <Link to={`/user/edit/${user.id}`} className="btn btn-outline-secondary mx-1">Edit</Link>
                                            <button onClick={()=> deleteUser(user.id)} className="btn btn-danger mx-1">Delete</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Home;
