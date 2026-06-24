import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [passwordSaved, setPasswordSaved] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.name || 'Eden Mulugeta',
    email: user?.email || 'eden@company.com',
    phone: '+1 (555) 234-5678',
    department: 'Engineering',
    role: user?.role || 'Admin',
    location: 'Addis Ababa, Ethiopia',
    joinDate: 'January 15, 2024',
    bio: 'Experienced payroll manager with 5+ years in HR and finance operations.',
  });
  const [passwords, setPasswords] = useState({ current: '', newPass: '', confirm: '' });
  const [passError, setPassError] = useState('');
  const handleSave = () => { setSaved(true); setIsEditing(false); setTimeout(() => setSaved(false), 3000); };
  const handlePasswordChange = () => {
    setPassError('');
    if (!passwords.current) return setPassError('Please enter your current password.');
    if (passwords.newPass.length < 6) return setPassError('New password must be at least 6 characters.');
    if (passwords.newPass !== passwords.confirm) return setPassError('Passwords do not match.');
    setPasswordSaved(true);
    setPasswords({ current: '', newPass: '', confirm: '' });
    setTimeout(() => setPasswordSaved(false), 3000);
  };
  const inputClass = 'w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-slate-50 disabled:text-slate-400';
  const activityLog = [
    { action: 'Logged in', time: 'Today, 12:30 PM', icon: '🔐' },
    { action: 'Approved payroll for Rohan Patel', time: 'Today, 11:15 AM', icon: '✅' },
    { action: 'Added employee Sara Ahmed', time: 'Yesterday, 3:45 PM', icon: '👤' },
    { action: 'Generated June payroll report', time: 'Yesterday, 2:00 PM', icon: '📊' },
    { action: 'Updated employee James Smith', time: '2 days ago', icon: '✏️' },
    { action: 'Rejected payroll for Maria Lopez', time: '3 days ago', icon: '❌' },
  ];return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">My Profile</h1>
        <p className="mt-1 text-slate-500">Manage your account settings and preferences.</p>
      </div>
      <div className="rounded-2xl bg-white shadow-sm overflow-hidden">
        <div className="h-24 bg-gradient-to-r from-blue-500 to-blue-700" />
        <div className="px-6 pb-6">
          <div className="flex items-end justify-between -mt-10">
            <div className="flex items-end gap-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-md border-4 border-white text-3xl font-bold text-blue-600">
                {profile.name.charAt(0)}
              </div>
              <div className="mb-1">
                <h2 className="text-xl font-bold text-slate-800">{profile.name}</h2>
                <p className="text-sm text-slate-500">{profile.role} · {profile.department}</p>
              </div>
            </div>
            <span className="mb-1 rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">● Active</span>
          </div>
        </div>
      </div>
      <div className="flex gap-1 rounded-xl bg-slate-100 p-1 w-fit">
        {['profile', 'security', 'activity'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded-lg px-4 py-2 text-sm font-medium capitalize transition ${activeTab === tab ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            {tab === 'profile' ? '👤 Profile' : tab === 'security' ? '🔐 Security' : '📋 Activity'}
          </button>
        ))}
      </div>
      {activeTab === 'profile' && (
        <div className="rounded-2xl bg-white shadow-sm p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-6">Profile Details</h3>
          <p className="text-sm text-slate-600">Name: {profile.name}</p>
          <p className="text-sm text-slate-600">Email: {profile.email}</p>
          <p className="text-sm text-slate-600">Department: {profile.department}</p>
        </div>
      )}
      {activeTab === 'security' && (
        <div className="rounded-2xl bg-white shadow-sm p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-6">Security Settings</h3>
          <p className="text-sm text-slate-600">Manage your password and login preferences.</p>
        </div>
      )}
      {activeTab === 'activity' && (
        <div className="rounded-2xl bg-white shadow-sm p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-6">Recent Activity</h3>
          <div className="space-y-3">
            {activityLog.map((item, i) => (
              <div key={i} className="flex items-center gap-4 rounded-xl bg-slate-50 px-4 py-3">
                <span className="text-2xl">{item.icon}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-700">{item.action}</p>
                  <p className="text-xs text-slate-400">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;