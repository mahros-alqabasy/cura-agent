
import { useState, useEffect } from 'react';
import { toast } from '@/components/ui/sonner';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  nationalId: string;
  email: string;
  mobile: string;
  role: string;
  specialty?: string;
}

interface UseUserListProps {
  initialUsers?: User[];
  userType: string;
  searchQuery?: string;
}

export const useUserList = ({ initialUsers = [], userType, searchQuery = '' }: UseUserListProps) => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [filteredUsers, setFilteredUsers] = useState<User[]>(users);

  // Filter users based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredUsers(users);
      return;
    }

    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = users.filter(user => 
      user.firstName.toLowerCase().includes(lowerCaseQuery) || 
      user.lastName.toLowerCase().includes(lowerCaseQuery) || 
      user.email.toLowerCase().includes(lowerCaseQuery) ||
      user.nationalId.toLowerCase().includes(lowerCaseQuery) ||
      (user.specialty && user.specialty.toLowerCase().includes(lowerCaseQuery))
    );
    
    setFilteredUsers(filtered);
  }, [searchQuery, users]);

  const createUser = (userData: Omit<User, 'id'>) => {
    try {
      // In a real app, this would be an API call
      const newUser = {
        ...userData,
        id: `${userType.charAt(0)}${Date.now()}`, // Create a unique ID
      };

      setUsers(prevUsers => [...prevUsers, newUser]);
      toast.success(`${userType.charAt(0).toUpperCase()}${userType.slice(1)} created successfully`);
      return newUser;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to create user');
      setError(error);
      toast.error(`Failed to create ${userType}: ${error.message}`);
      throw error;
    }
  };

  const updateUser = (id: string, userData: Partial<User>) => {
    try {
      // In a real app, this would be an API call
      setUsers(prevUsers => 
        prevUsers.map(user => user.id === id ? { ...user, ...userData } : user)
      );
      toast.success(`${userType.charAt(0).toUpperCase()}${userType.slice(1)} updated successfully`);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to update user');
      setError(error);
      toast.error(`Failed to update ${userType}: ${error.message}`);
      throw error;
    }
  };

  const deleteUser = (id: string) => {
    try {
      // In a real app, this would be an API call
      setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
      toast.success(`${userType.charAt(0).toUpperCase()}${userType.slice(1)} deleted successfully`);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to delete user');
      setError(error);
      toast.error(`Failed to delete ${userType}: ${error.message}`);
      throw error;
    }
  };

  return {
    users: filteredUsers,
    allUsers: users,
    loading,
    error,
    createUser,
    updateUser,
    deleteUser,
  };
};
