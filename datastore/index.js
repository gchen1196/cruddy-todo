const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////

exports.create = (text, callback) => {
  counter.getNextUniqueId((err, id) =>{
  
    fs.writeFile(`${exports.dataDir}/${id}.txt`, text, (err) => {
      if (err) { 
        throw err; 
      } else {
        callback(null, {id, text});
      }
    });
  });
};
      
//iterates through items array 
exports.readAll = (callback) => {
  fs.readdir(`${exports.dataDir}`, (err, files) => {
    if(err) {
      console.log(`No Files found in ${exports.dataDir}`);
    } else {
      callback(null, files);
    }
  })
  // callback(null, data);
};

exports.readOne = (id, callback) => {
  fs.readFile(`${exports.dataDir}/${id}.txt`, 'utf8', (err,data) => {
    if(err) {
      callback('file not found');
    } else {
      callback(null, {id: id, text: data});
    }
  });
};

//id = '00001'
//text = 'string'
//callback
exports.update = (id, text, callback) => {
  fs.readFile(`${exports.dataDir}/${id}.txt`, 'utf8', (err, data) => {
    if (err) {
      callback(err);
    } else {
      fs.writeFile(`${exports.dataDir}/${id}.txt`, text, (err) => {
        if (err) {
          callback(err);
        }else {
          callback(null, text)
        }
      })
    }
  })
};
      

exports.delete = (id, callback) => {
 fs.unlink(`${exports.dataDir}/${id}.txt`, (err) => {
   if(err) {
     callback(err);
   } else {
     callback()
   }
 })
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
