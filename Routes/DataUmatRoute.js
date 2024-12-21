import express from "express";
import {
  getAllDataUmat,
  getDataUmatById,
  createDataUmat,
  updateDataUmat,
  deleteDataUmat,
  getDataUmatByFalse,
  getDataUmatByIdKlentengTrue,
  getDataUmatByIdKlentengFalse,
  terimahDataUmat,
  tolakDataUmat,
} from "../Controllers/DataUmat.js";
import { verifyUser } from "../Middleware/AuthUser.js";

const router = express.Router();

router.get("/dataumat", getAllDataUmat);
router.get("/dataumat/:id", getDataUmatById);
router.get("/dataumat/validate/false", getDataUmatByFalse);
router.get("/dataumat/klenteng/true/:id", getDataUmatByIdKlentengTrue);
router.get("/dataumat/klenteng/false/:id", getDataUmatByIdKlentengFalse);
router.post("/dataumat",verifyUser, createDataUmat);
router.patch("/dataumat/:id", updateDataUmat);
router.patch("/dataumat/terimah/:id", terimahDataUmat);
router.patch("/dataumat/tolak/:id", tolakDataUmat);
router.delete("/dataumat/:id", deleteDataUmat);

export default router;
