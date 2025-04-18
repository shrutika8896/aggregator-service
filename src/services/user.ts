import { AppDataSource } from '../config/database';
import { User } from '../entities/user';
import { Credential } from '../entities/credential';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AppError } from '../utils/AppError';
import { HttpStatusCodes } from '../utils/constant';

export class UserService {
  private userRepository = AppDataSource.getRepository(User);
  private credentialRepository = AppDataSource.getRepository(Credential);

  async createUser(
    name: string,
    email: string,
    password: string
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({
      name,
      email,
      password: hashedPassword
    });
    return await this.userRepository.save(user);
  }

  async getUserById(id: string): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new AppError('User not found', HttpStatusCodes.NOT_FOUND);
    }
    return user;
  }

  async validateUser(email: string, password: string): Promise<string | null> {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new AppError('User not found', HttpStatusCodes.NOT_FOUND);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new AppError('Invalid password', HttpStatusCodes.UNAUTHORIZED);
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET!,
      {
        expiresIn: '1d'
      }
    );

    return token;
  }

  async createCredential(
    userId: string,
    service: string,
    userName: string,
    accessToken: string
  ): Promise<Credential> {
    return await this.credentialRepository.save({
      userId,
      service,
      userName,
      accessToken
    });
  }

  async getCredentialsByUserId(userid: string): Promise<Credential[]> {
    return await this.credentialRepository.findBy({ userId: userid });
  }
}
