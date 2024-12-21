import { Op } from "sequelize";
import Klenteng from "../Models/KlentengModel.js";
import User from "../Models/UserModel.js";
import DataUmat from "../Models/DataUmatModel.js";


// Mendapatkan semua data klenteng
export const getAllKlenteng = async (req, res) => {
  try {
    const klentengs = await Klenteng.findAll({
      include: [
        {
          model: User,
        },
      ],
    });
    res.status(200).json(klentengs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getKlentengByUser = async (req, res) => {
  try {
    const klentengs = await Klenteng.findOne({
      where : {
        userId : req.params.id
      },
      include: [
        {
          model: User,
        },
      ],
    });
    res.status(200).json(klentengs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllKlentengTrue = async (req, res) => {
  try {
    const klentengs = await Klenteng.findAll({
      include: [
        {
          model: User,
        },
      ],
    });
    res.status(200).json(klentengs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllKlentengByNULL = async (req, res) => {
  try {
    const klentengs = await Klenteng.findAll({
      where : {
        userId : null
      },
      include: [
        {
          model: User,
        },
      ],

    });
    res.status(200).json(klentengs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const getAllKlentengByNotNULL = async (req, res) => {
  try {
    const klentengs = await Klenteng.findAll({
      where: {
        userId: {
          [Op.ne]: null, 
        },
      },
      include: [
        {
          model: User,
        },
      ],
    });
    res.status(200).json(klentengs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPanjangUmatbyKlentengTrue = async (req, res) => {
  try {
    const klentengs = await DataUmat.findAll({
      where: {
        klentengId : req.params.id,
        validate : true,
        userId: {
          [Op.ne]: null, 
        },
      },
    });
    res.status(200).json(klentengs.length);
    console.log(klentengs.length);
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPanjangUmatbyKlentengFalse = async (req, res) => {
  try {
    const klentengs = await DataUmat.findAll({
      where: {
        klentengId : req.params.id,
        validate : false,
        userId: {
          [Op.ne]: null, 
        },
      },
    });
    res.status(200).json(klentengs.length);
    console.log(klentengs.length);
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Mendapatkan data klenteng berdasarkan ID
export const getKlentengById = async (req, res) => {
  try {
    const klenteng = await Klenteng.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: User,
        },
      ],
    });
    if (!klenteng) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }
    res.status(200).json(klenteng);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Menambahkan data klenteng baru
export const createKlenteng = async (req, res) => {
  const { nama_klenteng } = req.body;

  try {
    const newKlenteng = await Klenteng.create({
      nama_klenteng,
      userId : null,
    });
    res.status(201).json(newKlenteng);
    
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Mengupdate data klenteng
export const updateKlenteng = async (req, res) => {
  const { id } = req.params;
  const { nama_klenteng, userId } = req.body;

  try {
    const klenteng = await Klenteng.findOne({ where: { id } });
    if (!klenteng) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }

    await klenteng.update({
      nama_klenteng,
      userId,
    });

    res.status(200).json(klenteng);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Menghapus data klenteng
export const deleteKlenteng = async (req, res) => {
  const { id } = req.params;

  try {
    const klenteng = await Klenteng.findOne({ where: { id } });
    if (!klenteng) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }
    const user = await User.findOne({ where: { id : klenteng.userId } });

    await user.destroy();
    await klenteng.destroy();
    res.status(200).json({ message: "Data berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
