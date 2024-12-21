import DataUmat from "../Models/DataUmatModel.js";
import Klenteng from "../Models/KlentengModel.js";
import User from "../Models/UserModel.js";

// Mendapatkan semua data umat
export const getAllDataUmat = async (req, res) => {
  try {
    const dataUmat = await DataUmat.findAll({
      include: [
        {
          model: User,
        },
        {
          model: Klenteng,
        },
      ],
    });
    res.status(200).json(dataUmat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getDataUmatByFalse = async (req, res) => {
  try {
    const dataUmat = await DataUmat.findAll({
     where : {
      validate : false
     }
    });
    res.status(200).json(dataUmat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mendapatkan data umat berdasarkan ID
export const getDataUmatById = async (req, res) => {
  try {
    const dataUmat = await DataUmat.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: User,
        },
        {
          model: Klenteng,
        },
      ],
    });
    if (!dataUmat) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }
    res.status(200).json(dataUmat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getDataUmatByIdKlentengTrue = async (req, res) => {
  try {
    const dataUmat = await DataUmat.findAll({
      where: { klentengId: req.params.id, validate: true },
      include: [
        {
          model: User,
        },
        {
          model: Klenteng,
        },
      ],
    });
    console.log(req.params.id);
    
    if (!dataUmat) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }
    res.status(200).json(dataUmat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getDataUmatByIdKlentengFalse = async (req, res) => {
  try {
    const dataUmat = await DataUmat.findAll({
      where: { klentengId: req.params.id, validate: false },
      include: [
        {
          model: User,
        },
        {
          model: Klenteng,
        },
      ],
    });
    if (!dataUmat) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }
    res.status(200).json(dataUmat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Menambahkan data umat baru
export const createDataUmat = async (req, res) => {
  const {
    no_kk,
    no_ktp,
    nama,
    alamat,
    status,
    tgl_lahir,
    pekerjaan,
    no_hp,
    jabatan,
    klentengId,
  } = req.body;

  // Validasi input
  if (
    !no_kk ||
    !no_ktp ||
    !nama ||
    !alamat ||
    !status ||
    !tgl_lahir ||
    !pekerjaan ||
    !no_hp ||
    !jabatan ||
    !klentengId
  ) {
    return res.status(400).json({
      message: "Lengkapi semua data "
    });
  }

  try {
    // Cek apakah no_ktp sudah ada
    const existingData = await DataUmat.findOne({ where: { no_ktp } });
    if (existingData) {
      return res.status(409).json({
        message: "No KTP Sudah Ada",
        existingData,
      });
    }

    // Buat data umat baru
    const newDataUmat = await DataUmat.create({
      id: no_ktp,
      no_kk,
      no_ktp,
      nama,
      alamat,
      status,
      tgl_lahir,
      pekerjaan,
      no_hp,
      jabatan,
      validate: false,
      userId: req.session.userId,
      klentengId,
    });

    // Kirim respons sukses
    res.status(201).json(newDataUmat);
  } catch (error) {
    console.error(error);

    // Kirim respons error
    res.status(500).json({ message: "Terjadi kesalahan pada server", error });
  }
};


// Mengupdate data umat
export const updateDataUmat = async (req, res) => {
  const { id } = req.params;
  const {
    no_kk,
    no_ktp,
    nama,
    alamat,
    status,
    tgl_lahir,
    pekerjaan,
    no_hp,
    jabatan,
    klentengId,
  } = req.body;

  try {
    const dataUmat = await DataUmat.findOne({ where: { id } });
    if (!dataUmat) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }

    await dataUmat.update({
      no_kk,
      no_ktp,
      nama,
      alamat,
      status,
      tgl_lahir,
      pekerjaan,
      no_hp,
      jabatan,
      userId: req.session.userId,
      klentengId,
    });

    res.status(200).json(dataUmat);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const terimahDataUmat = async (req, res) => {
  const { id } = req.params;

  try {
    const dataUmat = await DataUmat.findOne({ where: { id } });
    if (!dataUmat) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }

    await dataUmat.update({
      validate : true
    });

    res.status(200).json(dataUmat);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const tolakDataUmat = async (req, res) => {
  const { id } = req.params;

  try {
    const dataUmat = await DataUmat.findOne({ where: { id } });
    if (!dataUmat) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }

    await dataUmat.update({
      validate : 2
    });

    res.status(200).json(dataUmat);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Menghapus data umat
export const deleteDataUmat = async (req, res) => {
  const { id } = req.params;

  try {
    const dataUmat = await DataUmat.findOne({ where: { id } });
    if (!dataUmat) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }

    await dataUmat.destroy();
    res.status(200).json({ message: "Data berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
