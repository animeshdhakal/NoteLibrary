import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

type SubjectsResponse = {
  data: Subject[];
  status: string;
};

type Subject = {
  chapters: string;
  subjectName: string;
  faculty: string;
  image: string;
  id: string;
  visibility: string;
  contents: Content[];
  department: string;
};

type Content = {
  id: number;
  type: string;
};

const getSubjects = async (subject: string) => {
  let formData = new FormData();
  formData.append("faculty", subject);
  const res = await fetch(
    "https://genzaideveloper.com/api/notes/getsubjects.php",
    {
      method: "POST",
      body: formData,
    }
  );

  const data = (await res.json()) as SubjectsResponse;
  return data;
};

export default async function ({
  params,
}: {
  params: {
    subject: string;
  };
}) {
  const strippedSubject = params.subject.replaceAll("%20", " ");
  const subjects = await getSubjects(strippedSubject);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-2">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {subjects.data.map((subject) => (
          <Link
            href={`/subjects/${strippedSubject}/${subject.subjectName}`}
            key={subject.id}
          >
            <Card>
              <img
                src={subject.image}
                alt={subject.subjectName}
                className="w-full h-64 object-cover hover:scale-105 transition-all duration-300 ease-in-out rounded-t-lg"
              />
              <CardHeader>
                <CardTitle>{subject.subjectName}</CardTitle>
                <CardDescription>{subject.chapters} Chapters</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
