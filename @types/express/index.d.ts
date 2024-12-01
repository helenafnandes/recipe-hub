import { User } from '../../user/user.entity';

declare global {
  namespace Express {
    interface User extends Omit<User, 'password'> {} 
  }
}
