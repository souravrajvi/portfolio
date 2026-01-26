import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";

export function useProfile() {
  return useQuery({
    queryKey: [api.profile.get.path],
    queryFn: async () => {
      const res = await fetch(api.profile.get.path, { credentials: "include" });
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch profile");
      return api.profile.get.responses[200].parse(await res.json());
    },
  });
}

export function useExperiences() {
  return useQuery({
    queryKey: [api.experiences.list.path],
    queryFn: async () => {
      const res = await fetch(api.experiences.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch experiences");
      return api.experiences.list.responses[200].parse(await res.json());
    },
  });
}

export function useProjects() {
  return useQuery({
    queryKey: [api.projects.list.path],
    queryFn: async () => {
      const res = await fetch(api.projects.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch projects");
      return api.projects.list.responses[200].parse(await res.json());
    },
  });
}

export function useSkills() {
  return useQuery({
    queryKey: [api.skills.list.path],
    queryFn: async () => {
      const res = await fetch(api.skills.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch skills");
      return api.skills.list.responses[200].parse(await res.json());
    },
  });
}

export function useEducation() {
  return useQuery({
    queryKey: [api.education.list.path],
    queryFn: async () => {
      const res = await fetch(api.education.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch education");
      return api.education.list.responses[200].parse(await res.json());
    },
  });
}

export function useMusicRecs() {
  return useQuery({
    queryKey: [api.musicRecs.list.path],
    queryFn: async () => {
      const res = await fetch(api.musicRecs.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch music");
      return api.musicRecs.list.responses[200].parse(await res.json());
    },
  });
}

export function useBookRecs() {
  return useQuery({
    queryKey: [api.bookRecs.list.path],
    queryFn: async () => {
      const res = await fetch(api.bookRecs.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch books");
      return api.bookRecs.list.responses[200].parse(await res.json());
    },
  });
}

export function useWritings() {
  return useQuery({
    queryKey: [api.writings.list.path],
    queryFn: async () => {
      const res = await fetch(api.writings.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch writings");
      return api.writings.list.responses[200].parse(await res.json());
    },
  });
}
