'use strict';

const db = require('../../mysqldb/db');

module.exports = db.defineModel('article',{
  title: db.STRING(100),
  content: db.STRING(5000),
  classifys: {
    type: db.STRING(1000),
    allowNull:true
  }
});

