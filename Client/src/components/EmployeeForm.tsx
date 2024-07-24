import React from 'react';

interface EmployeeFormProps {
    isVisible: boolean;
    firstName: string;
    lastName: string;
    salary: number | null;
    email: string;
    title: string;
    setFirstName: React.Dispatch<React.SetStateAction<string>>;
    setLastName: React.Dispatch<React.SetStateAction<string>>;
    setSalary: React.Dispatch<React.SetStateAction<number | null>>;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
    handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    currentEmployeeId: number | null;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({
    isVisible,
    firstName,
    lastName,
    salary,
    email,
    title,
    setFirstName,
    setLastName,
    setSalary,
    setEmail,
    setTitle,
    handleFormSubmit,
    currentEmployeeId
}) => {
    return (
        <form className={`${isVisible ? 'block' : 'hidden'} mb-6`} onSubmit={handleFormSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
    );
}

export default EmployeeForm;