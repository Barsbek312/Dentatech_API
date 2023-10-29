import { Test } from "@nestjs/testing"
import { AppModule } from "./../src/app.module";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import * as pactum from 'pactum';
import { PrismaService } from "./../src/prisma/prisma.service";
import { AuthDto } from "src/auth/dto";

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication()
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true
    }))

    await app.init()
    await app.listen(3333)

    prisma = app.get(PrismaService)

    await prisma.cleanDB()
    pactum.request.setBaseUrl("http://localhost:3333")
  })

  afterAll(() => {
    app.close()
  })

  describe('Auth', () => {
    const dto: AuthDto = {
      email: "suiunbekbarsbek@auca.kg",
      password: "1234"
    }
    describe('signup', () => {
      it("should throw if email is empty", () => {
        return pactum
          .spec()
          .post("/auth/signup")
          .withBody({
            password: dto.password
          })
          .expectStatus(400)
      })
      it("should throw if password is empty", () => {
        return pactum
          .spec()
          .post("/auth/singup")
          .withBody({
            email: dto.email
          })
          .expectStatus(404)
      })
      it("should throw if nobody provided", () => {
        return pactum
          .spec()
          .post("/auth/singup")
          .expectStatus(404)
      })
      it("should signup", () => {

        return pactum
          .spec()
          .post("/auth/signup",)
          .withBody(dto)
          .expectStatus(201)
      })
    })

    describe('signin', () => {
      it("should throw if email is empty", () => {
        return pactum
          .spec()
          .post("/auth/signin")
          .withBody({
            password: dto.password
          })
          .expectStatus(400)
      })
      it("should throw if password is empty", () => {
        return pactum
          .spec()
          .post("/auth/signin")
          .withBody({
            email: dto.email
          })
          .expectStatus(400)
      })
      it("should throw if nobody provided", () => {
        return pactum
          .spec()
          .post("/auth/signin")
          .expectStatus(400)
      })
      it("should signin", () => {
        return pactum
          .spec()
          .post("/auth/signin")
          .withBody(dto)
          .expectStatus(200)
      })
    })
  })

  describe('User', () => {
    describe('get current user', () => {

    })
    describe('edit user', () => {

    })
  })

  describe('Bookmark', () => {
    describe('create bookmark', () => {

    })
    describe('get bookmark', () => {

    })
    describe('get bookmark by id', () => {

    })
    describe('edit bookmark', () => {

    })
    describe('delete bookmark', () => {

    })
  })




})
