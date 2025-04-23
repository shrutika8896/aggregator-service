export enum HttpStatusCodes {
  // 2xx: Success
  OK = 200, // Request succeeded
  CREATED = 201, // Resource created

  // 4xx: Client Errors
  BAD_REQUEST = 400, // Bad request syntax or invalid request
  UNAUTHORIZED = 401, // Authentication required
  FORBIDDEN = 403, // Server refuses to fulfill the request
  NOT_FOUND = 404, // Resource not found

  // 5xx: Server Errors
  INTERNAL_SERVER_ERROR = 500 // Generic server error
}

export enum Services {
  GITHUB = 'github',
  GITLAB = 'gitlab'
}

export const GITHUB_API_URL = 'https://api.github.com/graphql';
export const GITLAB_API_URL = 'https://gitlab.com/api/graphql';
