const router = require('express').Router();
const {getGoals, postGoals, deleteGoals, updateGoals} = require('../controllers/GoalController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getGoals);

router.post('/', protect, postGoals);

router.delete('/:id', protect, deleteGoals);

router.put('/:id', protect, updateGoals);

module.exports = router;