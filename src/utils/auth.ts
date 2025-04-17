import { Request } from 'express';

export const getGitHubToken = (req: Request): string | null => {
    return req.headers['github-token'] as string || null;
};

export const getGitLabToken = (req: Request): string | null => {
    return req.headers['gitlab-token'] as string || null;
};

export const authenticate = (token: string | null): boolean => {
    // Implement your authentication logic here
    return token !== null; // Example: simple check for non-null token
};