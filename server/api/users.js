const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  const userId = Number(req.params.id);
  if(req.user && req.user.id === userId){
    try {
      const user = await User.findById(userId);
      res.json(user);
    } catch(err){
      next(err); 
    }
  } else {
    res.status(403).send('You have no business here.');
  }
})

// /orders/:userId  //This request doesnt represent the state that we are trying to transfer. 
// /orders --> req.user.getOrders();
// /users/:userId/orders 