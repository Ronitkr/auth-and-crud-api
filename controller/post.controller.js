const router = require('express').Router();
const verify = require('../config/verifyToken');

router.get('/', verify, (req,res)=>{
    res.json({
        post:{
            title: 'first name',
            description: 'first loogin app'
        }
    })
})


module.exports = router;