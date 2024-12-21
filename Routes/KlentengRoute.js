import express from "express";
import {
  getAllKlenteng,
  getKlentengById,
  createKlenteng,
  updateKlenteng,
  deleteKlenteng,
  getAllKlentengByNULL,
  getAllKlentengByNotNULL,
  getPanjangUmatbyKlentengTrue,
  getPanjangUmatbyKlentengFalse,
  getAllKlentengTrue,
  getKlentengByUser,
} from "../Controllers/Klenteng.js"
import { verifyUser } from "../Middleware/AuthUser.js";

const router = express.Router();

router.get("/klenteng", getAllKlenteng);
router.get("/klenteng/user/:id", getKlentengByUser);
router.get("/klenteng/true", getAllKlentengTrue);
router.get("/klenteng/null", getAllKlentengByNULL);
router.get("/klenteng/notnull", getAllKlentengByNotNULL);
router.get("/klenteng/true/:id/umat-count", getPanjangUmatbyKlentengTrue);
router.get("/klenteng/false/:id/umat-count", getPanjangUmatbyKlentengFalse);
router.get("/klenteng/:id", getKlentengById);
router.post("/klenteng",createKlenteng);
router.patch("/klenteng/:id", verifyUser, updateKlenteng);
router.delete("/klenteng/:id", deleteKlenteng);

export default router;
