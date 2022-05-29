const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const pool = require('./pool');
const res = require('express/lib/response');


// ============================
//  POSTGRESQL USED AS THE RDBMS
// =============================



app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())

// READ

app.get('/',(req,res)=>{
    pool.query(`SELECT * FROM blog`, [] , (err, result) =>{
        if(err) throw err
        res.json(result.rows)
    })
})

// CREATE

app.post('/blogsCreate', (req,res) =>{
    let id = Math.floor(Math.random()*100)
    let author = req.body.author;
    let title = req.body.title;
    let body  = req.body.body;
    pool.query(`INSERT INTO blog values ($1, $2, $3, $4)`,[id, author, title, body], (err,result) =>{
        if(err) throw err
        res.json(result)
    } )
})

// UPDATE

app.put('/blogEdit/:id', (req,res) =>{
    let id = req.params.id
    let author = req.body.author
    let title = req.body.title
    let body = req.body.body
    pool.query(`UPDATE blog SET author=$1, title=$2, body=$3 WHERE userid=$4`,[author, title, body, id], (err, editBlog) =>{
        if(err) throw err
        res.json(editBlog)
    })
})


// DELETE

app.delete('/deleteBlog/:id', (req,res) =>{
    let id = req.params.id
    pool.query(`DELETE FROM blog WHERE userid=$1`,[id], (err, deleteBlog) =>{
        if(err) throw err
        res.send('Blog Deleted')
    })
})



 
app.listen(3000, () =>{
    console.log('started');
})

