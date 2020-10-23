import { createParamDecorator } from '@nestjs/common';

export const User = createParamDecorator((data, request) => {
    return data ? request.user[data] : request.user;
});

export const UserCTX = createParamDecorator((data, [root, args, ctx, info]) => {
    return data ? ctx.user[data] : ctx.user;
});
