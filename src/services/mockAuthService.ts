
// Mock user data
const MOCK_USERS = [
  {
    id: "1",
    email: "doctor@example.com",
    firstName: "John",
    lastName: "Smith",
    role: "doctor",
    password: "password123", // In a real app, passwords would be hashed
    profileImage: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: "2",
    email: "admin@example.com",
    firstName: "Michael",
    lastName: "Johnson",
    role: "admin",
    password: "password123",
    profileImage: "https://randomuser.me/api/portraits/men/44.jpg"
  },
  {
    id: "3",
    email: "nurse@example.com",
    firstName: "Robert",
    lastName: "Williams",
    role: "nurse",
    password: "password123",
    profileImage: "https://randomuser.me/api/portraits/men/67.jpg"
  }
];

// Mock auth service
export const mockAuthService = {
  login: async (email: string, password: string) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const user = MOCK_USERS.find(u => u.email === email);
    
    if (!user || user.password !== password) {
      throw new Error("Invalid email or password");
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
