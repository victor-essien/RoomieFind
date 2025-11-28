type roomStatusType = 'looking_for_roommate' | 'has_room'

// export interface User  {
// id: string;
// name: string;
// gender:string;
// password:string;
// email:string;
// profilePhoto: string;
// bio:string;
// course_study:string
// academic_level: string;
// campus:string;
// habits: {};
// actively_searching: boolean;
//  roomStatus: roomStatusType;
// }


export interface AuthState {
    user: User | null;
    loading: boolean;
    message: string | null;
    error: string | null
}
 export interface User {
  id: string;
  name:string;
  age?: number;
  gender?: string;
  email: string;
  password: string;
  photo: string;
  budget: number;
  university: string;
  bio:string;
  location?:string;
  academic_level: string;
  course_study:string;
  campus:string;
  roomStatus: string;
   habits?: {
    sleep?: string[];
    study?: string[];
    household?: string[];
    social?: string[];
  };
  roomDetails?: {
    price?: number;
    location?: string;
    description?: string;
  };
}