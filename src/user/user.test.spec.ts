

// import { Test,TestingModule } from "@nestjs/testing";
// import { UserController } from "./user.controller";
// import { UserService } from "./user.service";

// import { INestApplication } from '@nestjs/common';
// import { AppModule } from "../app.module";
// import * as request from 'supertest';

// import { AuthService } from "../auth/auth.service";
// import { AuthController } from "../auth/auth.controller";
// import { getRepositoryToken } from '@nestjs/typeorm';
// import { User } from '../Entity/user.entity';


// import { JwtModule } from '@nestjs/jwt'; // Import JwtModule
// import { ConfigModule, ConfigService } from '@nestjs/config';

// describe('UserController', () => {
//     let controller: UserController;
//     let authcontroller: AuthController;

//     let app: INestApplication

//      const mockuserService={
//       create:jest.fn(dto =>{
//         return {
//           id:Date.now(),
//           ...dto
//         }

//       })

//      }
    

//   // const ApiServiceProvider = {
//   //   provide: NoteService,
//   //   useFactory: () => ({
//   //     saveNote: jest.fn(() => []),
//   //     findAllNotes: jest.fn(() => []),
//   //     findOneNote: jest.fn(() => { }),
//   //     updateNote: jest.fn(() => { }),
//   //     deleteNote: jest.fn(() => { })
//   //   })
//   // }

//         beforeEach(async () => {
//             const appl: TestingModule = await Test.createTestingModule({
//               controllers: [UserController,AuthController],
//               providers: [UserService,AuthService],
//             }).overrideProvider(UserService).useValue(mockuserService).compile();
        
//             controller = appl.get<UserController>(UserController);
//             authcontroller=appl.get<AuthController>(AuthController);
            
//     })

//     it('should be defined', () => {
//       expect(controller).toBeDefined();
//       expect(authcontroller).toBeDefined();
//     })

//   let createdUserId: string;

//   beforeAll(async () => {
//     const moduleFixture: TestingModule = await Test.createTestingModule({
//       imports: [AppModule],
//     }).compile();

//     app = moduleFixture.createNestApplication();
//     await app.init();
  
//   })

// })




import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { LoginDto } from '../auth/dto';
import { ValidationPipe } from '@nestjs/common';
import { User } from '../Entity/user.entity';
import { Bookmark } from '../Entity/bookmark.entity';
import { AuthDto } from '../auth/dto';
import { HttpStatus } from '@nestjs/common';
import { EditDto } from '../user/dto';

import * as jwt from 'jsonwebtoken';






describe('App e2e', () => {

  let app: INestApplication;
  let createdUserId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(new ValidationPipe ({whitelist: true}))

    await app.init();

    await app.listen(3000);

  });

  // afterAll(()=>{
  //   app.close();
  // })

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






































// Mock a UserRepository for testing
// const mockUserRepository = {
//   create: jest.fn(),
//   save: jest.fn(),
//   findOne: jest.fn(),
// };

// describe('AuthService', () => {
//   let service: AuthService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         AuthService,
//         {
//           provide: getRepositoryToken(User), // Use the actual entity class here
//           useValue: mockUserRepository, // Use the mock repository
//         },
//       ],
//     }).compile();

//     service = module.get<AuthService>(AuthService);
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });

//   describe('signup', () => {
//     it('should create and return a new user', async () => {
//       // Arrange
//       const authDto = {
//         email: 'test@example.com',
//         firstName: 'John',
//         lastName: 'Doe',
//         password: 'password',
//       };

//       const userEntity = {
//         id: 1,
//         ...authDto,
//       };

//       mockUserRepository.create.mockReturnValue(userEntity);
//       mockUserRepository.save.mockResolvedValue(userEntity);

//       // Act
//       const result = await service.signup(authDto);

//       // Assert
//       expect(result).toEqual({ user: userEntity });

//       // Verify that create and save methods were called
//       expect(mockUserRepository.create).toHaveBeenCalledWith(authDto);
//       expect(mockUserRepository.save).toHaveBeenCalledWith(userEntity);
//     });

//     it('should handle errors during user creation', async () => {
//       // Arrange
//       const authDto = {
//         email: 'test@example.com',
//         firstName: 'John',
//         lastName: 'Doe',
//         password: 'password',
//       };

//       // Mock an error during user creation
//       mockUserRepository.create.mockRejectedValue(new Error('Database error'));

//       // Act and Assert
//       await expect(service.signup(authDto)).rejects.toThrowError('Database error');
//     });
//   });

//   // Add more test cases for the signin method and other scenarios as needed
// });





