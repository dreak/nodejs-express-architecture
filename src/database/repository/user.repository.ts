import { getConnection } from 'typeorm';
import { User } from '../entity/user.entity';

export class UserRepository {
  async getById(id: number) {
    return getConnection()
      .getRepository(User)
      .findOne({
        where: {
          id: id
        }
      });
  }

  async getAll() {
    return getConnection().getRepository(User).find({});
  }

  async createOrUpdate(instance: User) {
    return getConnection().getRepository(User).save(instance);
  }
}
