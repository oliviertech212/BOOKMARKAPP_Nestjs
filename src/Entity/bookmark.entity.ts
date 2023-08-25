

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne} from "typeorm"

import { User } from "./user.entity";


@Entity()
export class Bookmark {
    @PrimaryGeneratedColumn()
    id: number

    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;

    @Column()
    title: string

    @Column()
    description: string

    @Column()
    link: string


    @ManyToOne(() => User , (user) => user.bookmark)
    user:number;
}