import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export interface ChaptersResponse {
  data: Chapter[];
  status: string;
}

export interface Chapter {
  chapter: string;
  chapterName: string;
  faculty: string;
  driveLink: string;
  visibility: string;
  id: string;
  image: string;
  subjectName: string;
}

const getChapters = async (subject: string, chapter: string) => {
  let formData = new FormData();
  formData.append("faculty", subject);
  formData.append("subjectName", chapter);
  const res = await fetch("https://genzaideveloper.com/api/notes/getnote.php", {
    method: "POST",
    body: formData,
  });

  const data = (await res.json()) as ChaptersResponse;
  return data;
};

export default async function ({
  params,
}: {
  params: {
    subject: string;
    chapter: string;
  };
}) {
  const strippedSubject = params.subject.replaceAll("%20", " ");
  const strippedChapter = params.chapter.replaceAll("%20", " ");

  const chapters = await getChapters(strippedSubject, strippedChapter);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-2">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {chapters.data.map((chapter) => (
          <Link href={chapter.driveLink} key={chapter.id}>
            <Card>
              <img
                src={chapter.image}
                alt={chapter.chapterName}
                className="w-full h-64 object-cover hover:scale-105 transition-all duration-300 ease-in-out rounded-t-lg"
              />
              <CardHeader>
                <CardTitle>{chapter.chapterName}</CardTitle>

                <CardDescription>{chapter.chapter}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
