import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Select,
    MenuItem,
} from '@mui/material';
import { Link } from 'react-router-dom';
import instance from '../config/axios';
import { useCookies } from 'react-cookie';

type User = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    role_id: number;
    phone: string;
};

const AdminPageUsers = () => {
    const [users, setUsers] = useState<User[]>([]);

    const [token] = useCookies(['bestproducts']);
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await instance.get<User[]>('/adminusers', {
                    headers: {
                        Authorization: token.bestproducts,
                    },
                });
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleRoleChange = async (userId: number, newRoleId: number) => {
        try {
            await instance.put(`/users/${userId}`, { role_id: newRoleId }, {
                headers: {
                    Authorization: token.bestproducts,
                }
            }); 

            setUsers((prevUsers) =>
                prevUsers.map((user) => (user.id === userId ? { ...user, role_id: newRoleId } : user))
            );
        } catch (error) {
            console.error('Error changing user role:', error);
        }
    };

    const handleDeleteUser = async (userId: number) => {
        try {
            await instance.delete(`/users/${userId}`, {
                headers: {
                    Authorization: token.bestproducts,
                }
            }); // Replace with your actual API endpoint
            // Update the local state after a successful user deletion
            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div>
            <h1>User List</h1>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.first_name}</TableCell>
                                <TableCell>{user.last_name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    <Select
                                        value={user.role_id}
                                        onChange={(e) => handleRoleChange(user.id, Number(e.target.value))}
                                    >
                                        <MenuItem value={1}>User</MenuItem>
                                        <MenuItem value={2}>Admin</MenuItem>
                                    </Select>
                                </TableCell>
                                <TableCell>{user.phone}</TableCell>
                                <TableCell>
                                    <Button variant="outlined" onClick={() => handleDeleteUser(user.id)}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default AdminPageUsers;