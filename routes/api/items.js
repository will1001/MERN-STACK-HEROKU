const express = require('express');

const router = express.Router();

//Item Model

const Item = require('../../models/item');

// @route GET api/items
// @desc Get All Items
// @acces Public

router.get('/',(req, res) => {
	Item.find()
		.sort({date: -1})
		.then(items => res.json(items))
});


// @route POST api/items
// @desc Create A Post
// @acces Public

router.post('/',(req, res) => {
	const newItem = new Item({
		name: req.body.name
	});

	newItem.save().then(item => res.json(item));
});


// @route Delete api/items
// @desc Delete A Post
// @acces Public

router.delete('/:id',(req, res) => {
	Item.findById(req.params.id)
		.then(item => item.remove().then(() => res.json({succes: true}))
	)
	.catch(err => res.status(404).json({succes: false}));
});


module.exports = router;