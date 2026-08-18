import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { projectSchema, type Project } from "@/lib/validation/project.schema";

const PROJECTS_DIR = path.join(process.cwd(), "content/projects");

export interface ProjectWithContent extends Project {
  content: string;
}

export function getProjects(): ProjectWithContent[] {
  if (!fs.existsSync(PROJECTS_DIR)) {
    return [];
  }

  const files = fs.readdirSync(PROJECTS_DIR);
  const mdxFiles = files.filter((file) => file.endsWith(".mdx"));

  return mdxFiles.map((file) => {
    const filePath = path.join(PROJECTS_DIR, file);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);

    // Validate the parsed frontmatter against our Zod schema
    const parsed = projectSchema.safeParse(data);

    if (!parsed.success) {
      const issues = parsed.error.issues
        .map((issue) => `  - Field '${issue.path.join(".")}' : ${issue.message}`)
        .join("\n");
      
      throw new Error(
        `\n[Content Validation Error] File: content/projects/${file}\n` +
        `The frontmatter does not match the required Project schema:\n${issues}\n`
      );
    }

    // Return the validated domain object merged with the raw MDX body
    return {
      ...parsed.data,
      content,
    };
  });
}
