
var crypto = require('crypto');
var user = require('../models/user');





exports.post = function(req, res){
	var _id = "nodegame" , _return = {}; //给_id一个初始值，否则会出现undefined
	//the data of form (json)
	var data = req.body;
  for (var i = 0; i < 10; i++) {
    _id += Math.ceil(Math.random()*9); //NaN格式不能for循环
  }
  _id = _id + new Date().getTime(); 
  //生成口令的散列值

  var md5 = crypto.createHash('md5');
  var password = md5.update(data.password).digest('base64');
  var newuser = new user.User({
    name: data.username,
    email: data.email,
    password: password,
    systemid: _id, //名字要跟user.js里面的对象属性对应
    friendList: [],
    winRate:"0%",
    level:1,
    scroe:0,
    totalTimes:0,
    winTimes:0,
    failTimes:0,
  });
  
	//next is doing with the database of MongoDB
  //新增用戶 
  user.User.get(newuser.name, function(err, user) {
    newuser.save(function(err) {
      if (err) {
        
      }
      _callback("Succeed！！");
    });
  });

	//the callback function of database if return something
	function _callback (_data) {
		//do something of the return "_data"
		res.json({
			data : _data
		});
	}
} ;

exports.check = function(req, res){
	var _return = {},checkMark;
	//the data of form (json)
	var data = req.body;
  // for (var a in data) {
  //   console.log(data.a);
  // };
  
  var newuser = new user.Friend({
    name: data.username,
  });
	//next is doing with the database of MongoDB
	//......
	//......
  //檢查用戶名是否已經存在
  user.User.get(newuser.name, function(err, user) {
    if (user){
      checkMark = 0;
    }else if(newuser.name==null){
      checkMark = 2;    
    }else{
      checkMark = 1;
    }
      _callback(checkMark);
  });

	//the callback function of database if return something
	function _callback (_data) {
		//do something of the return "_data"
		res.json({
      data : _data
		});
	}
};

