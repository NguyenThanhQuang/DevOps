const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

let tasks = [
  { id: 1, name: "Học DevOps", completed: false },
  { id: 2, name: "Làm bài tập lớn", completed: false },
  { id: 3, name: "Đẩy code lên Github", completed: true },
];
let nextId = 4;

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.get("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const task = tasks.find((t) => t.id === taskId);
  if (task) {
    res.json(task);
  } else {
    res.status(404).json({ message: "Không tìm thấy công việc!" });
  }
});

app.post("/tasks", (req, res) => {
  const newTaskName = req.body.name;
  if (!newTaskName) {
    return res
      .status(400)
      .json({ message: "Tên công việc không được để trống" });
  }

  const isDuplicate = tasks.some((t) => t.name === newTaskName);
  if (isDuplicate) {
    return res
      .status(409)
      .json({ message: "Task name already exists" });
  }

  const newTask = {
    id: nextId++,
    name: newTaskName,
    completed: false,
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.put("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const task = tasks.find((t) => t.id === taskId);
  if (task) {
    if (req.body.name !== undefined) {
      task.name = req.body.name;
    }
    if (req.body.completed !== undefined) {
      task.completed = typeof req.body.completed === "boolean"
        ? req.body.completed
        : req.body.completed === "true";
    }
    res.json(task);
  } else {
    res.status(404).json({ message: "Task not found!" });
  }
});
  const taskId = parseInt(req.params.id, 10);
  const taskIndex = tasks.findIndex((t) => t.id === taskId);

  if (taskIndex !== -1) {
    const deletedTask = tasks.splice(taskIndex, 1)[0];
    res.status(200).json({ message: "Đã xóa công việc!", task: deletedTask });
  } else {
    res.status(404).json({ message: "Không tìm thấy công việc!" });
  }

app.listen(port, () => {
  console.log(`Server API is running at http://localhost:${port}`);
});
