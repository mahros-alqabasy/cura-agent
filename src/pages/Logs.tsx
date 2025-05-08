
import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

// Mock data for logs
const initialLogs = [
  {
    id: "log1",
    timestamp: new Date(2025, 4, 8, 10, 30, 0),
    user: "Dr. Ahmed Mahros",
    userId: "d1",
    action: "Created patient record",
    details: "Created medical record for patient Eslam Mohamed",
    type: "create"
  },
  {
    id: "log2",
    timestamp: new Date(2025, 4, 8, 11, 15, 0),
    user: "Dr. Mohamed Ali",
    userId: "d2",
    action: "Updated prescription",
    details: "Updated prescription for patient Omar Ahmed",
    type: "update"
  },
  {
    id: "log3",
    timestamp: new Date(2025, 4, 8, 12, 0, 0),
    user: "Sherif Nouh",
    userId: "r2",
    action: "Scheduled appointment",
    details: "Scheduled appointment for patient Mahmoud Samir with Dr. Karim Hassan",
    type: "create"
  },
  {
    id: "log4",
    timestamp: new Date(2025, 4, 7, 9, 45, 0),
    user: "Adel Ibrahim",
    userId: "n1",
    action: "Updated patient vitals",
    details: "Updated vitals for patient Eslam Mohamed",
    type: "update"
  },
  {
    id: "log5",
    timestamp: new Date(2025, 4, 7, 14, 30, 0),
    user: "Dr. Karim Hassan",
    userId: "d3",
    action: "Created lab request",
    details: "Created lab request for patient Omar Ahmed",
    type: "create"
  },
  {
    id: "log6",
    timestamp: new Date(2025, 4, 7, 16, 0, 0),
    user: "System",
    userId: "system",
    action: "Backup completed",
    details: "Daily backup completed successfully",
    type: "system"
  },
  {
    id: "log7",
    timestamp: new Date(2025, 4, 6, 11, 30, 0),
    user: "Dr. Ahmed Mahros",
    userId: "d1",
    action: "Viewed patient record",
    details: "Viewed medical record of patient Mahmoud Samir",
    type: "read"
  },
  {
    id: "log8",
    timestamp: new Date(2025, 4, 6, 13, 15, 0),
    user: "Amgad Talaat",
    userId: "r3",
    action: "Canceled appointment",
    details: "Canceled appointment for patient Eslam Mohamed with Dr. Ahmed Mahros",
    type: "delete"
  },
  {
    id: "log9",
    timestamp: new Date(2025, 4, 6, 15, 45, 0),
    user: "System",
    userId: "system",
    action: "System update",
    details: "System updated to version 2.3.0",
    type: "system"
  },
  {
    id: "log10",
    timestamp: new Date(2025, 4, 5, 9, 0, 0),
    user: "Kareem Mostafa",
    userId: "n2",
    action: "Updated patient information",
    details: "Updated contact information for patient Omar Ahmed",
    type: "update"
  }
];

const Logs = () => {
  const [logs] = useState(initialLogs);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLogs = logs.filter(
    log =>
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      format(log.timestamp, "PPpp").toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getLogTypeBadge = (type) => {
    switch (type) {
      case "create":
        return <Badge className="bg-green-500">Create</Badge>;
      case "read":
        return <Badge className="bg-blue-500">View</Badge>;
      case "update":
        return <Badge className="bg-yellow-500">Update</Badge>;
      case "delete":
        return <Badge className="bg-red-500">Delete</Badge>;
      case "system":
        return <Badge className="bg-purple-500">System</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  return (
    <PageLayout 
      title="System Logs" 
      actionButton={null}
      onSearch={setSearchQuery}
    >
      <div className="space-y-4">
        <div className="bg-white rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>Type</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                    No logs found
                  </TableCell>
                </TableRow>
              ) : (
                filteredLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>{format(log.timestamp, "PPpp")}</TableCell>
                    <TableCell>{log.user}</TableCell>
                    <TableCell>{log.action}</TableCell>
                    <TableCell className="max-w-md truncate">{log.details}</TableCell>
                    <TableCell>{getLogTypeBadge(log.type)}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </PageLayout>
  );
};

export default Logs;
