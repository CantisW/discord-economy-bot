import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Transaction extends BaseEntity {
    @PrimaryGeneratedColumn()
    index: number;

    @Column()
    txid: string;

    @Column()
    sender: string;

    @Column()
    recepient: string;

    @Column({ type: 'float' })
    amount: number;

    @CreateDateColumn()
    timestamp: Date;

    @Column({ type: 'float' })
    txfee: number;

    @Column()
    previousHash: string;
}