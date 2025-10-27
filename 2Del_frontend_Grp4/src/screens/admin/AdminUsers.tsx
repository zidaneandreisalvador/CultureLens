import React, { useState, useEffect } from 'react';
import { supabase } from '../../config/supabase';
import { EditIcon, TrashIcon, SaveIcon, XIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface User {
  userid: number;
  email: string;
  firstname: string;
  lastname: string;
  contactnumber?: string;
  preferredlanguage?: string;
  usertype?: string;
}

export const AdminUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingUser, setEditingUser] = useState<Partial<User>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchUsers = async () => {
    setIsLoading(true);
    const { data, error } = await supabase.from('Users').select('*').order('userid', { ascending: true });
    if (error) setError(error.message);
    else setUsers(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const startEdit = (user: User) => {
    setEditingId(user.userid);
    setEditingUser({ ...user });
  };

  const saveEdit = async (id: number) => {
    const { data, error } = await supabase
      .from('Users')
      .update(editingUser)
      .eq('userid', id)
      .select();
    if (error) setError(error.message);
    else {
      setUsers(users.map(u => (u.userid === id ? data[0] : u)));
      setEditingId(null);
      setEditingUser({});
    }
  };

  const deleteUser = async (id: number) => {
    const { error } = await supabase.from('Users').delete().eq('userid', id);
    if (error) setError(error.message);
    else setUsers(users.filter(u => u.userid !== id));
  };

  return (
    <div className="min-h-screen bg-[#fef7e0] p-8">
      {/* Back Button */}
      <center>
        <button
          onClick={() => navigate('/admin/dashboard')}
          className="mb-4 px-4 py-2 bg-[#754b34] text-[#fefcf0] rounded-lg font-serif font-semibold hover:bg-[#5d3a28] transition-all"
        >
          Back to Dashboard
        </button>
      </center>

      <h1 className="text-3xl font-bold text-[#754b34] mb-6 font-serif">Manage Users</h1>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">{error}</div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full border border-[#d4c4a8] rounded-lg bg-[#fcf8dd]">
          <thead>
            <tr className="bg-[#f5eccb]">
              <th className="px-2 py-2 border-b border-[#d4c4a8]">Email</th>
              <th className="px-2 py-2 border-b border-[#d4c4a8]">First Name</th>
              <th className="px-2 py-2 border-b border-[#d4c4a8]">Last Name</th>
              <th className="px-2 py-2 border-b border-[#d4c4a8]">Contact Number</th>
              <th className="px-2 py-2 border-b border-[#d4c4a8]">Preferred Language</th>
              <th className="px-2 py-2 border-b border-[#d4c4a8]">User Type</th>
              <th className="px-2 py-2 border-b border-[#d4c4a8]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={7} className="text-center p-4">
                  Loading users...
                </td>
              </tr>
            ) : (
              users.map(user =>
                editingId === user.userid ? (
                  <tr key={user.userid} className="text-sm text-[#754b34]">
                    {['email', 'firstname', 'lastname', 'contactnumber', 'preferredlanguage', 'usertype'].map(field => (
                      <td key={field} className="p-1 border-b border-[#d4c4a8]">
                        <input
                          type="text"
                          value={(editingUser as any)[field] || ''}
                          onChange={e => setEditingUser({ ...editingUser, [field]: e.target.value })}
                          className="p-1 border border-[#d4c4a8] rounded-lg w-full"
                        />
                      </td>
                    ))}
                    <td className="flex gap-1 p-1 border-b border-[#d4c4a8]">
                      <button onClick={() => saveEdit(user.userid)} className="text-green-600 hover:text-green-800">
                        <SaveIcon size={16} />
                      </button>
                      <button onClick={() => setEditingId(null)} className="text-red-600 hover:text-red-800">
                        <XIcon size={16} />
                      </button>
                    </td>
                  </tr>
                ) : (
                  <tr key={user.userid} className="text-sm text-[#754b34]">
                    <td className="p-2 border-b border-[#d4c4a8]">{user.email}</td>
                    <td className="p-2 border-b border-[#d4c4a8]">{user.firstname}</td>
                    <td className="p-2 border-b border-[#d4c4a8]">{user.lastname}</td>
                    <td className="p-2 border-b border-[#d4c4a8]">{user.contactnumber}</td>
                    <td className="p-2 border-b border-[#d4c4a8]">{user.preferredlanguage}</td>
                    <td className="p-2 border-b border-[#d4c4a8]">{user.usertype}</td>
                    <td className="flex gap-1 p-2 border-b border-[#d4c4a8]">
                      <button onClick={() => startEdit(user)} className="text-blue-600 hover:text-blue-800">
                        <EditIcon size={16} />
                      </button>
                      <button onClick={() => deleteUser(user.userid)} className="text-red-600 hover:text-red-800">
                        <TrashIcon size={16} />
                      </button>
                    </td>
                  </tr>
                )
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
