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
    _id: string;
    title: string;
    description: string;
    background: string;
    students: [{
        id: string;
        email: string;
    }];
};