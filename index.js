const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Task = require("./models/tasks");

dotenv.config();

app.use("/static", express.static('public'));
app.use(express.urlencoded({ extended: true }));

async function connectToDatabase() {
    try {
        await mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true });
        console.log("Connected to the database!");
        app.listen(8888, () => console.log("Server Up and running"));
    } catch (error) {
        console.error("Error connecting to the database: " + error);
    }
}

connectToDatabase();

app.set("view engine", "ejs");

app.get("/", async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.render("todo.ejs", { todoTasks: tasks });
    } catch (err) {
        console.error("Error querying the database: " + err);
        res.status(500).send("Internal Server Error");
    }
});


//CREATE
app.post('/', async (req, res) => {
    const todoTask = new Task({
        content: req.body.content
    });

    try {
        await todoTask.save();
        res.redirect("/");
    } catch (err) {
        console.error("Error saving task to the database: " + err);
        res.redirect("/");
    }
});


//UPDATE
app.route("/edit/:id")
    .get(async (req, res) => {
        const id = req.params.id;
        try {
            const tasks = await tasks.find({});
            res.render("todoEdit.ejs", { todoTasks: tasks, idTask: id });
        } catch (err) {
            console.error("Error querying the database: " + err);
            res.status(500).send("Internal Server Error");
        }
    })
    .post(async (req, res) => {
        const id = req.params.id;
        try {
            await Task.findByIdAndUpdate(id, { content: req.body.content });
            res.redirect("/");
        } catch (err) {
            console.error("Error updating the task: " + err);
            res.status(500).send("Internal Server Error");
        }
    });


//DELETE
app.route("/remove/:id").get((req, res) => {
const id = req.params.id;
Task.findByIdAndRemove(id, err => {
if (err) return res.send(500, err);
res.redirect("/");
});
});
