import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserDocument } from 'src/auth/strategies/jwt.strategy';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as UserDocument;
  },
);
