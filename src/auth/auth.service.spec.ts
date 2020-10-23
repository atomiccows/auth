import { Test, TestingModule } from '@nestjs/testing';
import {JwtService} from '@nestjs/jwt';

import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {AuthResolver} from './auth.resolver';
import {UserService} from '../user/user.service';

describe('Auth Service', () => {
    let service: AuthService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                { provide: AuthResolver, useValue: {} },
                { provide: AuthService, useValue: {} },
                { provide: JwtService, useValue: {} },
                { provide: UserService, useValue: {} },
            ],
        }).compile();
        service = module.get<AuthService>(AuthService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
