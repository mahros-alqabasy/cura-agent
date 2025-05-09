
import { useState } from 'react';
import { MoreHorizontal, Trash, Pencil, Eye } from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/shared/ui/table';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/shared/ui/dropdown-menu';
import { Button } from '@/shared/ui/button';
import { Dialog, DialogContent } from '@/shared/ui/dialog';
import UserForm from './UserForm';
import DeleteConfirmation from './DeleteConfirmation';

interface UserListProps {
  users: any[];
  userType: 'doctor' | 'patient' | 'nurse' | 'receptionist';
  onUserCreate: (userData: any) => void;
  onUserUpdate: (id: string, userData: any) => void;
  onUserDelete: (id: string) => void;
  onUserView: (user: any) => void;
}

const UserList = ({ 
  users, 
  userType, 
  onUserCreate, 
  onUserUpdate, 
  onUserDelete,
  onUserView 
}: UserListProps) => {
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleEdit = (user: any) => {
    setSelectedUser(user);
    setFormOpen(true);
  };

  const handleView = (user: any) => {
    onUserView(user);
  };

  const handleDelete = (user: any) => {
    setSelectedUser(user);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedUser) {
      onUserDelete(selectedUser.id);
      setDeleteDialogOpen(false);
      setSelectedUser(null);
    }
  };

  const handleSubmit = (userData: any) => {
    if (selectedUser) {
      onUserUpdate(selectedUser.id, userData);
    } else {
      onUserCreate(userData);
    }
    setFormOpen(false);
    setSelectedUser(null);
  };

  // Determine which columns to show based on userType
  const getColumns = () => {
    const columns = [
      { key: 'name', header: 'Name' },
      { key: 'email', header: 'Email' },
      { key: 'mobile', header: 'Phone Number' },
    ];

    if (userType === 'doctor') {
      columns.push({ key: 'specialty', header: 'Specialty' });
    }

    if (userType !== 'patient') {
      columns.push({ key: 'nationalId', header: 'National ID' });
    }

    columns.push({ key: 'actions', header: 'Actions' });

    return columns;
  };

  const columns = getColumns();

  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.key}>{column.header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length > 0 ? (
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  {userType === 'doctor' ? 'Dr. ' : ''}
                  {user.firstName} {user.lastName}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.mobile}</TableCell>
                {userType === 'doctor' && <TableCell>{user.specialty}</TableCell>}
                {userType !== 'patient' && <TableCell>{user.nationalId}</TableCell>}
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleView(user)}>
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEdit(user)}>
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-red-600" 
                        onClick={() => handleDelete(user)}
                      >
                        <Trash className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center py-8">
                No {userType}s found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <UserForm
        open={formOpen}
        onOpenChange={setFormOpen}
        onSubmit={handleSubmit}
        userType={userType}
        defaultValues={selectedUser}
      />

      <DeleteConfirmation
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={confirmDelete}
        title={`Delete ${userType}`}
        description={`Are you sure you want to delete ${selectedUser?.firstName} ${selectedUser?.lastName}? This action cannot be undone.`}
      />
    </div>
  );
};

export default UserList;
