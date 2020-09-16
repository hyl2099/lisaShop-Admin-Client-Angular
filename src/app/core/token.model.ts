import {Role} from './role.model';

export interface Token {
  token: string;
  email?: string;
  name?: string;
}
