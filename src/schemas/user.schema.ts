import { User } from 'src/entities/user.entities';
import { EntitySchema } from 'typeorm';

export const UserSchema = new EntitySchema<User>({
  name: 'User',
  columns: {
    id: {
      primary: true,
      type: Number,
      generated: true,
      unique: true,
    },
    name: {
      type: String,
    },
    username: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
  },
});
