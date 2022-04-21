import { BaseEntity, PrimaryColumn, Column, CreateDateColumn, Entity } from "typeorm";

@Entity()
export class Account extends BaseEntity {
    @PrimaryColumn()
    address: string;

    @Column({ type: "float" })
    balance: number;

    @Column({ default: "en-US" })
    locale: string;

    @CreateDateColumn()
    created: Date;
}
