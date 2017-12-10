'use strict';

const db = require('../../mysqldb/db');

module.exports = db.defineModel('users',{
  email:{
    type: db.STRING(100),
    allowNull:true,
    unique:true
  },
  password: db.STRING(100),
  name: db.STRING(100),
  gender: {
    type: db.BOOLEAN,
    allowNull:true
  },
  birth:{
    type: db.STRING(100),
    allowNull:true
  }
});

