import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { LoginDto } from 'src/auth/dto';

const { spec } = require('pactum');
const pactum = require('pactum');




describe('App e2e', () => {

  beforeAll(async() => {

    const moduleRef=await Test.createTestingModule({
      imports:[AppModule]
  }).compile()

  })

it.todo("should pass")


});

describe("testapi", () => {
  it("should login",()=>{
    const dto:LoginDto={
      email:"oliviertech54@gmail.com",
  
    password:"123456"
    }
  
    return pactum.spec().post('http://localhost:5000/auth/signin').withBody(dto).expectStatus(201).inspest()
  })
})


