import { UserService } from '../services/user';

const userService = new UserService();

export const userResolvers = {
  Query: {
    getUser: async (_: any, { id }: { id: string }) => {
      return await userService.getUserById(id);
    },
    getCredentials: async (_: any, { userId }: { userId: string }) => {
      return await userService.getCredentialsByUserId(userId);
    }
  },
  Mutation: {
    createUser: async (
      _: any,
      {
        name,
        email,
        password
      }: { name: string; email: string; password: string }
    ) => {
      return await userService.createUser(name, email, password);
    },
    createCredential: async (
      _: any,
      {
        userId,
        userName,
        service,
        accessToken
      }: {
        userId: string;
        userName: string;
        service: string;
        accessToken: string;
      }
    ) => {
      return await userService.createCredential(
        userId,
        service,
        userName,
        accessToken
      );
    }
  }
};
