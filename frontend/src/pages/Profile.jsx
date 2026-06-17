import { useEffect, useState } from 'react';
import { get } from '../api/axios';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await get('/auth/profile');
        setProfile(data.data || data);
      } catch (err) {
        setError(err.message || 'Unable to load profile data. Please sign in.');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return Number.isNaN(date.getTime())
      ? 'N/A'
      : date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const renderRow = (label, value) => (
    <div className="flex items-center justify-between border-b border-slate-100 py-3 last:border-0">
      <span className="text-sm font-medium text-slate-500">{label}</span>
      <span className="text-sm text-slate-800">{value ?? 'N/A'}</span>
    </div>
  );

  if (loading) return <p className="text-sm text-slate-500">Loading profile...</p>;

  if (error) {
    return (
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-slate-800">Profile</h1>
        <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
      </div>
    );
  }

  if (!profile) {
    return <p className="text-sm text-slate-500">No profile data available.</p>;
  }

  const initials = profile.name
    ? profile.name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase()
    : 'PR';

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-3xl font-bold text-slate-800">My Profile</h1>

      <div className="rounded-2xl bg-white p-6 shadow-soft">
        <div className="flex items-center gap-4 border-b border-slate-100 pb-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-xl font-bold text-white">
            {initials}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-800">{profile.name || 'Unnamed Employee'}</h3>
            <p className="text-sm capitalize text-slate-500">{profile.role || 'Role not specified'}</p>
          </div>
        </div>

        <div className="mt-4">
          {renderRow('Email', profile.email)}
          {renderRow('Role', profile.role)}
          {renderRow('Joined', formatDate(profile.createdAt))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
