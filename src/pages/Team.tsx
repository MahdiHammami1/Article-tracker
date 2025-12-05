import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockUsers } from '@/data/mockData';
import { UserRole } from '@/types/article';
import { Mail, MoreVertical, UserPlus, Shield, Edit2, FileText } from 'lucide-react';

const getRoleBadgeColor = (role: UserRole) => {
  const colors: Record<UserRole, string> = {
    author: 'bg-status-submitted/10 text-status-submitted',
    reviewer: 'bg-status-review/10 text-status-review',
    editor: 'bg-status-published/10 text-status-published',
    admin: 'bg-primary/10 text-primary',
  };
  return colors[role];
};

const getRoleIcon = (role: UserRole) => {
  const icons: Record<UserRole, React.ElementType> = {
    author: Edit2,
    reviewer: FileText,
    editor: Shield,
    admin: Shield,
  };
  return icons[role];
};

export default function Team() {
  return (
    <AppLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 animate-fade-in">
          <div>
            <h1 className="font-display text-3xl font-bold tracking-tight">Team</h1>
            <p className="text-muted-foreground mt-1">
              Manage users and their roles
            </p>
          </div>
          <Button variant="gradient">
            <UserPlus className="w-4 h-4 mr-2" />
            Invite User
          </Button>
        </div>

        {/* Role Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {(['author', 'reviewer', 'editor', 'admin'] as UserRole[]).map((role, index) => {
            const Icon = getRoleIcon(role);
            const count = mockUsers.filter(u => u.role === role).length;
            return (
              <Card key={role} className="animate-slide-up" style={{ animationDelay: `${index * 50}ms` }}>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getRoleBadgeColor(role)}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{count}</p>
                    <p className="text-sm text-muted-foreground capitalize">{role}s</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Team Members */}
        <Card className="animate-slide-up" style={{ animationDelay: '200ms' }}>
          <CardHeader>
            <CardTitle>Team Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockUsers.map((user, index) => {
                const RoleIcon = getRoleIcon(user.role);
                return (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent/50 transition-colors animate-slide-up"
                    style={{ animationDelay: `${250 + index * 50}ms` }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-semibold">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h4 className="font-medium">{user.name}</h4>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={getRoleBadgeColor(user.role)}>
                        <RoleIcon className="w-3 h-3 mr-1" />
                        {user.role}
                      </Badge>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
