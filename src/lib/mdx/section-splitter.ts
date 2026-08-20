export interface EngineeringSection {
  type: string;
  title: string;
  content: string;
}

export interface ProjectSections {
  overview: string;
  architecture: string;
  engineeringSections: EngineeringSection[];
  futureImprovements: string;
}

const ENGINEERING_TYPE_MAP: Record<string, string> = {
  'database design': 'database',
  'database': 'database',
  'erd': 'database',
  'relationships': 'database',

  'request flow': 'request-flow',
  'api flow': 'request-flow',
  'sequence flow': 'request-flow',
  'request lifecycle': 'request-flow',

  'security': 'security',
  'authentication': 'security',
  'authorization': 'security',
  'rbac': 'security',

  'challenges': 'challenges',
  'problems faced': 'challenges',
  'trade-offs': 'challenges',
  'solutions': 'challenges',

  'scaling': 'scaling',
  'scaling strategy': 'scaling',
  'future architecture': 'scaling',
  'performance considerations': 'scaling',

  'lessons learned': 'lessons-learned',
  'engineering insights': 'lessons-learned',
  'project learnings': 'lessons-learned',
};

/**
 * Splits raw MDX body text into structured sections based on top-level headings.
 * 
 * @param mdxBody The raw MDX string (excluding frontmatter)
 * @returns Parsed ProjectSections
 * @throws Error if required sections (Overview, Architecture, Future Improvements) are missing
 */
export function splitMdxSections(mdxBody: string): ProjectSections {
  const lines = mdxBody.split('\n');
  const sections: { title: string; content: string }[] = [];
  
  let currentTitle = '';
  let currentLines: string[] = [];
  
  for (const line of lines) {
    if (line.startsWith('# ')) {
      // Save the previous section if it exists
      if (currentTitle) {
        sections.push({ title: currentTitle, content: currentLines.join('\n').trim() });
      }
      currentTitle = line.replace(/^#\s+/, '').trim();
      currentLines = [];
    } else {
      if (currentTitle) {
        currentLines.push(line);
      }
      // Content before the first '# ' heading is ignored (e.g. comments, imports)
    }
  }
  
  // Save the final section
  if (currentTitle) {
    sections.push({ title: currentTitle, content: currentLines.join('\n').trim() });
  }

  let overview = '';
  let architecture = '';
  let futureImprovements = '';
  const engineeringSections: EngineeringSection[] = [];

  for (const section of sections) {
    const lowerTitle = section.title.toLowerCase();
    
    if (lowerTitle === 'overview') {
      overview = section.content;
    } else if (lowerTitle === 'architecture') {
      architecture = section.content;
    } else if (lowerTitle === 'future improvements') {
      futureImprovements = section.content;
    } else {
      // It's an engineering section. Resolve its normalized type.
      let type = ENGINEERING_TYPE_MAP[lowerTitle];
      
      if (!type) {
        // Fallback for unknown engineering sections: slugify the title
        type = lowerTitle.replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      }
      
      engineeringSections.push({
        type,
        title: section.title,
        content: section.content
      });
    }
  }

  // Validate required sections
  const missing = [];
  if (!overview) missing.push('Overview');
  if (!architecture) missing.push('Architecture');
  if (!futureImprovements) missing.push('Future Improvements');

  if (missing.length > 0) {
    throw new Error(`Project validation failed: Missing required top-level headings: ${missing.join(', ')}`);
  }

  return {
    overview,
    architecture,
    engineeringSections,
    futureImprovements
  };
}
