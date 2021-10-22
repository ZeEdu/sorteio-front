import User from '../models/User';

export interface getUsersResponse {
  users: User[];
  userCount: number;
  usersPerPage: number;
  page: number;
}
