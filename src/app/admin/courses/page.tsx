"use client";
import AdminLayout from '@/component/AdminLayout';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { useRouter } from 'next/navigation';
import { setCourses } from '../../../../redux/courseSlice';
import Link from 'next/link';

const Courses = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const courses = useSelector((state: RootState) => state.course.courses);
    const [admin, setAdmin] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');


    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch("/api/auth/me");
                const data = await res.json();

                if (!data.user || !data.user.isAdmin) {
                    router.push("/auth/login?message=Access denied");
                    return;
                }
                setAdmin(data.user);
            } catch (error) {
                router.push("/auth/login?message=Authentication failed");
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, [router]);


    useEffect(() => {
        if (!admin) return;

        const fetchCourses = async () => {
            setLoading(true);
            try {
                const res = await fetch("/api/admin/course");
                const data = await res.json();

                if (Array.isArray(data)) {
                    dispatch(setCourses(data));
                } else if (data.courses) {
                    dispatch(setCourses(data.courses));
                } else {
                    dispatch(setCourses([]));
                }
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, [dispatch, admin]);


    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this course?")) return;

        try {
            const res = await fetch(`/api/admin/course/${id}`, {
                method: "DELETE",
            });

            if (!res.ok) throw new Error("Failed to delete course");
            dispatch(setCourses(courses.filter(course => course.id !== id)));
        } catch (err: any) {
            alert(err.message || "Something went wrong!");
        }
    };

    if (loading) {
        return (
            <div className='min-h-screen text-gray-500 flex justify-center items-center text-xl'>
                <h1>Loading...</h1>
            </div>
        );
    }

    if (error) {
        return (
            <div className='min-h-screen text-red-500 flex justify-center items-center text-xl'>
                <h1>{error}</h1>
            </div>
        );
    }

    return (
        <div className='text-black'>
            <AdminLayout>
                <h1 className='text-2xl font-bold text-indigo-700 mb-4'>All Courses</h1>
                <div className='flex justify-end mb-4'>
                    <Link href="/admin/courses/addCourse">
                        <button className='bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-all duration-200 cursor-pointer'>
                            Add Courses
                        </button>
                    </Link>
                </div>
                {courses.length === 0 ? (
                    <p>No courses found.</p>
                ) : (
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
                        {courses.map((course: any) => (
                            <div key={course.id} className='p-4 border rounded-lg shadow-sm bg-white'>
                                <h2 className='text-lg font-semibold mb-2 capitalize'>{course.title || course.name}</h2>
                                {course.imageUrl && (
                                    <Image
                                        src={course.imageUrl}
                                        alt={course.title || course.name}
                                        width={300}
                                        height={200}
                                        className='rounded-md object-cover mb-2'
                                    />
                                )}
                                <p className='text-gray-700 mb-1'>{course.description}</p>
                                <p className='text-sm text-gray-500 font-semibold'>${course.price}</p>
                                <p className='text-xs text-gray-400'>{course.category}</p>
                                <div className='flex gap-3 mt-3'>
                                    <Link href={`/admin/courses/editCourse/${course.id}`}>
                                        <button className='text-md bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-all duration-200'>
                                            Edit
                                        </button>
                                    </Link>
                                    <Link href={`/admin/courses/${course.id}`}>
                                        <button className='text-md bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-all duration-200'>
                                            Watch Video
                                        </button>
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(course.id)}
                                        className='text-md bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-all duration-200'
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </AdminLayout>
        </div>
    );
};

export default Courses;