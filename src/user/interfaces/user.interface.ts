import { Document } from 'mongoose';
import { Roles } from '../user.roles';

export interface User extends Document {
  readonly email: string;
  readonly password: string;
  readonly role: Roles;
  readonly resetPasswordToken: string;
  readonly resetPasswordExpires: number;
}
