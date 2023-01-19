const router = require('express').Router();
const {SignUpUser, SignInUser, MeUser} = require('../controllers/AuthController');
const { protect } = require('../middleware/authMiddleware');

router.post('/signin', SignUpUser);
router.post('/login', SignInUser);
router.get('/me', protect, MeUser);


module.exports = router;