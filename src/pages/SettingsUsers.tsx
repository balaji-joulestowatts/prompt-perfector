import { USERS } from '@/data/constants';

const SettingsUsers = () => (
  <div className="space-y-6 animate-fade-in">
    <h1 className="text-2xl font-bold">User Management</h1>
    <div className="bg-card rounded-lg shadow-card overflow-hidden">
      <table className="w-full text-table">
        <thead><tr className="bg-table-header">{['Name', 'Email', 'Role', 'Status', 'Last Login'].map(h => <th key={h} className="px-4 py-2 text-left text-xs font-semibold">{h}</th>)}</tr></thead>
        <tbody>
          {USERS.map(u => (
            <tr key={u.email} className="border-t border-border">
              <td className="px-4 py-2 font-medium">{u.name}</td>
              <td className="px-4 py-2 font-mono text-xs">{u.email}</td>
              <td className="px-4 py-2">{u.role}</td>
              <td className="px-4 py-2"><span className="text-xs bg-success/10 text-success px-2 py-0.5 rounded font-medium">Active</span></td>
              <td className="px-4 py-2 text-muted-foreground">23 Jun 2025</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
export default SettingsUsers;
