import EmployeeForm from './components/EmployeeForm';
import EmployeeTable from './components/EmployeeTable';
import useEmployees from './hooks/useEmployees';

const App = () => {
    const {
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
    } = useEmployees();

    return (
        <div className="max-w-[1260px] mx-auto p-4">
            <h1 className='text-2xl sm:text-3xl md:text-4xl font-semibold pt-6'>Employee Management Software</h1>
            <div className='space-x-2 my-6'>
                <button
                    className='text-lg bg-blue-600 rounded-md text-white px-5 py-2 focus:bg-blue-700'
                    onClick={() => setIsFormVisible(!isFormVisible)}
                >
                    {currentEmployeeId == null ? 'Add Employee' : 'Cancel Edit'}
                </button>
            </div>
            <EmployeeForm
                isVisible={isFormVisible}
                firstName={firstName}
                lastName={lastName}
                salary={salary}
                email={email}
                title={title}
                setFirstName={setFirstName}
                setLastName={setLastName}
                setSalary={setSalary}
                setEmail={setEmail}
                setTitle={setTitle}
                handleFormSubmit={handleFormSubmit}
                currentEmployeeId={currentEmployeeId}
            />
            <EmployeeTable employees={employees} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
    );
}

export default App;
