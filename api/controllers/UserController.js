/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    list: function (req, res) {

        User.find().exec(function (error, users) {

            if (error) return res.send(error, 500);

            res.json(users);

        });
    },

    'list': function (req, res) {
        res.view();
    },

    'new': function (req, res) {
        res.view();
    },

    create: function (req, res, next) {

        User.create(req.params.all(), function userCreated(error, user) {

            if (error) {
                // console.log(error);
                req.session.flash = {
                    error: error
                }

                return res.redirect('/user/new');
            }


            res.redirect('/user/show/' + user.id);

        });
    },

    show: function (req, res, next) {

        User.findOne(req.param('id'), function foundUser(error, user) {

            if (error) return next(error);
            if (!user) return next();

            res.view({
                user: user
            });
        });
    }
};

