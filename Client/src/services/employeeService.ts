import axios from 'axios'
import { Employees } from '../types/types';

const BASE_URL = 'http://localhost:3001/employees';

export const fetchAllEmployees = async (): Promise<Employees[]> => {
    const response = await axios.get(BASE_URL)
    return response.data
}

export const addEmployees = async (employeesData: Omit<Employees, "id">): Promise<void> => {
    await axios.post(BASE_URL, employeesData);
}

export const updateEmployees = async (id: number, employeesData: Omit<Employees, 'id'>): Promise<void> => {
    await axios.put(`${BASE_URL}/${id}`, employeesData);
}

export const deleteEmployees = async (id: number): Promise<void> => {
    await axios.delete(`${BASE_URL}/${id}`)
}