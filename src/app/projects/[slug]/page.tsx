import { notFound } from "next/navigation";
import { getProjects } from "@/lib/mdx/projects";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Container } from "@/shared/components/container/container";

export async function generateStaticParams() {
  const projects = getProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const projects = getProjects();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <Container className="py-12">
      <h1 className="mb-8 text-4xl font-bold tracking-tight text-text">
        {project.title}
      </h1>
      
      {/* 
        This is a minimal container to prove MDX compilation works. 
        Full page layout (sidebar, table of contents, perspective toggle)
        will be built in the Project Pages phase.
      */}
      <div className="prose prose-neutral dark:prose-invert max-w-none text-text">
        <MDXRemote source={project.content} />
      </div>
    </Container>
  );
}
