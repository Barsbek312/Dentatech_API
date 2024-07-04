import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { BranchService } from 'src/branch/branch.service';
import { BranchModule } from 'src/branch/branch.module';
import { PrismaClient } from '@prisma/client';

export const dynamicImport = async (
  packageName: string,
) =>
  new Function(
    `return import('${packageName}')`,
  )();

const prisma = new PrismaClient();

const DEFAULT_ADMIN = {
  email: 'admin@example.com',
  password: 'password',
};

const authenticate = async (
  email: string,
  password: string,
) => {
  if (
    email === DEFAULT_ADMIN.email &&
    password === DEFAULT_ADMIN.password
  ) {
    return Promise.resolve(DEFAULT_ADMIN);
  }
  return null;
};

const createAdminModule = async () => {
  const { AdminModule } = await dynamicImport(
    '@adminjs/nestjs',
  );

  const { Database, Resource, getModelByName } =
    await dynamicImport('@adminjs/prisma');

  const resources = [
    {
      resource: {
        model: getModelByName('Staff'),
        client: prisma,
      },
    },
    {
      resource: {
        model: getModelByName('Branch'),
        client: prisma,
      },
    },
    {
      resource: {
        model: getModelByName('StaffPosition'),
        client: prisma,
      },
    },
    {
      resource: {
        model: getModelByName('StaffStatus'),
        client: prisma,
      },
    },
    {
      resource: {
        model: getModelByName('City'),
        client: prisma,
      },
    },
    {
      resource: {
        model: getModelByName('Clinic'),
        client: prisma,
      },
    },
    {
      resource: {
        model: getModelByName('ToothType'),
        client: prisma,
      },
    },
    {
      resource: {
        model: getModelByName('District'),
        client: prisma,
      },
    },
    {
      resource: {
        model: getModelByName('Jaw'),
        client: prisma,
      },
    },
    {
      resource: {
        model: getModelByName('Reception'),
        client: prisma,
      },
    },
    {
      resource: {
        model: getModelByName('ReceptionType'),
        client: prisma
      }
    },
    {
      resource: {
        model: getModelByName('ReceptionStatus'),
        client: prisma
      }
    },
    {
      resource: {
        model: getModelByName('Patient'),
        client: prisma
      }
    }
  ];

  return AdminModule.createAdminAsync({
    useFactory: () => ({
      adminJsOptions: {
        rootPath: '/admin',
        resources: resources,
      },
      auth: {
        authenticate,
        cookieName: 'adminjs',
        cookiePassword: 'secret',
      },
      sessionOptions: {
        resave: true,
        saveUninitialized: true,
        secret: 'secret',
      },
    }),
  });
};

@Module({
  controllers: [UserController],
  imports: [BranchModule, createAdminModule()],
})
export class UserModule {}
