import { getConnection, getCustomRepository } from 'typeorm';
import { User } from '../typeORM/entities/User.entity';
import { UserRepository } from '../typeORM/repository';

export class UserService {
  private userRepository: UserRepository;

  constructor(){
    this.userRepository = getConnection('users').getCustomRepository(UserRepository);
  }

  public index = async () => {
    const user = await this.userRepository.find()
    return user;
  } 

  
  public findOne = async (id: number) => {
    const user = await this.userRepository.findOne(id)
    return user;
  } 
  public create = async (user: User) => {
    const newUser = await this.userRepository.save(user);
    return newUser;
  } 

  public update =  async (user: User, id: number) => {
    const updatedUser = await this.userRepository.update(id,user);
    return updatedUser;
  } 

  public delete = async (id: number) => {
    const deletedUser = await this.userRepository.delete(id);
    return deletedUser;
  } 
}

function post(post: any) {
    throw new Error('Function not implemented.');
}
