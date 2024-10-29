import {Router } from "express";
import * as controller from "../../controllers/admin/tour.controller";
import multer from "multer";
import * as uploadCloud from "../../middlewares/admin/uploadCloud.middleware";

const router : Router = Router();

const upload = multer();

router.get('/', controller.index);

router.get('/create', controller.create);

router.post('/create',
    upload.fields (
       [ { name: 'images', maxCount: 10}   ]
    ),
    uploadCloud.uploadFields,
    controller.createPost);


export const  tourRoutes : Router = router;