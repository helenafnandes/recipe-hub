import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';

export const User = createParamDecorator(
  (data: keyof Express.User | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (!request.user) {
      throw new UnauthorizedException('Usuário não autenticado.');
    }
    console.log('Usuário autenticado extraído:', request.user); 
    return data ? request.user[data] : request.user;
  },
);
