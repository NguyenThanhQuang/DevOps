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
      task.completed = req.body.completed;
    }
    res.json(task);
  } else {
    res.status(404).json({ message: "Không tìm thấy công việc!" });
  }
});

app.delete("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const taskIndex = tasks.findIndex((t) => t.id === taskId);

  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ message: "Không tìm thấy công việc!" });
  }
});

app.listen(port, () => {
  console.log(`Server API đang chạy tại http://localhost:${port}`);
});
