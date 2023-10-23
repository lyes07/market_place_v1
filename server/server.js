require('dotenv').config()
const express = require('express')
const db = require("../database/index")
const cors = require('cors')
const session = require('express-session')
const bcrypt = require('bcryptjs')


const server = express()
const port = process.env.PORT || 8080


server.use(express.urlencoded({ extended: true }))
server.use(express.json())
server.use(cors({
    origin: "http://localhost:3000",
    methods: ["POST", "PUT", "GET","DELETE", "OPTIONS", "HEAD"],
    credentials: true,
}))



const store = new (require('connect-pg-simple')(session))()
server.use(
      session({
          store: store,
          secret: process.env.SESSION_SECRET,
          saveUninitialized: false,
          resave: false,
          cookie: {
              secure: false,
              httpOnly: false,
              sameSite: false,
              maxAge: 1000 * 60 * 60 * 24,
          },
      })
  )
  




server.get('/api/',async (req,res)=>{
    try {
        const query = await db.query('SELECT p.id,p.name, p.price, p.image_link as image, u.name as saller FROM products as p , users as u WHERE p.saller_id = u.id;')
        res.status(200).json({
            length : query.rowCount,
            data : {
                products : query.rows
            }
        })  
    
    } catch (error) {
        console.log(error)
    }
})

server.get('/api/:userId',async (req,res)=>{
    try {
        const userId = req.params.userId
        const query = await db.query('SELECT id, name, price, image_link as image FROM products WHERE saller_id = $1;',[userId])
        res.status(200).json({
            length : query.rowCount,
            data : {
                products : query.rows
            }
        })  
    
    } catch (error) {
        console.log(error)
    }
})


server.delete('/api/:id',async(req,res)=>{
    try {
        const deleteProduct = await db.query('DELETE FROM products WHERE id = $1;',[req.params.id])
        res.status(204).json("product is deleted")
    } catch (err) {
        console.error(err.message);
    }
})

server.post('/api/addProduct', async (req, res) => {
    const { name, price, image , saller } = req.body
    try {
        const query = await db.query(
            'INSERT INTO products (name, price, image_link, saller_id) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, price, image, saller]
        )

        if (query.rows.length === 0) {
            res.sendStatus(403)
        }

        res.status(200).json({
            data : {
                products : query.rows
            }
        })

    } catch (err) {
        console.error(err)
        return res.sendStatus(403)
    }
})



server.post('/api/signup', async (req, res) => {
    const { name, email, password } = req.body

    if (
        name == null ||
        email == null ||
        password == null
    ) {
        return res.sendStatus(403)
    }

    try {
        const hashedPassword = bcrypt.hashSync(password, 10)
        const data = await db.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
            [name, email, hashedPassword]
        )

        if (data.rows.length === 0) {
            res.sendStatus(403)
        }
        const user = data.rows[0]

        req.session.user = {
            id: user.id,
            name: user.name,
            email: user.email,
        }

        res.status(200).json({
            user: req.session.user 
        })

    } catch (err) {
        console.error(err)
        res.sendStatus(403)
    }
})


server.post('/api/login', async (req, res) => {
    const { email, password } = req.body

    if (email == null || password == null) {
        return res.sendStatus(403)
    }

    try {
        const data = await db.query(
            'SELECT id, name, email, password FROM users WHERE email = $1',
            [email]
        )

        if (data.rows.length === 0) {
            return res.sendStatus(403)
        }
        const user = data.rows[0]

        const matches = bcrypt.compareSync(password, user.password)
        if (!matches) {
            return res.sendStatus(403)
        }

        req.session.user = {
            id: user.id,
            name: user.name,
            email: user.email,
        }

        console.log(req.session.user);

        res.status(200).json({ 
            user: req.session.user 
        })

    } catch (err) {
        console.error(err)
        res.sendStatus(403)
    }
})

server.post('/api/logout', async (req, res) => {
    try {
        await req.session.destroy()
        res.clearCookie('connect.sid', {path: '/'})
        return res.sendStatus(200)
    } catch (err) {
        console.error(err)
        return res.sendStatus(500)
    }
})


server.put('/api/:id', async(req,res)=>{
    try {
        const {name, price, image} = req.body
        const response = await db.query('UPDATE products SET name = $1, price = $2, image_link = $3 WHERE id = $4 RETURNING *;',[name, price, image, req.params.id])
        res.status(204).json(response.rows)
    } catch (err) {
        console.error(err.message);
    }
})


server.post(`/api/account/:id`,async(req,res)=>{
    try {
        console.log('0');
        await db.query('delete from products where saller_id=$1',[req.params.id])
        console.log('1');
        await db.query('delete from users where id=$1',[req.params.id])
        console.log('2');
        await req.session.destroy()
        console.log('3');
        res.clearCookie('connect.sid', {path: '/'})
        console.log('4');
        return res.sendStatus(200)
    } catch (err) {
        console.error(err)
        return res.sendStatus(500)
    }
})




server.post('/api/fetch-user', async (req, res) => {
    if (req.sessionID && req.session.user) {
        res.status(200)
        return res.json({ 
            user: req.session.user 
        })
    }
    return res.sendStatus(403)
})


server.listen(port,()=>{
    console.log('server is up on port '+port)
})

