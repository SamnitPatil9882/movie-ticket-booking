export interface LoginCredentials {
  // email: string;
  id: number;
  password: string;
}

export interface User{
    id: number;
    name: string;
    age: number;
    phone_no: string;
    password_digest: string;
    role_id: number;
    created_at: string;
    updated_at: string;
}

export interface UserResponse {
  user: User;
  token: string;
}


export enum Role {
  admin = 1,
  user = 2,
}

export interface SignUpCredentials {
  role: Role;
  name: string;
  age: number;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export interface SignUpRequest {
  user: {
    name: string;
    age: number;
    phone_no: string;
    email: string;
    password: string;
    role_id: Role;
  };
}

export interface UserSignUpResponse {
    data:{
        token: string;
        user: {
          id: number;
          name: string;
          age: number;
          phone_no: string;
          role_id: Role;
          email: string;
          created_at: string;
          updated_at: string;
        };
    }
}

