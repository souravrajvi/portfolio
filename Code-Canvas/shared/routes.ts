import { z } from 'zod';
import { 
  insertProfileSchema, 
  insertExperienceSchema, 
  insertProjectSchema, 
  insertSkillSchema,
  insertEducationSchema,
  profile,
  experiences,
  projects,
  skills,
  education,
  musicRecs,
  bookRecs,
  writings,
  achievements,
  blogPosts
} from './schema';

export const errorSchemas = {
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  profile: {
    get: {
      method: 'GET' as const,
      path: '/api/profile',
      responses: {
        200: z.custom<typeof profile.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
  },
  experiences: {
    list: {
      method: 'GET' as const,
      path: '/api/experiences',
      responses: {
        200: z.array(z.custom<typeof experiences.$inferSelect>()),
      },
    },
  },
  projects: {
    list: {
      method: 'GET' as const,
      path: '/api/projects',
      responses: {
        200: z.array(z.custom<typeof projects.$inferSelect>()),
      },
    },
  },
  skills: {
    list: {
      method: 'GET' as const,
      path: '/api/skills',
      responses: {
        200: z.array(z.custom<typeof skills.$inferSelect>()),
      },
    },
  },
  education: {
    list: {
      method: 'GET' as const,
      path: '/api/education',
      responses: {
        200: z.array(z.custom<typeof education.$inferSelect>()),
      },
    },
  },
  musicRecs: {
    list: {
      method: 'GET' as const,
      path: '/api/music',
      responses: {
        200: z.array(z.custom<typeof musicRecs.$inferSelect>()),
      },
    },
  },
  bookRecs: {
    list: {
      method: 'GET' as const,
      path: '/api/books',
      responses: {
        200: z.array(z.custom<typeof bookRecs.$inferSelect>()),
      },
    },
  },
  writings: {
    list: {
      method: 'GET' as const,
      path: '/api/writings',
      responses: {
        200: z.array(z.custom<typeof writings.$inferSelect>()),
      },
    },
  },
  achievements: {
    list: {
      method: 'GET' as const,
      path: '/api/achievements',
      responses: {
        200: z.array(z.custom<typeof achievements.$inferSelect>()),
      },
    },
  },
  blogPosts: {
    list: {
      method: 'GET' as const,
      path: '/api/blog',
      responses: {
        200: z.array(z.custom<typeof blogPosts.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/blog/:slug',
      responses: {
        200: z.custom<typeof blogPosts.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
