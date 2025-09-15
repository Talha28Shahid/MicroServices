import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../../../../apps/auth/src/users/models/user.schema';

function getCurrentUser(ctx: ExecutionContext): User {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
}

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => getCurrentUser(ctx),
);
