module.exports = app =>{
    var router = require('express').Router();
    const authenticator = require('../middleware/authenticator')

    //Auth routes
    router.post('/auth/signup', authenticator.register)
    router.post('/auth/login', authenticator.login)

    //Notes routes
    router.get('/notes', authenticator.authenticate)
    router.get('/notes/:id', authenticator.authenticate)

    router.post('/notes/create', authenticator.authenticate)
    router.put('/notes/update/:id', authenticator.authenticate)

    router.delete('/notes/delete/:id', authenticator.authenticate)

    router.get('/notes/:id/share', authenticator.authenticate)

    router.get('/notes/search', authenticator.authenticate)

};