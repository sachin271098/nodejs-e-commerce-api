const Order = require("../Models/Order");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE

router.post("/createOrder", verifyToken, async (req, res) => {
  const newOrder = new Order(req.body);

  try {
    const saveOrder = await newOrder.save();
    res.status(200).json(saveOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/updateOrder/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE ORDER
router.delete("/deleteOrder/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER ORDERS
router.get("/findOrder/:userId",verifyTokenAndAuthorization, async (req, res) => {
  try {
    const order = await Order.find({userId: req.params.userId});
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL ORDER

router.get('/Orders', verifyTokenAndAdmin, async (req, res)=>
{
  try {
    const Orders = await Order.find();
    res.status(200).send(Orders);
  }
   catch (err) {
    res.status(500).send(err);
  }
})

module.exports = router;
