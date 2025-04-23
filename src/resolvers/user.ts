import { UserService } from '../services/user';
import { AppError } from '../utils/AppError';
import { Services } from '../utils/constant';

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
        service: Services;
        accessToken: string;
      }
    ) => {
      return await userService.createCredential(
        userId,
        service,
        userName,
        accessToken
      );
    },
    generateToken: async (
      _: any,
      { email, password }: { email: string; password: string }
    ) => {
      try {
        const token = await userService.validateUser(email, password);
        return { token };
      } catch (error: any) {
        throw new AppError(error.message, error.statusCode);
      }
    }
  }
};
