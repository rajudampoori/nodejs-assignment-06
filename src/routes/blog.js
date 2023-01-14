const express = require("express");
const router = express.Router()
const Blog = require("../models/Blog");
const bodyparser = require("body-parser")

router.use(bodyparser())

router.get("/blog", async (req, res) => {
    try {
        let limitsize = 0;
        if (req.query.page) {
            limitsize = Number(req.query.page) * 5
        }
        console.log(req.query)
        const data = await Blog.find({
            topic: req.query.search
        }).limit(limitsize)
        res.json({
            status: "Success",
            result: data
        })
    } catch (e) {
        res.json({
            status: "failed",
            message: e.message
        })
    }
})

router.post("/blog", async (req, res) => {
    try {
        const data = await Blog.create(req.body);
        res.json({
            status: "success",
            result: data
        })
    } catch (e) {
        res.json({
            status: "failed",
            message: e.message
        })
    }
})

router.put("/blog/:id", async (req, res) => {
    try {
       const data2= await Blog.findByIdAndUpdate({ _id: req.params.id }, req.body)
        const data = await Blog.findOne({
            _id: req.query.id
        })
        console.log(data2)
        res.json({
            status: "success",
            result: data2
        })
    } catch (e) {
        res.json({
            status: "failed",
            message: e.message
        })
    }
})


router.delete("/blog/:id", async (req, res) => {
    try {
        const data = await Blog.deleteOne({ _id: req.params.id })
        res.json({
            status: "success",
            result: data
        })

    } catch (e) {
        res.json({
            status: "failed",
            message: e.message
        })
    }
})


module.exports = router;
