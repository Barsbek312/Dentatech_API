import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { BranchService } from 'src/branch/branch.service';
import { BranchModule } from 'src/branch/branch.module';

@Module({
  controllers: [UserController],
  imports: [BranchModule]
})
export class UserModule {}
