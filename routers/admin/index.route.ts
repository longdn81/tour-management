import { Express } from "express";
import { categoryRoutes } from "./category.route";
import { systemConfig } from "../../config/config";

const adminRoutes= (app : Express) => {

    const PATCH_ADMIN = `${systemConfig.prefixAdmin}`
    app.use(`${PATCH_ADMIN}/categories` , categoryRoutes)

}

export default adminRoutes ;