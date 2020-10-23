import { Test, TestingModule } from '@nestjs/testing';

import {AuthResolver} from './auth.resolver';
import {AuthService} from './auth.service';
import {JwtService} from '@nestjs/jwt';
import {UserService} from '../user/user.service';

describe('Auth Resolver', () => {
    let resolver: AuthResolver;
    let service: AuthService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                { provide: AuthResolver, useValue: {} },
                { provide: AuthService, useValue: {} },
                { provide: JwtService, useValue: {} },
                { provide: UserService, useValue: {} },
            ],
        }).compile();
        resolver = module.get<AuthResolver>(AuthResolver);
        service = module.get<AuthService>(AuthService);
    });

    it('should be defined', () => {
        expect(resolver).toBeDefined();
    });
});
