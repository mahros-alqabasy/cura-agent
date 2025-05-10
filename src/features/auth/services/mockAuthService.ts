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
        firstName: "Sara",
        lastName: "Ahmed",
        role: "patient",
        password: "password123",
        profileImage: "https://randomuser.me/api/portraits/women/32.jpg",
        phone: "01333333333",
        nationalId: "29001010123459"
    }
];

// Mock auth service
export const mockAuthService = {
    login: async (credential: string, password: string, method: LoginMethod = 'email') => {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));

        let user;

        // Find user based on provided credential type
        switch (method) {
            case 'email':
                user = MOCK_USERS.find(u => u.email === credential);
                break;
            case 'nationalId':
                user = MOCK_USERS.find(u => u.nationalId === credential);
                break;
            case 'phone':
                user = MOCK_USERS.find(u => u.phone === credential);
                break;
            default:
                throw new Error("Invalid authentication method");
        }

        if (!user || user.password !== password) {
            throw new Error("Invalid credentials");
        }

        // Remove password from returned user object
        const { password: _, ...userWithoutPassword } = user;

        // Store in localStorage to persist login
        localStorage.setItem('token', 'mock-jwt-token');
        localStorage.setItem('refreshToken', 'mock-refresh-token');
        localStorage.setItem('user', JSON.stringify(userWithoutPassword));

        return {
            access: 'mock-jwt-token',
            refresh: 'mock-refresh-token',
            user: userWithoutPassword
        };
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
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));

        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');

        return { success: true };
    },

    getCurrentUser: async () => {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 700));

        const storedUser = localStorage.getItem('user');
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