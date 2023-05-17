import { AfterInsert, Entity, Column, PrimaryGeneratedColumn, AfterRemove, AfterUpdate } from 'typeorm'

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: string

    @Column()
    email: string

    @Column()
    password: string

    @AfterInsert()
    logInsert(){
        console.log('inserted user of id', this.id)
    }

    @AfterRemove()
    logRemove(){

    }

    @AfterUpdate()
    logUpdate(){}
}