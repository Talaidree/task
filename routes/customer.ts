import { NextFunction, Router } from "express";
import { Request, Response, Express } from "express";
import { createCustomer, removeCustomer, getSingleCustomer } from "../controllers/customerController.js";
import{getAllCustomer}from "../controllers/customerController.js"
import { logRequestMiddleware } from "../Middleware/printlnfoMiddleware.js";


const router = Router()

router.post("/", async (req, res, next) => {
    try {
        const customer = req.body
        if (!customer.name||!customer.mobilePhone||!customer.balance) {
            return res.status(400).json({
                message: "   missing",
                success: false,
            })
        }

        const newCustomer = await createCustomer(customer)

        res.status(201).json({
            message: "Customer created successfully",
            success: true,
            data: newCustomer
        })

    } catch (error) {
        next(error)
    }
})

router.get("/",logRequestMiddleware ,getAllCustomer)


router.get("/:id",async(req:Request, res:Response, next:NextFunction )=> {
    try{
    const CustomerId=Number(req.params.id)
     const customer=await getSingleCustomer(CustomerId)

    res.status(201).json({

        message:"customer :",
       
       customer:customer
    })
    }
catch (error){
    console.log("error :"+error);
    next(error)
    

}


})





router.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id);

    try {
        const customer = await removeCustomer(id);

        res.json({
            message: "Customer deleted successfully",
            success: true
        });
    } catch (error) {
        console.log("Error: " + error);
        next(error);
    }
});






export default router

