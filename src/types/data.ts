
export interface User  {
id: string;
name: string;
password:string;
email:string;
profilePhoto: string;
bio:string;
course_study:string
academic_level: string;
habits: [];
actively_searching: boolean;
}


export interface AuthState {
    user: User | null;
    loading: boolean;
    message: string | null;
    error: string | null
}