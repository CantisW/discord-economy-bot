import { BaseEntity, Column, CreateDateColumn, Entity } from "typeorm";

@Entity()
export class Account extends BaseEntity {
    @Column()
    address: string;

    @Column()
    balance: number;

    @CreateDateColumn()
    created: Date;
}