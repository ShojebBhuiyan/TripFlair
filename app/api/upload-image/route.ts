import fs, { writeFile } from "fs";
import os from "os";
import { join } from "path";
import { NextRequest } from "next/server";

type UploadMode = "restuarant" | "hotel";

async function moveFiles(files: File[], mode: UploadMode, id: string) {
  let paths: string[] = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const storePath = `/${mode}/${id}`;
    const savePath = `/public${storePath}`;

    console.log("Store path: ", storePath);
    console.log("Save path: ", savePath);

    try {
      fs.readdirSync(process.cwd() + savePath);
    } catch (error) {
      fs.mkdirSync(process.cwd() + savePath, { recursive: true });
    }

    writeFile(process.cwd() + savePath + `/${file.name}`, buffer, () => {});

    paths.push(`${storePath}/${file.name}`);
  }
  return paths;
}

export async function POST(request: NextRequest) {
  const data = await request.formData();

  const length: number = data.get("length") as unknown as number;
  console.log("Length: ", length);
  let files: File[] = [];
  for (let i = 0; i < length; i++) {
    const file: File = data.get(`image-${i}`) as unknown as File;

    files.push(file);
    console.log("File: ", file);
  }
  console.log("Files: ", files);

  const mode: UploadMode | null = data.get("mode") as unknown as UploadMode;
  console.log("Mode: ", mode);
  const id: string | null = data.get("id") as unknown as string;
  console.log("ID: ", id);
  if (!files) {
    return new Response("No files", { status: 400 });
  }

  const pathStrings = await moveFiles(files, mode, id);

  console.log(pathStrings);

  return new Response(JSON.stringify({ pathStrings: pathStrings }), {
    status: 200,
  });
}
