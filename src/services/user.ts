import { AppDataSource } from '../config/database';
import { User } from '../entities/user';
import { Credential } from '../entities/credential';

export class UserService {
  private userRepository = AppDataSource.getRepository(User);
  private credentialRepository = AppDataSource.getRepository(Credential);

  async createUser(
    name: string,
    email: string,
    password: string
  ): Promise<User> {
    const user = this.userRepository.create({ name, email, password });
    return await this.userRepository.save(user);
  }

  async getUserById(id: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ id });
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
