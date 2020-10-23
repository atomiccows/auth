import { Test, TestingModule } from '@nestjs/testing';
import {JwtService} from '@nestjs/jwt';

import {UserService} from '../user/user.service';
import {AuthController} from './auth.controller';
import {AuthResolver} from './auth.resolver';
import {AuthService} from './auth.service';

describe('Auth Controller', () => {
    let controller: AuthController;

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

        controller = module.get<AuthController>(AuthController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
