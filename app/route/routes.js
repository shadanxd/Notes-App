module.exports = app =>{
    var router = require('express').Router();

    //Auth routes
    router.post('/auth/signup')
    router.post('/auth/login')

    //Notes routes
    router.get('/notes')
    router.get('/notes/:id')

    router.post('/notes/create')
    router.put('/notes/update/:id')

    router.delete('/notes/delete/:id')

    router.get('/notes/:id/share')

    router.get('/notes/search')

};