import {Injectable, CanActivate, ExecutionContext} from '@nestjs/common';
import {Reflector} from '@nestjs/core';
import {GqlExecutionContext} from '@nestjs/graphql';
import {JwtService} from '@nestjs/jwt';
import {UserService} from '../user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
    ) {
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        if (request) {
            if (!request.headers.authorization) {
                return false;
            }
            request.user = await this.validateToken(request.headers.authorization);
            return this.validateRole(request.user, context);

        } else {
            const ctx: any = GqlExecutionContext.create(context).getContext();
            if (!ctx.request.headers.authorization) {
                return false;
            }

            ctx.user = await this.validateToken(ctx.request.headers.authorization);
            return this.validateRole(ctx.user, context);
        }
    }

    async validateToken(auth: string) {
        const token = auth.split(' ')[1];
        try {
            return this.jwtService.verify(token);
        } catch (error) {
            throw error;
        }
    }

    async validateRole(userJwt, context) {
        const roles = this.reflector
            .get<string[]>('roles', context.getHandler());
        if (!roles) {
            return true;
        }
        const user = await this.userService.findOneByEmail(userJwt.email);
        const hasRole = () => !!roles.find(item => item === user.role);
        return user && user.role && hasRole();
    }
}
