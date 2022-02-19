import { BaseEntity, PrimaryColumn, Column, CreateDateColumn, Entity } from "typeorm";

@Entity()
export class Account extends BaseEntity {
    @PrimaryColumn()
    address: string;

    @Column()
    balance: number;

    @CreateDateColumn()
    created: Date;
}