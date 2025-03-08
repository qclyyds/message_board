const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// 创建数据库连接
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'example_db'
});

// 测试数据库连接
db.connect(err => {
    if (err) {
        console.error('数据库连接失败:', err);
    } else {
        console.log('成功连接到数据库');
    }
});

// 获取所有留言
app.get('/messages', (req, res) => {
    db.query('SELECT * FROM messages', (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
});

// 添加新留言
app.post('/messages', (req, res) => {
    const { username, content } = req.body;
    db.query('INSERT INTO messages (username, content) VALUES (?, ?)', [username, content], (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json({ id: results.insertId, username, content });
        }
    });
});

// 启动服务器
app.listen(port, () => {
    console.log(`服务器运行在 http://localhost:${port}`);
});