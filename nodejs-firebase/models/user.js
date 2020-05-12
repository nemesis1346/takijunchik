'use strict';
var Sequelize = require('sequelize');
var bcrypt = require('bcrypt');

var User = sequelize.define('users', {
	name: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: true,
			len: [1,50]
		}
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			isEmail: true,
			notEmpty: true,
			len: [1,255]
		}
	},
	password_digest: {
		type: Sequelize.STRING,
		validate: {
			notEmpty: true
		}
	},
	password: {
		type: Sequelize.VIRTUAL,
		allowNull: false,
		validate: {
			notEmpty: true
		}
	},
	password_confirmation: {
		type: Sequelize.VIRTUAL
	}
}, {
	freezeTableName: true,
	indexes: [{unique: true, fields: ['email']}],
	instanceMethods: {
		authenticate: function(value) {
			if (bcrypt.compareSync(value, this.password_digest))
				return this;
			else
				return false;
		}
	}
});

var hasSecurePassword = function(user, options, callback) {
	if (user.password != user.password_confirmation) {
		throw new Error("Password confirmation doesn't match Password");
	}
	bcrypt.hash(user.get('password'), 10, function(err, hash) {
		if (err) return callback(err);
		user.set('password_digest', hash);
		return callback(null, options);
	});
};

User.beforeCreate(function(user, options, callback) {
  console.log(user)
  console.log('>>>>>OPTIONS>>>>>>>')
  console.log(options)
  console.log('>>>>>CALLBACK>>>>>>>')
  console.log(callback)
	user.email = user.email.toLowerCase();
	if (user.password)
		hasSecurePassword(user, options, callback);
	else
		return callback(null, options);
})
User.beforeUpdate(function(user, options, callback) {
	user.email = user.email.toLowerCase();
	if (user.password)
		hasSecurePassword(user, options, callback);
	else
		return callback(null, options);
})

module.exports = User;