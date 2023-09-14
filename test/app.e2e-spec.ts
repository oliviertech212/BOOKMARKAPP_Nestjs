import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { LoginDto } from '../src/auth/dto';
import { ValidationPipe } from '@nestjs/common';
import { User } from '../src/Entity/user.entity';
import { Bookmark } from '../src/Entity/bookmark.entity';
import { AuthDto } from '../src/auth/dto';
import { HttpStatus } from '@nestjs/common';
import { EditDto } from '../src/user/dto';
import { DataSource } from 'typeorm';
import { getConnection } from 'typeorm';

import * as jwt from 'jsonwebtoken';






describe('App e2e', () => {

  let app: INestApplication;
  let createdUserId: string;
  let previousNodeEnv;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(new ValidationPipe ({whitelist: true}))

    await app.init();

    await app.listen(3000);


    // previousNodeEnv = process.env.NODE_ENV;
    // process.env.NODE_ENV = 'test';
    
    
  });



  afterAll(async()=>{
    const dataSource = app.get(DataSource);
    // await dataSource.createQueryBuilder().delete().from(Bookmark).execute();
    // await dataSource.createQueryBuilder().delete().from(User).execute();
    
    app.close();
  })

 

  describe('Auth',()=>{


    const mockUser: AuthDto = {
  
      firstName: "givenName",
      lastName: "familyName",
      email: "email@homtail.com",
      password: "password",
    };

   it('/auth/signup (POST)',async ()=>{
    // request(app.getHttpServer())
   
    const response = await request(app.getHttpServer()).post('/auth/signup').set("Accept", "application/json").send(mockUser)

    expect(response.statusCode).toBe(201)
   
   });


   it('GET LOGED IN USER', async () => {
    const mockCredentials:LoginDto = {
      email: "email@homtail.com",
      password: "password",
    };
    const TOKEN='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXIiOnsiaWQiOjEsImNyZWF0ZWRfYXQiOiIyMDIzLTA5LTAxVDEyOjMyOjIxLjQ1M1oiLCJ1cGRhdGVkX2F0IjoiMjAyMy0wOS0wMVQxMjozMjoyMS40NTNaIiwiZmlyc3ROYW1lIjoiZ2l2ZW5OYW1lIiwibGFzdE5hbWUiOiJmYW1pbHlOYW1lIiwiZW1haWwiOiJlbWFpbEBob210YWlsLmNvbSJ9LCJpYXQiOjE2OTM1NzIxMjksImV4cCI6MTY5MzU3NTcyOX0.hXkQGqsM3GZ5TL8Ea9ZmlIwo1E4FlsxLNRjbr2AvTWY'
    const response = await request(app.getHttpServer())
      .get('/users/me')
      .set('Authorization', `Bearer ${TOKEN}`)
      .expect(200); 
      console.log("response: " +response.body);
    // expect(response.body.access_token).toBeDefined();
    
  });

  it('it should retun 401 for unouthorized', async () => {
    const response = await request(app.getHttpServer())
      .get('/users/me')
      .expect(401); 
      console.log("response: " +response.body);
    // expect(response.body.access_token).toBeDefined();
    
  });

  let Token=''
  let id:string
  it('SHOULD LOGIN USER', async () => {
    const mockCredentials:LoginDto = {
      email: "email@homtail.com",
      password: "password",
    };

    const response = await request(app.getHttpServer())
      .post('/auth/signin')
      .send(mockCredentials)
      .expect(201); 
      console.log("response: " +response.body.access_token);
    expect(response.body.access_token).toBeDefined();

     Token=await response.body.access_token;
    
  });



  it('GET LOGED IN USER', async () => {
    const mockCredentials:LoginDto = {
      email: "email@homtail.com",
      password: "password",
    };
    const response = await request(app.getHttpServer())
      .get('/users/me')
      .set('Authorization', `Bearer ${Token}`)
      .expect(200); 
      console.log("response: " +JSON.stringify(response.body.user.id));
    // expect(response.body.access_token).toBeDefined();
    
  });



  const usertoupdate: EditDto = {
  
    firstName: "givenName",
    lastName: "familyName",
    email: "oliviertech@homtail.com",
    password: "password",
  };

 it('update user (POST)',async ()=>{

  const response = await request(app.getHttpServer()).patch('/users/update')
  .set('Authorization', `Bearer ${Token}`)
  .set("Accept", "application/json").send(usertoupdate)
  expect(response.statusCode).toBe(200)
 
 });



   





   })

   

  

});




// import { Test, TestingModule } from '@nestjs/testing';
// import { INestApplication, HttpStatus } from '@nestjs/common';
// import * as request from 'supertest';
// import { AppModule } from './../src/app.module';

// describe('Auth (e2e)', () => {
//   let app: INestApplication;

//   beforeAll(async () => {
//     const moduleFixture: TestingModule = await Test.createTestingModule({
//       imports: [AppModule], // Import your AppModule
//     }).compile();

//     app = moduleFixture.createNestApplication();
//     await app.init();
//   });

//   afterAll(async () => {
//     await app.close();
//   });

//   it('/auth/signup (POST)', async () => {
//     const mockUser = {
//       firstName: 'John',
//       lastName: 'Doe',
//       email: 'johndoe@example.com',
//       password: 'secret',
//     };

//     const response = await request(app.getHttpServer())
//       .post('/auth/signup')
//       .send(mockUser)
//       .expect(HttpStatus.CREATED); // Expect a 201 status code

//     // Optionally, you can make assertions on the response body
//     expect(response.body.firstName).toEqual(mockUser.firstName);
//     expect(response.body.lastName).toEqual(mockUser.lastName);
//     expect(response.body.email).toEqual(mockUser.email);
//   });

//   it('/auth/signin (POST)', async () => {
//     const mockCredentials = {
//       email: 'johndoe@example.com',
//       password: 'secret',
//     };

//     const response = await request(app.getHttpServer())
//       .post('/auth/signin')
//       .send(mockCredentials)
//       .expect(201); 
//     expect(response.body.access_token).toBeDefined();
//   });
// });
