export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'employee';
}

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  role: string;
  gender: 'Male' | 'Female' | 'Other';
  performance: number; // 0-100
  joinDate: string;
  salary: number;
}

export type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
};
