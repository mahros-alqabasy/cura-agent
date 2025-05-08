
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Eye, Pencil, Trash, MoreVertical, Plus } from "lucide-react";
import UserForm from "./UserForm";
import { toast } from "@/components/ui/sonner";

interface UserListProps {
  users: any[];
  userType: "doctor" | "patient" | "nurse" | "receptionist";
  onUserCreate: (userData: any) => void;
  onUserUpdate: (id: string, userData: any) => void;
  onUserDelete: (id: string) => void;
  onUserView: (userData: any) => void;
}

const UserList = ({
  users,
  userType,
  onUserCreate,
  onUserUpdate,
  onUserDelete,
  onUserView,
}: UserListProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any | null>(null);

  const filteredUsers = users.filter(
    (user) =>
      user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.nationalId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateUser = (userData: any) => {
    onUserCreate(userData);
    toast.success(`New ${userType} created successfully`);
  };

  const handleUpdateUser = (userData: any) => {
    onUserUpdate(userData.id, userData);
    setEditingUser(null);
    toast.success(`${userType} updated successfully`);
  };

  const handleDeleteUser = () => {
    if (userToDelete) {
      onUserDelete(userToDelete);
      setUserToDelete(null);
      toast.success(`${userType} deleted successfully`);
    }
  };

  const openEditForm = (user: any) => {
    setEditingUser(user);
    setFormOpen(true);
  };

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">
          {capitalizeFirstLetter(userType)} List
        </h2>
        <Button onClick={() => setFormOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create {capitalizeFirstLetter(userType)}
        </Button>
      </div>
      
      <div className="bg-white rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>National ID</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Mobile</TableHead>
              {userType === "doctor" && <TableHead>Specialty</TableHead>}
              <TableHead className="w-[100px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={userType === "doctor" ? 6 : 5} className="text-center py-8 text-gray-500">
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
                    {user.firstName} {user.lastName}
                  </TableCell>
                  <TableCell>{user.nationalId}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.mobile}</TableCell>
                  {userType === "doctor" && <TableCell>{user.specialty || "General"}</TableCell>}
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onUserView(user)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => openEditForm(user)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setUserToDelete(user.id);
                            setDeleteDialogOpen(true);
                          }}
                          className="text-red-600"
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <UserForm
        open={formOpen}
        onOpenChange={setFormOpen}
        onSubmit={editingUser ? handleUpdateUser : handleCreateUser}
        editData={editingUser}
        userType={userType}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the user
              and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteUser} className="bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default UserList;
