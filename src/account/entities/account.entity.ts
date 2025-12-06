import { Column, CreateDateColumn, Entity, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { InfoAccount } from "./info-account.entity";

@Entity()
export class Account{
    @PrimaryColumn({
        type: 'varchar',
        length: 100,
        nullable: false
    })
    id : string;

    @Column({
        type: 'varchar',
        unique: true,
        length: 50,
        nullable: false,
    })
    email: string;

    @Column({
        type: 'varchar',
        length: 30,
        nullable: false
    })
    password: string;

    @Column({
        type: 'varchar',
        length: 10,
        nullable: false
    })
    status: string;

    @CreateDateColumn()
    created_at: Date;

    @OneToOne(() => InfoAccount, (InfoAccountEntity) => InfoAccountEntity.account_id)
    info_account: InfoAccount;
}