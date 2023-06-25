import UserModel from "../models/UserModel.js";

export const getAllUsers = async (req, res) => {
  try {
    const result = await UserModel.getAllUsers();
    res.json(result);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const { nombre, password, direccion, telefono, email } = req.body;
    console.log(req.body)
    await UserModel.createUser(req.body);
    res.json({ message: 'Registro creado' });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { password, direccion, telefono, email } = req.body;
    await UserModel.updateUser(req.params.id, password, direccion, telefono, email);
    res.json({ message: 'Registro actualizado' });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const result = await UserModel.getUser(req.params.id);
    res.json(result);
  } catch (error) {
    res.json({ message: error.message });
  }
};
