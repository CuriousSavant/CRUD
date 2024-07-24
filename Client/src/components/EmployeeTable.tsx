import React from 'react';
import { Employees } from '../types/types';

interface EmployeeTableProps {
    employees: Employees[];
    onEdit: (employee: Employees) => void;
    onDelete: (id: number) => void;
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({ employees, onEdit, onDelete }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr className="bg-gray-100 text-gray-700 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-left">Id</th>
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
                            <tr key={employee.id} className={`border-b border-gray-200 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`}>
                                <td className="py-3 px-6 text-left whitespace-nowrap">{i + 1}</td>
                                <td className="py-3 px-6 text-left">{employee.first_name}</td>
                                <td className="py-3 px-6 text-left">{employee.last_name}</td>
                                <td className="py-3 px-6 text-left">{employee.email}</td>
                                <td className="py-3 px-6 text-left">{employee.salary}</td>
                                <td className="py-3 px-6 text-left">{employee.title}</td>
                                <td className="py-3 px-4 text-right">
                                    <button
                                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                                        onClick={() => onEdit(employee)}
                                    >
                                        Edit
                                    </button>
                                </td>
                                <td className="py-3 text-left">
                                    <button
                                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                                        onClick={() => onDelete(employee.id)}
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

export default EmployeeTable;
