const RoomModel = require("../models/room.model");

const RoomController = {
  getAllRooms: async (req, res) => {
    try {
      const rooms = await RoomModel.getAll();
      res.json(rooms);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getRoomById: async (req, res) => {
    try {
      const room = await RoomModel.getById(req.params.id);
      if (!room) {
        return res.status(404).json({ message: "Room not found" });
      }
      res.json(room);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  createRoom: async (req, res) => {
    try {
      const { name, price } = req.body;
      const newRoom = await RoomModel.create(name, price);
      res.status(201).json(newRoom);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  updateRoom: async (req, res) => {
    try {
      const { name, price } = req.body;
      const updatedRoom = await RoomModel.update(
        req.params.id,
        name,
        price
      );

      if (!updatedRoom) {
        return res.status(404).json({ message: "Room not found" });
      }

      res.json(updatedRoom);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  deleteRoom: async (req, res) => {
    try {
      await RoomModel.delete(req.params.id);
      res.json({ message: "Room deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = RoomController;
