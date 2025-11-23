import { createAsyncThunk } from "@reduxjs/toolkit";
import type { User } from "../../types/data";

interface SignupPayload {
  name: string;
  email: string;
  password: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

interface UpdatePayload {
  name?: string;
  bio?: string;
  profilePhoto?: string;
  course_study?: string;
  academic_level?:string;
  habits?: [];
  actively_searching: boolean;
}

const USERS_DB_KEY = "mock_users_db"; // stored array of users
const USER_KEY = "user"; // logged in user

// Load database
function loadUsers(): User[] {
  const raw = localStorage.getItem(USERS_DB_KEY);
  return raw ? JSON.parse(raw) : [];
}

// Save database
function saveUsers(users: User[]) {
  localStorage.setItem(USERS_DB_KEY, JSON.stringify(users));
}

// Generate random user ID
function generateId() {
  return Math.random().toString(36).substring(2, 10);
}

/* -----------------------------------------
   SIGNUP
-------------------------------------------*/
export const signupUser = createAsyncThunk(
  "auth/signup",
  async ({ name, email, password }: SignupPayload, { rejectWithValue }) => {
    const users = loadUsers();

    // Check if email already exists
    const exists = users.find(u => u.email === email);
    if (exists) {
      return rejectWithValue("Email already exists");
    }

    // Create user
    const newUser: User & { password: string } = {
      id: generateId(),
      name,
      email,
      password,
      profilePhoto: "",
      bio: "",
      academic_level: "",
      habits: [],
      course_study:"",
      actively_searching: true
    };

    users.push(newUser);
    saveUsers(users);

    // Persist logged in user
    localStorage.setItem(USER_KEY, JSON.stringify(newUser));

    return {
      message: "Signup successful",
      user: newUser
    };
  }
);

/* -----------------------------------------
   LOGIN
-------------------------------------------*/
export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }: LoginPayload, { rejectWithValue }) => {
    const users = loadUsers();

    const user = users.find(u => u.email === email && u.password === password);

    if (!user) return rejectWithValue("Invalid email or password");

    localStorage.setItem(USER_KEY, JSON.stringify(user));

    return {
      message: "Login successful",
      user
    };
  }
);

/* -----------------------------------------
   UPDATE PROFILE
-------------------------------------------*/
export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (payload: UpdatePayload, { rejectWithValue }) => {
    const userRaw = localStorage.getItem(USER_KEY);
    if (!userRaw) return rejectWithValue("User not logged in");

    const loggedUser = JSON.parse(userRaw) as User & { password: string };

    const users = loadUsers();

    // Update fields
    const updatedUser = {
      ...loggedUser,
      ...payload
    };

    // Update DB list
    const updatedUsers = users.map(u => (u.id === loggedUser.id ? updatedUser : u));

    saveUsers(updatedUsers);
    localStorage.setItem(USER_KEY, JSON.stringify(updatedUser));

    return {
      message: "Profile updated",
      user: updatedUser
    };
  }
);

/* -----------------------------------------
   LOGOUT
-------------------------------------------*/
export const logoutUser = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem(USER_KEY);
  return { message: "Logged out successfully" };
});
