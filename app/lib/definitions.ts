export interface UserData {
    id: string;
    name: string;
    lastname: string;
    username: string;
    email: string;
    phone: string;
    password: string;
    role: string;
    signUpDate: Date;
    courses: [{
        id: string;
        title: string;
    }];
};

export interface CourseData {
    id: string;
    title: string;
    description: string;
    color: string;
    students: [{
        id: string;
        email: string;
    }];
};