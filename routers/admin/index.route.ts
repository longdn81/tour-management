import { Express } from "express";
import { categoryRoutes } from "./category.route";
import { systemConfig } from "../../config/config";
import { tourRoutes } from "./tour.route";

const adminRoutes= (app : Express) => {

    const PATCH_ADMIN = `${systemConfig.prefixAdmin}`
    app.use(`${PATCH_ADMIN}/categories` , categoryRoutes)

    app.use(`${PATCH_ADMIN}/tours` , tourRoutes)

}

export default adminRoutes ;