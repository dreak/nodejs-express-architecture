import { User } from '../database/entity/user.entity';
import { UserRepository } from '../database/repository/user.repository';

export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  async createUser(user: User) {
    return await this.userRepo.createOrUpdate(user);
  }

  async updateUser(id: number, user: User) {
    const originUser = await this.userRepo.getById(id);

    if (originUser) {
      originUser.name = user.name;
      originUser.phone = user.phone;
      originUser.address = user.address;
      return this.userRepo.createOrUpdate(originUser);
    }

    return this.userRepo.createOrUpdate(user);
  }

  async getUser(id: number) {
    return await this.userRepo.getById(id);
  }

  async getUsers() {
    return await this.userRepo.getAll();
  }
}
