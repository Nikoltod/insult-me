var express = require('express');
const mongoose = require('mongoose');
const Insult = mongoose.model('Insult');
var router = express.Router();


//API - for stored insults.
router.route('/post')
  .get(function(req, res) {
      Insult.find(function(err, insult) {
          if(err)
            return res.send(500, err);
        
        return res.status(200).json(insult);
      })
  })
  .post(function(req, res) {
    const insult = new Insult();
    insult.text = req.body.text;
    insult.save(function(err, insult) {
      if(err)
        return res.status(500).send(err);
      
      return res.status(200);
    });
  });

module.exports = router;