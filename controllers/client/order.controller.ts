import { Request, Response } from "express";
import Order from "../../models/order.model";
import { generateOrderCode } from "../../helpers/generate";
import Tour from "../../models/tour.model";
import OrderItem from "../../models/order-item.model";


//[GET] /order
export const index =  async (req: Request, res: Response) => { 
    const data = req.body ;

    // Lưu data vào bảng order
    const dataOrder = {
        code : "",
        fullName : data.info.fullName ,
        phone : data.info.phone ,
        note : data.info.note ,
        status : "initial"
    }

    const order = await Order.create(dataOrder);
    // tao code cho don hang
    const orderId = order.dataValues.id ;
    const code = generateOrderCode(orderId);

    await Order.update({
        code : code ,
    },{
        where : {
            id : orderId
        }
    })

    //  luu data vao order_item
    for (const item of data.cart) {
        const dataItem = {
            orderId :orderId ,
            tourId : item.tourId,
            quantity : item.quantity,
        };
        
        const infoTour = await Tour.findOne({
            where:{
                id : item.tourId,
                deleted : false ,
                status:"active"
            },
            raw :true
        })
        
        dataItem["price"]=infoTour["price"];
        dataItem["discount"]=infoTour["discount"];
        dataItem["timeStart"]=infoTour["timeStart"];

        
        try {
            await OrderItem.create(dataItem);
        } catch (error) {
            console.log(error);
        }
        

    }
    res.json({
        code :200 ,
        message : "Đặt hàng thành công",
        orderCode : code ,
    })
};