import { Router, type IRouter } from "express";
import healthRouter from "./health";
import appointmentsRouter from "./appointment";

const router: IRouter = Router();
router.use(healthRouter);
router.use(appointmentsRouter);

export default router;