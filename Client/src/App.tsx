import React from 'react';
import Axios from 'axios';
import { Employees } from './types/types';

const App = () => {
    const [employees, setEmployees] = React.useState<Employees[]>([]);
    const [isFormVisible, setIsFormVisible] = React.useState<boolean>(false);
    const [currentEmployeeId, setCurrentEmployeeId] = React.useState<number | null>(null);

    const [firstName, setFirstName] = React.useState<string>('');
    const [lastName, setLastName] = React.useState<string>('');
    const [salary, setSalary] = React.useState<number | null>(null);
    const [email, setEmail] = React.useState<string>('');
    const [title, setTitle] = React.useState<string>('');

    React.useEffect(() => {
        fetchAllEmployees();
    }, []);

    const fetchAllEmployees = () => {
        Axios.get('http://localhost:3001/employees').then(response => {
            setEmployees(response.data);
        });
    };

    const deleteEmployee = (id: number) => {
        Axios.delete(`http://localhost:3001/employees/${id}`).then(() => {
            setEmployees(employees.filter(employee => employee.id !== id));
            fetchAllEmployees();
        });
    };

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const employeeData = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            salary: salary,
            title: title
        };

        if (currentEmployeeId == null) {
            Axios.post('http://localhost:3001/employees', employeeData).then(() => {
                fetchAllEmployees();
                resetForm();
                setIsFormVisible(false);
            });
        } else {
            Axios.put(`http://localhost:3001/employees/${currentEmployeeId}`, employeeData).then(() => {
                fetchAllEmployees();
                resetForm();
                setIsFormVisible(false);
                setCurrentEmployeeId(null);
            });
        }
    };

    const editEmployee = (employee: Employees) => {
        setFirstName(employee.first_name);
        setLastName(employee.last_name);
        setEmail(employee.email);
        setSalary(employee.salary);
        setTitle(employee.title);
        setCurrentEmployeeId(employee.id);
        setIsFormVisible(true);
        window.scrollTo({ top: 0, behavior: 'smooth' })
    };

    const resetForm = () => {
        setFirstName('');
        setLastName('');
        setEmail('');
        setSalary(null);
        setTitle('');
        setCurrentEmployeeId(null);
    };

    return (
        <div className="max-w-[1260px] mx-auto">
            <h1 className='text-4xl font-semibold pt-6'>Employee Management Software</h1>
            <div className='space-x-2 my-6'>
                <button
                    className='text-lg bg-blue-600 rounded-md text-white px-5 py-2 focus:bg-blue-700'
                    onClick={() => setIsFormVisible(!isFormVisible)}
                >
                    {currentEmployeeId == null ? 'Add Employee' : 'Cancel Edit'}
                </button>
            </div>
            <form className={`${isFormVisible ? 'block' : 'hidden'} mb-6`} onSubmit={handleFormSubmit}>
                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="first_name"
                        value={firstName}
                        placeholder="First Name"
                        className="p-2 px-3 w-full rounded-md outline-none border"
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        name="last_name"
                        value={lastName}
                        placeholder="Last Name"
                        className="p-2 px-3 w-full rounded-md outline-none border"
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Email"
                        className="p-2 px-3 w-full rounded-md outline-none border"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="number"
                        name="salary"
                        value={salary ?? ''}
                        placeholder="Salary"
                        className="p-2 px-3 w-full rounded-md outline-none border"
                        onChange={(e) => setSalary(Number(e.target.value))}
                        required
                    />
                    <input
                        type="text"
                        name="title"
                        value={title}
                        placeholder="Job Title"
                        className="p-2 px-3 w-full rounded-md outline-none border"
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-green-500 text-white px-5 py-2 rounded-lg mt-4 hover:bg-green-600"
                >
                    {currentEmployeeId == null ? 'Add Employee' : 'Update Employee'}
                </button>
            </form>
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr className="bg-gray-100 text-gray-700 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-left">No.</th>
                        <th className="py-3 px-6 text-left">First Name</th>
                        <th className="py-3 px-6 text-left">Last Name</th>
                        <th className="py-3 px-6 text-left">Email</th>
                        <th className="py-3 px-6 text-left">Salary</th>
                        <th className="py-3 px-6 text-left">Job Title</th>
                        <th colSpan={2} className="py-3 px-6 text-center">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {employees.length > 0 ? (
                        employees.map((employee, i) => (
                            <tr key={employee.id} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6 text-left whitespace-nowrap">{i + 1}</td>
                                <td className="py-3 px-6 text-left">{employee.first_name}</td>
                                <td className="py-3 px-6 text-left">{employee.last_name}</td>
                                <td className="py-3 px-6 text-left">{employee.email}</td>
                                <td className="py-3 px-6 text-left">{employee.salary}</td>
                                <td className="py-3 px-6 text-left">{employee.title}</td>
                                <td className="py-3 px-4 text-right">
                                    <button
                                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                                        onClick={() => editEmployee(employee)}
                                    >
                                        Edit
                                    </button>
                                </td>
                                <td className="py-3 text-left">
                                    <button
                                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                                        onClick={() => deleteEmployee(employee.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={8} className="py-3 px-6 text-center">No Employees</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default App;
