import React from "react";
import { prisma } from "@/lib/prisma";
import CourseInfoContent from "@/component/CourseInfoContent";

interface CoursePageProps {
  params: {
    slug: string;
  };
}

const CourseInfo = async ({ params }: CoursePageProps) => {
  const { slug } = params;

  const course = await prisma.course.findFirst({
    where: { slug },
  });

  if (!course) {
    return (
      <div className="mt-32 text-black text-center">
        <h1 className="text-4xl font-bold">Course Not Found</h1>
        <p className="text-gray-600 mt-2">Please check the course link again.</p>
      </div>
    );
  }

  return <CourseInfoContent course={course} />;
};

export default CourseInfo;