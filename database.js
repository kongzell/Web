var express = require('express')
var cors = require('cors')
const mysql = require('mysql2');

const connected = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mydb-project'
})

var app = express()
app.use(cors())
app.use(express.json())

app.use('/images', express.static('image'))
app.get('/products', function(req, res,next){
    connected.query(
        'SELECT * FROM `products`',
        function(err, result, fields){
            res.json(result);
        }
    )
})


// ✅ POST รับข้อมูลสมัครสมาชิก
app.post('/register', function(req, res) {
    const { name, surname, date, age, gender, email, password } = req.body

    connected.query(
        `INSERT INTO users (F_name, Lname, Birthday, Age, Gender, Email, Password) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [name, surname, date, age, gender, email, password],
        function(err, result) {
            if (err) return res.json({ message: 'เกิดข้อผิดพลาด', error: err })
            res.json({ message: 'สมัครสมาชิกสำเร็จ!' })
        }
    )
})

app.post('/products', function(req, res) {
    const { Name, Price, Detail } = req.body

    connected.query(
        'INSERT INTO products (Name, Price, Detail) VALUES (?, ?, ?)',
        [Name, Price, Detail],
        function(err, result) {
            if (err) return res.json({ message: 'เกิดข้อผิดพลาด', error: err })
            
            // ✅ ส่ง insertId กลับมาด้วย
            res.json({ 
                message: 'Success!', 
                id: result.insertId  
            })
        }
    )
})

app.listen(8000, function(){
    console.log('CORS-enable web server listening on port 8000')
})