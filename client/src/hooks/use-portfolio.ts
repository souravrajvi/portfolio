import { useQuery } from "@tanstack/react-query";
import {
  profileData,
  experiencesData,
  projectsData,
  skillsData,
  educationData,
  musicRecsData,
  bookRecsData,
  movieRecsData,
  writingsData,
  achievementsData,
  blogPostsData
} from "../data/portfolio-data";

// Static data hooks - no API calls needed
export function useProfile() {
  return useQuery({
    queryKey: ["/api/profile"],
    queryFn: async () => profileData,
    staleTime: Infinity,
  });
}

export function useExperiences() {
  return useQuery({
    queryKey: ["/api/experiences"],
    queryFn: async () => experiencesData,
    staleTime: Infinity,
  });
}

export function useProjects() {
  return useQuery({
    queryKey: ["/api/projects"],
    queryFn: async () => projectsData,
    staleTime: Infinity,
  });
}

export function useSkills() {
  return useQuery({
    queryKey: ["/api/skills"],
    queryFn: async () => skillsData,
    staleTime: Infinity,
  });
}

export function useEducation() {
  return useQuery({
    queryKey: ["/api/education"],
    queryFn: async () => educationData,
    staleTime: Infinity,
  });
}

export function useMusicRecs() {
  return useQuery({
    queryKey: ["/api/music"],
    queryFn: async () => musicRecsData,
    staleTime: Infinity,
  });
}

export function useBookRecs() {
  return useQuery({
    queryKey: ["/api/books"],
    queryFn: async () => bookRecsData,
    staleTime: Infinity,
  });
}

export function useMovieRecs() {
  return useQuery({
    queryKey: ["/api/movies"],
    queryFn: async () => movieRecsData,
    staleTime: Infinity,
  });
}

export function useWritings() {
  return useQuery({
    queryKey: ["/api/writings"],
    queryFn: async () => writingsData,
    staleTime: Infinity,
  });
}

export function useAchievements() {
  return useQuery({
    queryKey: ["/api/achievements"],
    queryFn: async () => achievementsData,
    staleTime: Infinity,
  });
}

export function useBlogPosts() {
  return useQuery({
    queryKey: ["/api/blog"],
    queryFn: async () => blogPostsData,
    staleTime: Infinity,
  });
}

export function useBlogPost(slug: string) {
  return useQuery({
    queryKey: [`/api/blog/${slug}`],
    queryFn: async () => {
      const post = blogPostsData.find(p => p.slug === slug);
      if (!post) throw new Error("Post not found");
      return post;
    },
    staleTime: Infinity,
  });
}
