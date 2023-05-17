import { AfterInsert, Entity, Column, PrimaryGeneratedColumn, AfterRemove, AfterUpdate } from 'typeorm'

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number

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
        console.log('Removed user with id', this.id)
    }

    @AfterUpdate()
    logUpdate(){
        console.log('updated user with id', this.id)
    }
}