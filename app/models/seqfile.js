var mongoose = require('mongoose');

var Schema = mongoose.Schema
    ,ObjectId = Schema.ObjectId;

var MSA = new Schema({
    contents    : {type: String, require: true},  
    uploadfn    : String,
    datatype    : Number,
    partitions  : Number,
    sites       : Number,
    rawSites    : Number,
    sequences   : Number,
    genCodeId   : Number,
    goodTree    : Number,
    nj          : String,
    mailaddr    : String,
    timestamp   : { type: String, default: (new Date()).getTime() }
});

MSA.index( { "id": 1 } );

var PartitionInfo = new Schema({
    _creator : { type: Schema.Types.ObjectId, ref: 'MSA' },
    partition   : Number,
    startCodon  : Number,
    endCodon    : Number,
    span        : Number,
    userTree    : String
});

var Sequences = new Schema({
    _creator : { type: Schema.Types.ObjectId, ref: 'MSA' },
    seqIndex : Number,
    name     : String
});

module.exports = mongoose.model('MSA', MSA);
