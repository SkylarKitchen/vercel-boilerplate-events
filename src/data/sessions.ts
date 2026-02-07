export const tracks = [
  "Agentic Development",
  "Advanced Coding",
  "Platform & Infrastructure",
] as const;

export type Track = (typeof tracks)[number];

export type Session = {
  id: string;
  title: string;
  description: string;
  track: Track;
  speaker: { name: string; role: string };
  time: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  tags: string[];
};

export const sessions: Session[] = [
  // ── Track 1: Agentic Development ──────────────────────────────────────
  {
    id: "building-agentic-workflows",
    title: "Building Agentic Workflows with Claude",
    description:
      "Learn how to design and implement autonomous agent loops that plan, execute, and self-correct using Claude as the reasoning backbone. This session covers the core primitives — goal decomposition, memory management, and iterative refinement — that turn a single LLM call into a reliable agentic system.",
    track: "Agentic Development",
    speaker: { name: "Sarah Chen", role: "Senior Engineer, Anthropic" },
    time: "11:00 AM",
    duration: "30 min",
    level: "Intermediate",
    tags: ["agents", "workflows", "tool-use", "architecture"],
  },
  {
    id: "multi-agent-orchestration-patterns",
    title: "Multi-Agent Orchestration Patterns",
    description:
      "Explore battle-tested patterns for coordinating multiple Claude-powered agents that collaborate on complex tasks. We'll walk through supervisor-worker topologies, shared memory strategies, and conflict resolution mechanisms drawn from production systems handling thousands of concurrent agent runs.",
    track: "Agentic Development",
    speaker: { name: "Marcus Rivera", role: "Staff Engineer, Anthropic" },
    time: "11:30 AM",
    duration: "30 min",
    level: "Advanced",
    tags: ["multi-agent", "orchestration", "concurrency", "distributed-systems"],
  },
  {
    id: "tool-use-and-function-calling",
    title: "Tool Use and Function Calling Deep Dive",
    description:
      "Go beyond the basics of tool use to master schema design, error recovery, and chained tool invocations that let Claude interact with external APIs, databases, and file systems. You'll learn how to define tool contracts that minimize hallucination and maximize reliability in production agent pipelines.",
    track: "Agentic Development",
    speaker: { name: "Priya Narayanan", role: "Developer Advocate, Anthropic" },
    time: "2:00 PM",
    duration: "30 min",
    level: "Intermediate",
    tags: ["tool-use", "function-calling", "api-design", "reliability"],
  },
  {
    id: "agent-evaluation-and-testing",
    title: "Agent Evaluation and Testing Frameworks",
    description:
      "Shipping agents without robust evaluation is flying blind. This session introduces deterministic and LLM-as-judge evaluation harnesses, regression test suites for agentic behavior, and continuous monitoring strategies that catch performance degradation before your users do.",
    track: "Agentic Development",
    speaker: { name: "David Okafor", role: "Research Engineer, Anthropic" },
    time: "2:30 PM",
    duration: "30 min",
    level: "Advanced",
    tags: ["evaluation", "testing", "observability", "quality-assurance"],
  },

  // ── Track 2: Advanced Coding ──────────────────────────────────────────
  {
    id: "claude-code-zero-to-production",
    title: "Claude Code: From Zero to Production",
    description:
      "A hands-on introduction to Claude Code, Anthropic's agentic coding tool that lives in your terminal. We'll start with installation and basic usage, then build a full feature branch — complete with tests and documentation — entirely through natural language commands.",
    track: "Advanced Coding",
    speaker: { name: "Elena Vasquez", role: "Product Manager, Anthropic" },
    time: "11:00 AM",
    duration: "30 min",
    level: "Beginner",
    tags: ["claude-code", "cli", "developer-tools", "getting-started"],
  },
  {
    id: "advanced-prompt-engineering-code",
    title: "Advanced Prompt Engineering for Code Generation",
    description:
      "Move past generic prompting techniques and learn code-specific strategies that dramatically improve output quality. This session covers structured decomposition prompts, few-shot exemplar selection for unfamiliar frameworks, and constraint-based prompting that enforces architectural patterns across generated code.",
    track: "Advanced Coding",
    speaker: { name: "James Whitfield", role: "Solutions Architect, Anthropic" },
    time: "11:30 AM",
    duration: "30 min",
    level: "Intermediate",
    tags: ["prompt-engineering", "code-generation", "best-practices", "productivity"],
  },
  {
    id: "debugging-and-refactoring",
    title: "Debugging and Refactoring with Claude",
    description:
      "See how Claude can trace through stack traces, identify root causes in unfamiliar codebases, and propose targeted refactors that improve readability without changing behavior. We'll work through real-world debugging scenarios across Python, TypeScript, and Rust, showing techniques that transfer to any language.",
    track: "Advanced Coding",
    speaker: { name: "Anika Patel", role: "Senior Engineer, Anthropic" },
    time: "2:00 PM",
    duration: "30 min",
    level: "Intermediate",
    tags: ["debugging", "refactoring", "code-quality", "developer-workflow"],
  },
  {
    id: "building-custom-ide-integrations",
    title: "Building Custom IDE Integrations",
    description:
      "Learn how to extend your editor with Claude-powered features using the Anthropic API and LSP hooks. We'll build a working VS Code extension that provides inline explanations, automated test generation, and context-aware code completions — all backed by Claude and tailored to your team's codebase.",
    track: "Advanced Coding",
    speaker: { name: "Tom Lindqvist", role: "Developer Experience Lead, Anthropic" },
    time: "4:00 PM",
    duration: "30 min",
    level: "Advanced",
    tags: ["ide", "extensions", "vscode", "developer-experience"],
  },

  // ── Track 3: Platform & Infrastructure ────────────────────────────────
  {
    id: "anthropic-api-whats-new-2026",
    title: "Anthropic API: What's New in 2026",
    description:
      "A tour of the latest Anthropic API capabilities launched this year, including extended thinking, token-efficient tool use, and the new streaming architecture. Whether you're just getting started or migrating from an older SDK version, this session will get you up to speed on everything available today.",
    track: "Platform & Infrastructure",
    speaker: { name: "Rachel Kim", role: "Product Lead, Anthropic" },
    time: "12:00 PM",
    duration: "30 min",
    level: "Beginner",
    tags: ["api", "sdk", "new-features", "getting-started"],
  },
  {
    id: "scaling-claude-enterprise",
    title: "Scaling Claude for Enterprise Workloads",
    description:
      "Handling millions of API calls per day requires more than just increasing rate limits. This session covers request batching, intelligent caching layers, prompt compression, and load-balancing strategies that keep latency low and costs predictable at enterprise scale.",
    track: "Platform & Infrastructure",
    speaker: { name: "Michael Torres", role: "Principal Engineer, Anthropic" },
    time: "2:30 PM",
    duration: "30 min",
    level: "Advanced",
    tags: ["enterprise", "scaling", "performance", "cost-optimization"],
  },
  {
    id: "fine-tuning-model-customization",
    title: "Fine-tuning and Model Customization",
    description:
      "Discover how to adapt Claude to your domain through fine-tuning, system prompt optimization, and retrieval-augmented generation. We'll compare these approaches on real benchmarks, showing when each technique delivers the best accuracy-cost tradeoff for specialized use cases like legal analysis, medical coding, and financial modeling.",
    track: "Platform & Infrastructure",
    speaker: { name: "Laura Engström", role: "Research Scientist, Anthropic" },
    time: "4:00 PM",
    duration: "30 min",
    level: "Advanced",
    tags: ["fine-tuning", "customization", "rag", "domain-adaptation"],
  },
  {
    id: "security-compliance-best-practices",
    title: "Security and Compliance Best Practices",
    description:
      "A practical guide to deploying Claude in regulated environments. Learn how to implement data residency controls, audit logging, PII redaction pipelines, and role-based access policies that satisfy SOC 2, HIPAA, and GDPR requirements without sacrificing developer velocity.",
    track: "Platform & Infrastructure",
    speaker: { name: "Nathan Brooks", role: "Security Engineering Lead, Anthropic" },
    time: "4:30 PM",
    duration: "30 min",
    level: "Intermediate",
    tags: ["security", "compliance", "enterprise", "data-privacy"],
  },
];

export const levelColors: Record<Session["level"], string> = {
  Beginner: "bg-accent-olive/15 text-accent-olive",
  Intermediate: "bg-accent-sky/15 text-accent-sky",
  Advanced: "bg-accent-clay/15 text-accent-clay",
};

export const levelColorsSolid: Record<Session["level"], string> = {
  Beginner: "bg-accent-olive text-white",
  Intermediate: "bg-accent-sky text-white",
  Advanced: "bg-accent-clay text-white",
};

export function getSessionBySlug(slug: string): Session | undefined {
  return sessions.find((session) => session.id === slug);
}

export function getSessionsByTrack(track: Track): Session[] {
  return sessions.filter((session) => session.track === track);
}
