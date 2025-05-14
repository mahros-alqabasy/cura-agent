// Mock user data
type LoginMethod = 'email' | 'nationalId' | 'phone';

const MOCK_USERS = [
    {
        id: "1",
        email: "doctor@example.com",
        firstName: "Ahmed",
        lastName: "Yasser",
        role: "doctor",
        password: "password123", // In a real app, passwords would be hashed
        profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
        phone: "01000000000",
        nationalId: "29001010123456"
    },
    {
        id: "2",
        email: "admin@example.com",
        firstName: "Mahros",
        lastName: "Mohamed",
        role: "admin",
        password: "password123",
        profileImage: "https://randomuser.me/api/portraits/men/44.jpg",
        phone: "01111111111",
        nationalId: "29001010123457"
    },
    {
        id: "3",
        email: "nurse@example.com",
        firstName: "Karim",
        lastName: "Atwa",
        role: "nurse",
        password: "password123",
        profileImage: "https://randomuser.me/api/portraits/men/67.jpg",
        phone: "01222222222",
        nationalId: "29001010123458"
    },
    {
        id: "4",
        email: "patient@example.com",
        firstName: "Ali",
        lastName: "Ahmed",
        role: "patient",
        password: "password123",
        profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
        phone: "01333333333",
        nationalId: "29001010123459"
    }
];

import mockApi from "@/lib/mockApi";

// Extend mockAuthService to use mockApi for authentication
export const mockAuthService = {
    login: async (credential: string, password: string, method: LoginMethod = "email") => {
        // Use mockApi's authenticate method
        const response = await mockApi.authenticate(credential, password, method);

        // Store tokens and user data in localStorage
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify({ credential, method }));

        return response;
    },

    register: async (userData: any) => {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Check if user already exists
        if (MOCK_USERS.some(u => u.email === userData.email)) {
            throw new Error("User with this email already exists");
        }

        // In a real implementation, we would add the user to our database
        return { success: true };
    },

    logout: async () => {
        // Clear localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        return { success: true };
    },

    getCurrentUser: async () => {
        // Retrieve user data from localStorage
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
            throw new Error("User not found");
        }

        return JSON.parse(storedUser);
    },

    verifyToken: async () => {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 300));

        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error("Invalid token");
        }

        return { valid: true };
    }
};
