import React, { useState, useEffect } from 'react';
import PageLayout from "@/components/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useKeyboardShortcuts } from '@/utils/keyboardShortcuts';
import { useAuth } from '@/features/auth/AuthContext';

const KeyboardShortcuts = () => {
  const [pressedKeys, setPressedKeys] = useState<string[]>([]);
  const { user } = useAuth();

  // This is just for the toggleSidebar parameter; in this component we don't actually use it
  const { shortcuts } = useKeyboardShortcuts(() => { });

  // Group shortcuts by scope
  const groupedShortcuts = shortcuts.reduce((acc, shortcut) => {
    if (!acc[shortcut.scope]) {
      acc[shortcut.scope] = [];
    }
    acc[shortcut.scope].push(shortcut);
    return acc;
  }, {} as Record<string, typeof shortcuts>);

  // For real-time key display feature
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't capture keys when typing in input fields
      if (
        ['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as Element).tagName)
      ) {
        return;
      }

      const keysList: string[] = [];
      if (e.ctrlKey) keysList.push('Ctrl');
      if (e.shiftKey) keysList.push('Shift');
      if (e.altKey) keysList.push('Alt');

      // Add the actual key if it's not a modifier
      if (!['Control', 'Shift', 'Alt'].includes(e.key)) {
        keysList.push(e.key);
      }

      setPressedKeys(keysList);

      // Clear the pressed keys after a short delay
      // setTimeout(() => setPressedKeys([]), 2000);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const formatScopeTitle = (scope: string) => {
    return scope.charAt(0).toUpperCase() + scope.slice(1);
  };

  return (
    <PageLayout title="Keyboard Shortcuts" actionButton={null} showSearch={false}>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Keyboard Shortcuts</CardTitle>
            <CardDescription>
              Boost your workflow efficiency with these keyboard shortcuts. These shortcuts are designed to help you navigate and interact with Cura Agent more quickly.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {pressedKeys.length > 0 && (
              <div className="mb-8 flex items-center justify-center">
                <div className="bg-gray-100 p-4 rounded-md">
                  <p className="text-sm text-gray-500 mb-2">Pressed Keys:</p>
                  <div className="flex gap-2">
                    {pressedKeys.map((key, index) => (
                      <Badge key={index} variant="outline" className="px-3 py-1 bg-white">
                        {key}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {Object.entries(groupedShortcuts).map(([scope, shortcutList]) => (
              <div key={scope} className="mb-8">
                <h3 className="text-lg font-medium mb-4">{formatScopeTitle(scope)} Shortcuts</h3>
                <Table>
                  <TableCaption>Shortcuts for {formatScopeTitle(scope)} context</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px]">Key Combination</TableHead>
                      <TableHead>Action</TableHead>
                      {user?.role === 'admin' && <TableHead>Role Restrictions</TableHead>}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {shortcutList.map((shortcut) => (
                      <TableRow key={shortcut.key}>
                        <TableCell className="font-mono">{shortcut.key}</TableCell>
                        <TableCell>{shortcut.description}</TableCell>
                        {user?.role === 'admin' && (
                          <TableCell>
                            {shortcut.roles ?
                              shortcut.roles.join(', ') :
                              <span className="text-gray-400">All roles</span>
                            }
                          </TableCell>
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tips for Using Shortcuts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="list-disc pl-5 space-y-2">
              <li>Shortcuts won't work when you're typing in input fields or text areas.</li>
              <li>Some shortcuts may only be available in specific contexts or for specific user roles.</li>
              <li>You can press <Badge variant="outline" className="px-2 py-0.5 bg-white">Ctrl + /</Badge> from anywhere to quickly return to this shortcuts guide.</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default KeyboardShortcuts;
