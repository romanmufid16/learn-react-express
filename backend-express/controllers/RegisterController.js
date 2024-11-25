const express = require('express');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const prisma = require('../prisma/client');

const register = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: "Validation error",
      errors: errors.array()
    });
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  req.body.password = hashedPassword;
  
  try {
    const user = await prisma.user.create({
      data: req.body
    });
    res.status(201).send({
      success: true,
      message: "Register successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
}

module.exports = { register };