/* tslint:disable */
/* eslint-disable */
import { UserBranchDto } from './user-branch-dto';
import { UserRoleDto } from './user-role-dto';
export interface UserDto {
  defaultBranch?: UserBranchDto;
  firstname?: null | string;
  lastname?: null | string;
  roles?: null | Array<UserRoleDto>;
  username?: null | string;
}
