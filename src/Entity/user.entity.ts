import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm"

import { Bookmark } from "./bookmark.entity";
import { OneToMany } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    password: string

    @Column({ unique: true })
    email: string 

    @OneToMany(() => Bookmark , (bookmark) => bookmark.user, { cascade: true })
    bookmark: Bookmark[];
}