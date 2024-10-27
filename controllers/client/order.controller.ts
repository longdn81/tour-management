import { Request, Response } from "express";
import Order from "../../models/order.model";
import { generateOrderCode } from "../../helpers/generate";
import Tour from "../../models/tour.model";
import OrderItem from "../../models/order-item.model";


//[POST] /order
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

//[GET] /order/success
export const success =  async (req: Request, res: Response) => { 
    const orderCode = req.query.orderCode ;

    const order = await Order.findOne({
        where:{
            code : orderCode ,
            deleted : false
        },
        raw: true
    })

    const orderItem = await OrderItem.findAll({
        where : {
            orderId : order["id"] ,
        },
        raw : true
    })
    for (const item of orderItem) {
        item["price_special"] = item["price"] * (1 - item["discount"] / 100);
        item["total"] = item["price_special"] * item["quantity"];
      
        const tourInfo = await Tour.findOne({
          where: {
            id: item["tourId"]
          },
          raw: true
        });
      
        item["title"] = tourInfo["title"];
        item["slug"] = tourInfo["slug"];
        item["image"] = JSON.parse(tourInfo["images"])[0];      
    };

    order["total_price"] = orderItem.reduce((sum ,item) => sum + item["total"] , 0) ;

    res.render( "client/pages/order/success" ,{
        pageTitle : "dat hang thanh cong",
        order : order ,
        orderItem: orderItem ,
    })
};