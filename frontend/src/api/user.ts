import axios from 'axios';
import type {UserData} from '../types.ts';

export const loginUser = async (
    email: string,
    password: string
): Promise<UserData> => {
    const response = await axios.post('http://localhost:8080/users/login', {
        email,
        password
    });
    return response.data;
};

export const getUserByEmail = async (email: string): Promise<UserData> => {
    const res = await axios.get(`http://localhost:8080/users/email/${email}`);
    return res.data;
};

export const updateUser = async (id: number, data: Partial<UserData>) => {
    const res = await axios.put(`http://localhost:8080/users/${id}`, data);
    return res.data;
};

export const deleteUser = async (id: number) => {
    const res = await axios.delete(`http://localhost:8080/users/${id}`);
    return res.data;
};