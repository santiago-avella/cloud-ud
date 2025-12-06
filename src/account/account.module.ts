import { forwardRef, Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { InfoAccount } from './entities/info-account.entity';
import { AuthModule } from 'src/auth/auth.module';


@Module({
  controllers: [AccountController],
  providers: [AccountService],
  exports: [AccountService],
  imports: [TypeOrmModule.forFeature([Account, InfoAccount]), forwardRef(() => AuthModule)]
})
export class AccountModule {}
