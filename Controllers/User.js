import argon2 from "argon2";
import User from "../Models/UserModel.js";
import Klenteng from "../Models/KlentengModel.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ msg: "Tidak ada user" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ msg: "Tidak ada user" });
  }
};
export const createUser = async (req, res) => {
  const { username, password, role, confirmPassword, klentengId } = req.body;

  // Validasi password
  if (!password || password === "") {
    return res.status(400).json({ msg: "Password harus diisi" });
  }
  if (password !== confirmPassword) {
    return res
      .status(400)
      .json({ msg: "Password dan Confirm Password tidak cocok" });
  }

  const hashPassword = await argon2.hash(password);

  try {
    // Buat user baru
    const newUser = await User.create({
      username: username,
      password: hashPassword,
      role: role,
    });

    // Perbarui kolom userId di tabel Klenteng
    if (klentengId) {
      const klenteng = await Klenteng.findOne({ where: { id: klentengId } });
      if (klenteng) {
        await klenteng.update({ userId: newUser.id });
      } else {
        return res.status(404).json({ msg: "Klenteng tidak ditemukan" });
      }
    }

    res.status(200).json({ msg: "User berhasil dibuat dan Klenteng diperbarui" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Gagal membuat user atau memperbarui Klenteng" });
  }
};



export const deleteUser = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    await user.destroy();
    return res.status(200).json({ msg: "Berhasil Dihapus" });
  } catch (error) {
    return res.status(500).json({ msg: "user Gagal Dihapus" });
  }
};
