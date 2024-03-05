const express = require("express");
let studentModel = require("../models/student_model");

const router = express.Router();

// add new student
router.post("/addStudent", async (req, res) => {
    const { name, age, gender } = req.body;

    const newStudent = new studentModel({
        name,
        age,
        gender,
    });

    await newStudent
        .save()
        .then((result) => {
            res.status(200).json({
                message: "Student details are saved successfully",
                result,
            });
        })
        .catch((err) => {
            res.status(400).json({
                error: err,
            });
        });
});

// get all students details
router.get("/getStudent", async (req, res) => {
    await studentModel
        .find()
        .then((result) => {
            res.status(200).json({
                message: "Student details are here",
                result,
            });
        })
        .catch((err) => {
            res.status(400).json({
                error: err,
            });
        });
});

// update specific student detail
router.put("/updateStudent/:id", async (req, res) => {
    const id = req.params.id;
    const { name, age, gender } = req.body;

    const updateStudent = { name, age, gender };

    await studentModel
        .findByIdAndUpdate(id, updateStudent)
        .then(() => {
            res.status(200).json({
                message: "Student details is updated successfully",
            });
        })
        .catch((err) => {
            res.status(400).json({
                error: err,
            });
        });
});

// delete specific student detail
router.delete("/deleteStudent/:id", async (req, res) => {
    const id = req.params.id;

    await studentModel
        .findByIdAndDelete(id)
        .then(() => {
            res.status(200).json({
                message: "Student detail is deleted successfully",
            });
        })
        .catch((err) => {
            res.status(400).json({
                error: err,
            });
        });
});

module.exports = router;
