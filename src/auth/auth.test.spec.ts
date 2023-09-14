

import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../Entity/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';

describe('MyService', () => {
  let service: AuthService;

  let userRepository=Repository<User>
  const mockUserRepository={
    findOne: jest.fn(),

  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService,{
                  provide: getRepositoryToken(User), // Use the actual entity class here
                  useValue: mockUserRepository, // Use the mock repository
                },
                {
                  provide: JwtService,
                  useValue:{}
                },
                {
                  provide: ConfigService,
                  useValue:{}
                }
            ]
    }).compile();
    service = module.get<AuthService>(AuthService);

    userRepository=module.get<Repository<User>>(getRepositoryToken(User))
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find user',async()=>{
    await service.signin({email:"user@example.com",password:"password"});
    expect(userRepository.findOne).toHaveBeenCalled();
  })
});