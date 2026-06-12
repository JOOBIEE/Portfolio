export type GraphNode = {
  id: string;
  label: string;
  type: "project" | "essay" | "archive" | "case-study" | "tag";
  tags: string[];
  path?: string;
};

export type GraphLink = {
  source: string;
  target: string;
  strength: number;
};

export type GraphData = {
  nodes: GraphNode[];
  links: GraphLink[];
};

export type ContentItem = {
  id: string;
  title: string;
  tags: string[];
  type: "project" | "essay" | "archive" | "case-study";
  path: string;
};

export function buildGraph(items: ContentItem[]): GraphData {
  const nodes: GraphNode[] = [];
  const links: GraphLink[] = [];
  const tagNodes = new Map<string, GraphNode>();

  // Add content nodes
  items.forEach((item) => {
    nodes.push({
      id: `${item.type}-${item.id}`,
      label: item.title,
      type: item.type,
      tags: item.tags,
      path: item.path,
    });
  });

  // Build tag nodes and content → tag links
  nodes.forEach((node) => {
    node.tags.forEach((tag) => {
      if (!tagNodes.has(tag)) {
        tagNodes.set(tag, {
          id: `tag-${tag}`,
          label: tag,
          type: "tag",
          tags: [],
        });
      }
      links.push({
        source: node.id,
        target: `tag-${tag}`,
        strength: 1,
      });
    });
  });

  tagNodes.forEach((tagNode) => nodes.push(tagNode));

  // Direct content ↔ content links for shared tags
  const contentNodes = nodes.filter((n) => n.type !== "tag");
  for (let i = 0; i < contentNodes.length; i++) {
    for (let j = i + 1; j < contentNodes.length; j++) {
      const a = contentNodes[i];
      const b = contentNodes[j];
      const shared = a.tags.filter((t) => b.tags.includes(t));
      if (shared.length > 0) {
        links.push({
          source: a.id,
          target: b.id,
          strength: shared.length,
        });
      }
    }
  }

  return { nodes, links };
}