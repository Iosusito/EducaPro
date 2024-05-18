export interface User {
    id: string;
    name: string;
    lastname: string;
    username: string;
    email: string;
    phone: string;
    password: string;
    role: string;
    signUpDate: Date;
}

export interface Course {
    id: string;
    title: string;
    description: string;
    color: string;
    Students: User[];
};