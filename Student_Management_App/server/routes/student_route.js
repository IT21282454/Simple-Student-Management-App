const express = require("express");
let studentModel = require("../models/student_model");

const router = express.Router();

// add new student
router.post("/addStudents", async (req, res) => {
    const { name, age, gender } = req.body;

    const newStudent = new studentModel({ name, age, gender });

    await newStudent
        .save()
        .then((result) => {
            res.status(200).json({
                message: "Student details are save succuessfully!",
                result,
            });
        })
        .catch((err) => {
            res.status(400).json({ message: err });
        });
});

// get all students details
router.get("/getStudents", async (req, res) => {
    await studentModel
        .find()
        .then((result) => {
            res.status(200).json({
                message: "Students details are here",
                result,
            });
        })
        .catch((err) => {
            res.status(400).json({ eror: err });
        });
});

// update specific student detail
router.put("/updateStudents/:id", async (req, res) => {
    const id = req.params.id;
    const { name, age, gender } = req.body;

    const updatedStudent = { name, age, gender };

    await studentModel
        .findByIdAndUpdate(id, updatedStudent)
        .then((result) => {
            res.status(200).json({
                message: "Student details are updated!",
                result,
            });
        })
        .catch((err) => {
            res.status(400).json({ error: err });
        });
});

// delete specific student detail
router.delete("/deleteStudents/:id", async (req, res) => {
    const id = req.params.id;

    await studentModel
        .findByIdAndDelete(id)
        .then((result) => {
            res.status(200).json({
                message: "Student details are deleted succesfully!",
                result,
            });
        })
        .catch((err) => {
            res.status(400).json({ error: err });
        });
});

module.exports = router;
