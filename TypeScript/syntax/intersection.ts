interface Person {
    name: string;
    age: number;
}

interface Employee {
    employeeId: string;
    role: string;
}

type EmployeePeerson = Person & Employee;

const peterParket: EmployeePeerson = {
    name: 'Peter Parket',
    age: 30,
    employeeId: 'EMP-001',
    role: 'Software Engineer'
}

