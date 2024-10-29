import { Express } from "express";
import { categoryRoutes } from "./category.route";
import { systemConfig } from "../../config/config";
import { tourRoutes } from "./tour.route";
import { uploadRoutes } from "./upload.route";

const adminRoutes= (app : Express) => {

    const PATCH_ADMIN = `${systemConfig.prefixAdmin}`
    app.use(`${PATCH_ADMIN}/categories` , categoryRoutes)

    app.use(`${PATCH_ADMIN}/tours` , tourRoutes)

    app.use(`${PATCH_ADMIN}/upload` , uploadRoutes) ;

}

export default adminRoutes ;