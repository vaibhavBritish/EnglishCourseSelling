"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUsers, deleteUser } from "../../../../redux/userSlice";
import { RootState } from "../../../../redux/store";
import { useRouter } from "next/navigation";
import AdminLayout from "@/component/AdminLayout";

const AllUsers = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.user.users);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [adminUser, setAdminUser] = useState<any>(null);
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
    if (!adminUser) return;

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
  }, [dispatch, adminUser]);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/allUsers/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete user failed");
      dispatch(deleteUser(id));
    } catch (error) {
      console.error("Delete user failed:", error);
    }
  };

  if (loading)
    return (
      <div className="flex items-center text-gray-500 justify-center min-h-screen text-xl">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        {error}
      </div>
    );

  if (!adminUser) return null;

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto p-8 text-gray-900">
        <h1 className="text-3xl font-bold mb-6 text-indigo-700">All Users</h1>

        {users.length === 0 ? (
          <p className="text-gray-500">No users found.</p>
        ) : (
          <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="min-w-full border border-gray-200">
              <thead className="bg-indigo-50">
                <tr>
                  <th className="text-left py-3 px-4 border-b font-semibold">Username</th>
                  <th className="text-left py-3 px-4 border-b font-semibold">Email</th>
                  <th className="text-left py-3 px-4 border-b font-semibold">Role</th>
                  <th className="text-left py-3 px-4 border-b font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user: any) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-2 px-4 border-b capitalize">
                      {user.username || user.name}
                    </td>
                    <td className="py-2 px-4 border-b">{user.email}</td>
                    <td className="py-2 px-4 border-b capitalize">
                      {user.isAdmin ? "Admin" : "User"}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors"
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
    </AdminLayout>
  );
};

export default AllUsers;