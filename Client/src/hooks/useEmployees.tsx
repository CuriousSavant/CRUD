import React from 'react'
import { fetchAllEmployees, addEmployees, updateEmployees, deleteEmployees } from '../services/employeeService'
import { Employees } from './../types/types';

const useEmployees = () => {
    const [employees, setEmployees] = React.useState<Employees[]>([]);
    const [isFormVisible, setIsFormVisible] = React.useState<boolean>(false);
    const [currentEmployeeId, setCurrentEmployeeId] = React.useState<number | null>(null);

    const [firstName, setFirstName] = React.useState<string>('');
    const [lastName, setLastName] = React.useState<string>('');
    const [salary, setSalary] = React.useState<number | null>(null);
    const [email, setEmail] = React.useState<string>('');
    const [title, setTitle] = React.useState<string>('');

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchAllEmployees();
                setEmployees(data);
            } catch (error) {
                console.error('Error fetching employees:', error);
            }
        };

        fetchData();
    }, []);


    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const employeeData = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            salary: salary ?? 0,
            title: title,
        };

        try {
            if (currentEmployeeId == null) {
                await addEmployees(employeeData);
            } else {
                await updateEmployees(currentEmployeeId, employeeData);
            };
            resetForm();
            setIsFormVisible(false);
            fetchAllEmployees().then(setEmployees);
        } catch (error) {
            console.error('Error saving employee data:', error);
        }
    };

    const handleEdit = (employee: Employees) => {
        setFirstName(employee.first_name);
        setLastName(employee.last_name);
        setEmail(employee.email);
        setSalary(employee.salary);
        setTitle(employee.title);
        setCurrentEmployeeId(employee.id);
        setIsFormVisible(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteEmployees(id);
            setEmployees(employees.filter(employee => employee.id !== id));
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };

    const resetForm = () => {
        setFirstName('');
        setLastName('');
        setEmail('');
        setSalary(null);
        setTitle('');
        setCurrentEmployeeId(null);
    };

    return {
        employees,
        isFormVisible,
        currentEmployeeId,
        firstName,
        lastName,
        salary,
        email,
        title,
        setIsFormVisible,
        setFirstName,
        setLastName,
        setSalary,
        setEmail,
        setTitle,
        handleFormSubmit,
        handleEdit,
        handleDelete
    };
}

export default useEmployees