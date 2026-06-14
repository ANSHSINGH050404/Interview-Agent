import type { Request, Response } from "express";
import { config } from "../config";

interface GitHubRepo {
  name: string;
  description: string | null;
  full_name: string;
  stargazers_count: number;
  language: string | null;
  topics: string[];
  created_at: string;
  updated_at: string;
}

export const preInterview = async (req: Request, res: Response) => {
  const { username } = req.body;

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
      if (github.status === 404) {
        return res.status(404).json({ message: "GitHub user not found" });
      }
      if (github.status === 403) {
        return res
          .status(429)
          .json({ message: "GitHub API rate limit exceeded" });
      }
      return res
        .status(500)
        .json({ message: "Failed to fetch GitHub repositories" });
    }

    const githubData: GitHubRepo[] = await github.json();

    const userData = githubData.map((repo) => ({
      name: repo.name,
      description: repo.description,
      fullname: repo.full_name,
      starCount: repo.stargazers_count,
      language: repo.language,
      topics: repo.topics,
      createdAt: repo.created_at,
      updatedAt: repo.updated_at,
    }));

    return res.status(200).json({
      message: "Pre-interview completed",
      username,
      repoCount: userData.length,
      userData,
    });
  } catch (error) {
    console.error("GitHub API error:", error);
    return res
      .status(500)
      .json({ message: "Internal server error while fetching GitHub data" });
  }
};
