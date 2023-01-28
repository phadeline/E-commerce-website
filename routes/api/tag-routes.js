const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  // find all tags
  try {
    const tagdata = await Tag.findAll({
      // be sure to include its associated Product data
      include: [{ model: Product }],
    });
    res.status(200).json(tagdata);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  try {
    const tagdata = await Tag.findByPk(req.params.id, {
      // be sure to include its associated Product data

      include: [{ model: Product }],
    });
    if (!tagdata) {
      res.status(404).json({ message: "No Tag found with that id!" });
      return;
    }
    res.status(200).json(tagdata);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  // create a new tag
  try {
    if (!req.body.tag_name) {
      res.status(404).json({ message: "Please provide a tag name" });
      return;
    }
    const tagdata = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.status(200).json(tagdata);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagdata = await Tag.update(req.body, {
      where: { id: req.params.id },
    });
    if (!tagdata) {
      res.status(404).json({ message: "No Tag found with that id!" });
    }
    res.status(200).json(tagdata);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagdata = await Tag.destroy({
      where: { id: req.params.id },
    });
    if (!tagdata) {
      res.status(404).json({ message: "no tag found with this id!" });
    }
    res.status(200).json(tagdata);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
