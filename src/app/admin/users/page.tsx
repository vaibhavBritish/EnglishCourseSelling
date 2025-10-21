"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUsers, deleteUser } from "../../../../redux/userSlice";
import { RootState } from "../../../../redux/store";
import { useRouter } from "next/navigation";

const AllUsers = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.user.users);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [adminuser, setAdminUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();

        if (!data.user || !data.user.isAdmin) {
          router.push("/auth/login?message=Access denied");
          return;
        }

        setAdminUser(data.user);
      } catch {
        router.push("/auth/login?message=Authentication failed");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  useEffect(() => {
    if (!adminuser) return;

    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/admin/allUsers");
        if (!res.ok) throw new Error("Failed to fetch users");
        const data = await res.json();
        dispatch(setUsers(Array.isArray(data) ? data : []));
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [dispatch, adminuser]);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/allUsers/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete user failed");
      dispatch(deleteUser(id));
    } catch (error) {
      console.log("Delete user failed:", error);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen text-xl">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        {error}
      </div>
    );

  if (!adminuser) return null;

  return (
    <div className="text-black">
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-2xl font-bold mb-4">All Users</h1>
        {users.length === 0 ? (
          <p className="text-gray-500">No users found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left py-2 px-4 border-b">Username</th>
                  <th className="text-left py-2 px-4 border-b">Email</th>
                  <th className="text-left py-2 px-4 border-b">Role</th>
                  <th className="text-left py-2 px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user: any) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border-b capitalize">
                      {user.username || user.name}
                    </td>
                    <td className="py-2 px-4 border-b">{user.email}</td>
                    <td className="py-2 px-4 border-b capitalize">
                      {user.isAdmin ? "admin" : "user"}
                    </td>
                    <td className="py-2 px-4 border-b capitalize">
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="text-white font-bold bg-red-600 px-3 py-2 cursor-pointer hover:bg-red-700 rounded-2xl"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllUsers;
