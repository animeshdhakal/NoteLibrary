import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

type Faculty = {
  id: string;
  subjects: string;
  faculty: string;
  image: string;
  visibility: string;
};

type FacultyResponse = {
  data: Faculty[];
};

const getCourses = async () => {
  const res = await fetch(
    "https://genzaideveloper.com/api/notes/getfaculty.php"
  );
  const data = (await res.json()) as FacultyResponse;
  return data;
};

export default async function Home() {
  const courses = await getCourses();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-2">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.data.map((course) => (
          <Link href={`/subjects/${course.faculty}`} key={course.id}>
            <Card>
              <img
                src={course.image}
                alt={course.subjects}
                className="w-full h-64 object-cover hover:scale-105 transition-all duration-300 ease-in-out rounded-t-lg"
              />
              <CardHeader>
                <CardTitle>{course.faculty}</CardTitle>
                <CardDescription>{course.subjects}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
