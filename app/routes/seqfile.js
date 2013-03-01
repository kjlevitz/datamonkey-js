var dpl = require('../../lib/datamonkey-pl.js');

var mongoose = require('mongoose')
  , SequenceAlignmentFile = mongoose.model('SequenceAlignmentFile');

//find sequence by id
exports.findById = function(req, res) {

  var id = req.params.id;
  console.log('Retrieving sequence: ' + id);

  SequenceAlignmentFile.findOne({_id : id}, function(err, items) {
    if (err)
      res.send('There is no sequence with id of ' + id);
    else
      res.send(items);
  });

};

//return all sequences
exports.findAll = function(req, res) {

 SequenceAlignmentFile.find({},function(err, items) {
   if (err)
     res.send('There is no sequence with id of ' + id);
    else
     res.send(items);
   });
};

//upload a sequence
exports.uploadMsa = function(req, res) {

  postdata = req.query;
  postdata.contents = postdata.contents.join('');

  //response = dm.post(method,contents=fh, datatype=datatype, genCodeId=genCodeId, mail=mail)

  //TODO: Clean postdata
  var sequence_alignment = new SequenceAlignmentFile({
    contents    : postdata.contents,  
    datatype    : postdata.datatype,
    genCodeId   : postdata.genCodeId,
    mailaddr    : postdata.mailaddr,
  });

  sequence_alignment.save(function (err,result) {
    if (err) {
      res.send({'error':err});
    } 
    else {
      //Upload to datamonkey
      dpl.uploadToPerl(result,res);
    }
  });
}

//update a sequence
exports.updateMsa = function(req, res) {

  var id = req.params.id;
  var postdata = req.body;

  console.log('Updating sequence: ' + id);
  console.log(JSON.stringify(sequence));

  //Should check the postdata before
  SequenceAlignmentFile.update(postdata, function (err, result) {
    if (err) {
      res.send({'error':'An error has occurred'});
    } 
    else {
      //TODO: Only should log when debugging
      //console.log('Success: ' + JSON.stringify(result));
      res.send(postdata);
    }
  });
}

//delete a sequence
exports.deleteMsa = function(req, res) {

  var id = req.params.id;
  console.log('Deleting sequence: ' + id);

  SequenceAlignmentFile.remove({ _id: new BSON.ObjectID(id) }, function(err) {
    if (err) {
      res.send({'error':'An error has occurred - ' + err});
    }

    else {
      console.log('' + result + ' document(s) deleted');
      res.send(req.body);
     }

  });
  
}

