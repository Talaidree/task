import { Request, Response, Express, NextFunction } from "express";
import express from 'express'
import { Customer } from "../db/entities/Customer.js";
import { AppError } from "../errors/AppError.js";

 const createCustomer =async(customer:Customer)=>{
 const customerExists=await Customer.findOne({where:{mobilePhone:customer.mobilePhone}})

if(customerExists)
{
    throw new Error("Customer already exists ")
}

const newCustomer =await Customer.create(customer).save()

return newCustomer
 }



 const getAllCustomer =async(res:Response,req:Request)=>
 {
const Customers= await Customer.find()
res.json({
    message: "getting all Customers successfully",
    status: true,
   data:Customers
})

return Customers

 }



 const getSingleCustomer =async(customerId:any)=>{
const customer=await Customer.findOne({where:{id:customerId}})
 if(!customer)
 {
    throw new AppError ("customer not found", 404, true)
 }
return customer


  }
  const removeCustomer = async (id: number) => {
    const customer = await Customer.findOne({ where: { id: id } });

    if (!customer) {
        throw new AppError("Customer not found", 404, true);
    }

    return customer.remove();
};


 export{createCustomer,getAllCustomer,getSingleCustomer,removeCustomer}