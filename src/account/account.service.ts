import { forwardRef, HttpException, HttpStatus, Inject, Injectable, RequestTimeoutException } from '@nestjs/common';
import { RegisterAccountDto } from './dto/register-account.dto';
import { Repository } from 'typeorm';
import { Account } from './entities/account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { InfoAccount } from './entities/info-account.entity';
import { AuthService } from 'src/auth/auth.service';
import { v4 as uuidv4 } from 'uuid'

@Injectable()
export class AccountService {
    constructor(
        @InjectRepository(Account)
        private accountRepository: Repository<Account>,

        @InjectRepository(InfoAccount)
        private infoAccountRepository: Repository<InfoAccount>,

        @Inject(forwardRef(() => AuthService))
        private readonly authService: AuthService
    ) {}

    public async registerAccount(registerAccount: RegisterAccountDto) {
        const account = await this.getAccountByEmail(registerAccount.email)
        if (account) throw new HttpException('La cuenta ya existe', HttpStatus.CONFLICT) 
        const newAccount = this.accountRepository.create({
            ...registerAccount,
            id: uuidv4(),
            password: await this.authService.hashPassword(registerAccount.password)
        })
        try {
            await this.accountRepository.save(newAccount)
            const infoAccount = this.infoAccountRepository.create({
                ...registerAccount.info_account,
                account_id: newAccount.id
            })
            await this.infoAccountRepository.save(infoAccount)
            return {
                message: 'Cuenta creada exitosamente'
            }
        } catch (error) {
            throw new RequestTimeoutException('Error al crear la cuenta')
        }
    }

    public async getAccountByEmail(email: string) {
        const account = await this.accountRepository.findOneBy({email})
        return account
    }

}
