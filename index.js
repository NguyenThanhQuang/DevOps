const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let items = [
  { id: 1, name: "Item 1", description: "Đây là item thứ nhất" },
  { id: 2, name: "Item 2", description: "Đây là item thứ hai" },
  { id: 3, name: "Item 3", description: "Đây là item thứ ba" },
];
let nextId = 4;

app.post("/items", (req, res) => {
  const { name, description } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Tên của item là bắt buộc" });
  }

  const newItem = {
    id: nextId++,
    name: name,
    description: description || "",
  };

  items.push(newItem);
  console.log("Đã tạo item mới:", newItem);
  res.status(201).json(newItem);
});

app.get("/items", (req, res) => {
  console.log("Lấy danh sách tất cả items");
  res.json(items);
});

app.get("/items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find((i) => i.id === id);

  if (item) {
    console.log(`Lấy thông tin item với ID: ${id}`);
    res.json(item);
  } else {
    res.status(404).json({ message: "Không tìm thấy item" });
  }
});

app.put("/items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { name, description } = req.body;
  const itemIndex = items.findIndex((i) => i.id === id);

  if (itemIndex !== -1) {
    items[itemIndex].name = name || items[itemIndex].name;
    items[itemIndex].description = description || items[itemIndex].description;

    console.log(`Đã cập nhật item với ID: ${id}`);
    res.json(items[itemIndex]);
  } else {
    res.status(404).json({ message: "Không tìm thấy item để cập nhật" });
  }
});

app.delete("/items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const initialLength = items.length;
  items = items.filter((i) => i.id !== id);

  if (items.length < initialLength) {
    console.log(`Đã xóa item với ID: ${id}`);
    res.status(200).json({ message: "Đã xóa item thành công" });
  } else {
    res.status(404).json({ message: "Không tìm thấy item để xóa" });
  }
});

app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
