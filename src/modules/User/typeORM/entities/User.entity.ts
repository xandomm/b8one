import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity('User')
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    name: string;

    @Column()
    age: number;

}
