import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("customer")

export class Customer extends BaseEntity{
static destroy: any;
static findIndex(arg0: { where: { id: any; }; }) {
    throw new Error("Method not implemented.");
}
@PrimaryGeneratedColumn("increment")
id:number
@Column({length:255})
name:string
 
@Column({unique:true})
mobilePhone:string

@Column  ("float")
balance:number
}