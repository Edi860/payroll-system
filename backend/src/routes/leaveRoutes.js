const express = require('express');
const router = express.Router();

const {
  getAllLeaves,
  getLeaveById,
  createLeave,
  updateLeave,
  deleteLeave,
} = require('../controllers/leaveController');

router.get('/', getAllLeaves);
router.post('/', createLeave);
router.get('/:id', getLeaveById);
router.put('/:id', updateLeave);
router.delete('/:id', deleteLeave);

module.exports = router;
