import type { Request, Response } from "express";
import { config } from "../config";

interface Question {
  id: number;
  question: string;
  answer: string;
  difficulty: "easy" | "medium" | "hard";
  category: string;
}

const questionTemplates: Record<string, Question[]> = {
  javascript: [
    {
      id: 1,
      question: "Explain the difference between `let`, `const`, and `var` in JavaScript.",
      answer: "`var` is function-scoped and hoisted, `let` is block-scoped and not hoisted, `const` is block-scoped, not hoisted, and cannot be reassigned. Use `const` by default, `let` when reassignment is needed, and avoid `var` in modern code.",
      difficulty: "easy",
      category: "JavaScript Fundamentals",
    },
    {
      id: 2,
      question: "What is closure and how is it used in JavaScript?",
      answer: "A closure is a function that has access to variables from its outer (enclosing) scope even after the outer function has returned. Closures are created every time a function is created. They are used for data privacy, function factories, and maintaining state in asynchronous operations.",
      difficulty: "medium",
      category: "JavaScript Concepts",
    },
    {
      id: 3,
      question: "Explain the event loop and how asynchronous JavaScript works.",
      answer: "The event loop continuously checks the call stack and task queue. When the call stack is empty, it pushes the first task from the queue to the stack. Microtasks (Promises) have priority over macrotasks (setTimeout). This non-blocking model allows JavaScript to handle async operations despite being single-threaded.",
      difficulty: "hard",
      category: "JavaScript Runtime",
    },
  ],
  typescript: [
    {
      id: 4,
      question: "What is the difference between `interface` and `type` in TypeScript?",
      answer: "Both define object shapes, but interfaces support declaration merging and are generally preferred for object shapes. Types are more flexible - they can create unions, intersections, and mapped types. Use interfaces for public API shapes and types for unions and complex type transformations.",
      difficulty: "medium",
      category: "TypeScript Basics",
    },
    {
      id: 5,
      question: "Explain TypeScript generics and provide a practical example.",
      answer: "Generics allow you to write reusable, type-safe code. They act as type variables that preserve type information. Example: `function identity<T>(arg: T): T { return arg; }`. Generics are essential for creating reusable components, utility types, and type-safe data structures.",
      difficulty: "medium",
      category: "TypeScript Advanced",
    },
  ],
  react: [
    {
      id: 6,
      question: "What is the difference between `useEffect` and `useLayoutEffect`?",
      answer: "`useEffect` runs asynchronously after the browser paints, while `useLayoutEffect` runs synchronously before the browser paints. Use `useLayoutEffect` when you need to measure DOM elements or make visual adjustments to prevent flickering. Most cases should use `useEffect`.",
      difficulty: "medium",
      category: "React Hooks",
    },
    {
      id: 7,
      question: "How do you prevent unnecessary re-renders in React?",
      answer: "Techniques include: `React.memo` for component memoization, `useMemo` for expensive computations, `useCallback` for stable function references, splitting components to limit re-render scope, and using state management to avoid prop drilling.",
      difficulty: "hard",
      category: "React Performance",
    },
  ],
  nodejs: [
    {
      id: 8,
      question: "Explain the difference between `process.nextTick` and `setImmediate`.",
      answer: "`process.nextTick` callbacks execute before the event loop continues to the next phase. `setImmediate` callbacks execute in the check phase of the next iteration of the event loop. `nextTick` has priority but can starve I/O if used excessively.",
      difficulty: "hard",
      category: "Node.js Runtime",
    },
  ],
  general: [
    {
      id: 9,
      question: "What is REST API and what are its principles?",
      answer: "REST (Representational State Transfer) is an architectural style using stateless, client-server communication. Key principles: statelessness, uniform interface, resource identification via URIs, use of HTTP methods (GET, POST, PUT, DELETE), and HATEOAS.",
      difficulty: "easy",
      category: "API Design",
    },
    {
      id: 10,
      question: "Explain the concept of database indexing and when to use it.",
      answer: "Indexing creates a data structure that improves query speed by allowing faster data lookup. Use indexes on frequently queried columns, foreign keys, and columns used in WHERE/JOIN clauses. Avoid over-indexing as it slows down writes and increases storage.",
      difficulty: "medium",
      category: "Database",
    },
  ],
};

export const generateQuestions = async (req: Request, res: Response) => {
  const { username, languages } = req.body;

  if (!username) {
    return res.status(400).json({ message: "Username is required" });
  }

  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github.v3+json",
    };

    if (config.githubToken) {
      headers["Authorization"] = `token ${config.githubToken}`;
    }

    const github = await fetch(
      `https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=10`,
      { headers },
    );

    if (!github.ok) {
      return res
        .status(500)
        .json({ message: "Failed to fetch GitHub repositories" });
    }

    const repos: Array<{ language: string | null; topics: string[] }> =
      await github.json();

    const detectedLanguages = new Set<string>();
    repos.forEach((repo) => {
      if (repo.language) {
        detectedLanguages.add(repo.language.toLowerCase());
      }
    });

    const questions: Question[] = [];

    detectedLanguages.forEach((lang) => {
      if (questionTemplates[lang]) {
        questions.push(...questionTemplates[lang]);
      }
    });

    questionTemplates.general.forEach((q) => questions.push(q));

    const shuffled = questions.sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 10);

    return res.status(200).json({
      message: "Questions generated successfully",
      username,
      languages: Array.from(detectedLanguages),
      questionCount: selected.length,
      questions: selected,
    });
  } catch (error) {
    console.error("Error generating questions:", error);
    return res
      .status(500)
      .json({ message: "Internal server error while generating questions" });
  }
};
