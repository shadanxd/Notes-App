module.exports = app =>{
    var router = require('express').Router();
    const authenticator = require('../middleware/authenticator')
    const controller = require('../controllers/controller')

    //Auth routes
    router.post('/auth/signup', authenticator.register, controller.signup)
    router.post('/auth/login', authenticator.login)

    //Notes routes
    router.get('/notes', authenticator.authenticate, controller.findAll)
    router.get('/notes/:id', authenticator.authenticate, controller.findOne)

    router.post('/notes/create', authenticator.authenticate, controller.addNewNote)
    router.put('/notes/update/:id', authenticator.authenticate)

    router.delete('/notes/delete/:id', authenticator.authenticate, controller.deleteNote)

    router.get('/notes/:id/share', authenticator.authenticate)

    router.get('/notes/search', authenticator.authenticate)

    app.use('/', router)
};