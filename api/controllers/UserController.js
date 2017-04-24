/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    list: function (req, res, next) {

        User.find(function foundUsers(error, users) {

            if (error) return next(error);

            res.view({
                users: users
            });
        });
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
    },

    edit: function (req, res, next) {

        User.findOne(req.param('id'), function foundUser(error, user) {

            if (error) return next(error);
            if (!user) return next();

            res.view({
                user: user
            });
        });
    },


    update: function (req, res, next) {

        User.update(req.param('id'), req.params.all(), function userUpdate(error) {

            if (error) {
                return res.redirect('/user/edit/' + req.param('id'));
            }

            res.redirect('/user/show/' + req.param('id'));
        });
    }
};

