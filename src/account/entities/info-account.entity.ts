import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { Account } from "./account.entity";
import { join } from "path";

@Entity()
export class InfoAccount {
    @PrimaryColumn()
    @OneToOne(() => Account, account => account.info_account)
    @JoinColumn({
        name: 'account_id',
        referencedColumnName: 'id'
    })
    account_id: string;

    @Column({
        type: 'varchar',
        length: 50,
        nullable: false
    })
    first_name: string;

    @Column({
        type: 'varchar',
        length: 50,
        nullable: false
    })
    last_name: string;

    @Column({
        type: 'varchar',
        length: 10,
        nullable: true
    })
    phone: string;
}