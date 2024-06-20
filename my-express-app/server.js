import express, { json } from 'express';
import fs from 'fs';
import path from 'path';
import bodyParser from 'body-parser';
const app = express();

// Middleware для обработки заголовка Expect: 100-continue
app.use('/post-endpoint100and201', (req, res, next) => {
    if (req.headers['expect'] === '100-continue') {
        res.writeContinue();
    }
    next();
});

// Middleware для обработки заголовка Upgrade: 101-continue
app.use('/get-endpoint101', (req, res, next) => {
    if (req.headers['upgrade'] && req.headers['upgrade'].toLowerCase() === 'websocket') {
        res.status(101).end();
    } else {
        next();
    }
});


// Middleware для обработки post запросов
app.use(json());

app.post('/post-endpoint100and201', (req, res) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', () => {
        console.log('Received data:', body);
        res.status(201).send('Request processed');
    });
});

app.get('/get-endpoint101', (req, res) => {
    res.status(201).send('Request processed');
});

app.post('/post-endpoint102', (req, res) => {
    // Возвращаем код ответа 102
    res.status(102).end();
});

// Обработчик GET запроса, возвращающий промежуточный ответ 103
app.get('/get-endpoint103', (req, res) => {
    // Отправляем промежуточный ответ 103
    res.status(103).send('Early Hints');
});


app.post('/post-endpoint202', (req, res) => {
    // Логика обработки запроса, которая может занять значительное время

    // Отправка ответа 202 (Accepted)
    res.status(202).send({
        message: 'Request accepted for processing',
        status: 202
    });

    // Пример асинхронной обработки запроса
    setTimeout(() => {
        console.log('Processing complete:', req.body);
    }, 5000); // Имитация длительной обработки (5 секунд)
});


app.get('/get-endpoint203', (req, res) => {
    // Получаем данные (например, из базы данных или другого API)
    const originalData = {
        data: "This is the original data",
        source: "original"
    };

    // Изменяем данные перед отправкой клиенту
    const modifiedData = {
        data: originalData.data,
        source: "modified"
    };

    // Отправляем ответ с кодом 203 (Non-Authoritative Information)
    res.status(203).send(modifiedData);
});

// Обработчик DELETE запроса, возвращающий код 204
app.delete('/delete-endpoint204/:id', (req, res) => {
    const { id } = req.params;

    // Логика для удаления ресурса с указанным id
    console.log(`Resource with id ${id} has been deleted`);

    // Отправка ответа с кодом 204 (No Content)
    res.status(204).send();
});

// Обработчик POST запроса, возвращающий код 205
app.post('/post-endpoint205', (req, res) => {
    const data = req.body;

    // Логика для обработки данных
    console.log('Data received:', data);

    // Отправка ответа с кодом 205 (Reset Content)
    res.status(205).send();
});


// Обработчик GET запроса, возращающий код 206, 416 и 500
app.get('/video', (req, res) => {
    const videoPath = 'sample.mp4';
    const stat = fs.statSync(videoPath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

        if (start >= fileSize) {
            res.status(416).send('Requested range not satisfiable\n' + start + ' >= ' + fileSize);
            return;
        }

        const chunksize = (end - start) + 1;
        const file = fs.createReadStream(videoPath, { start, end });
        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4',
        };

        res.writeHead(206, head);
        file.pipe(res);
    } else {
        const head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
        };
        res.writeHead(200, head);
        fs.createReadStream(videoPath).pipe(res);
    }
});

// Обработчик GET запроса, возращающий код 300
app.get('/multiple-choices', (req, res) => {
    // Возможные варианты ответов
    const choices = {
        message: 'Multiple choices available',
        options: [
            { url: 'http://localhost:3000/option1', description: 'Option 1' },
            { url: 'http://localhost:3000/option2', description: 'Option 2' },
            { url: 'http://localhost:3000/option3', description: 'Option 3' },
        ]
    };

    // Отправка ответа с кодом 300 (Multiple Choices)
    res.status(300).json(choices);
});

app.get('/option1', (req, res) => {
    res.send('This is option 1');
});

app.get('/option2', (req, res) => {
    res.send('This is option 2');
});

app.get('/option3', (req, res) => {
    res.send('This is option 3');
});



// Обработчик GET запроса, возращающий код 301
// Обработчик для старого URL
app.post('/old-url', (req, res) => {
    // Перенаправление на новый URL с кодом 301 (Moved Permanently)
    res.redirect(301, '/new-url');
});

// Обработчик для нового URL
app.get('/new-url', (req, res) => {
    res.send('This is the new URL');
});

// Обработчик GET запроса, возращающий код 302
// Обработчик для старого URL
app.post('/old-url2', (req, res) => {
    // Перенаправление на новый URL с кодом 302 (Found)
    res.redirect(302, '/new-url');
});

// Обработчик для нового URL
app.get('/new-url2', (req, res) => {
    res.send('This is the new URL');
});


// Обработчик GET запроса, возращающий код 307
// Обработчик для старого URL
app.get('/old-url3', (req, res) => {
    // Перенаправление на новый URL с кодом 307 (Temporary Redirect)
    res.redirect(307, '/new-url');
});

// Обработчик для нового URL
app.get('/new-url3', (req, res) => {
    res.send('This is the new URL');
});


// Обработчик GET запроса, возращающий код 307
// Обработчик для старого URL
app.get('/old-url4', (req, res) => {
    // Перенаправление на новый URL с кодом 308 (Permanent Redirect)
    res.redirect(308, '/new-url');
});

// Обработчик для нового URL
app.get('/new-url4', (req, res) => {
    res.send('This is the new URL');
});




// Обработчик GET запроса, возращающий код 303
// Обработчик для POST запроса
app.post('/submit', (req, res) => {
    // После успешной обработки POST запроса, выполнить перенаправление
    res.redirect(303, '/success');
});

// Обработчик для GET запроса к /success
app.get('/success', (req, res) => {
    res.send('Success! Your request has been processed.');
});


// Обработчик GET запроса, возращающий код 304
app.get('/resource', (req, res) => {
    // Заголовок If-Modified-Since: проверка на изменения с момента последнего обновления
    const lastModified = new Date('2024-01-01');
    res.set('Last-Modified', lastModified.toUTCString());

    // Заголовок ETag (Entity Tag): уникальный идентификатор ресурса
    const etag = '123456789';
    res.set('ETag', etag);

    // Проверка условий, в зависимости от которых возвращается 304
    if (req.header('If-Modified-Since') === lastModified.toUTCString() || req.header('If-None-Match') === etag) {
        res.status(304).send();
    } else {
        // Возвращение ресурса или его обновленной версии
        res.send('This is the resource content');
    }
});




// Обработчик GET запроса, возращающий код 403
app.get('/restricted', (req, res) => {
    // Пример проверки разрешений или доступа
    const user = {
        role: 'guest', // Предположим, что у пользователя нет прав доступа
    };

    if (user.role !== 'admin') {
        // Возвращаем статус 403 (Forbidden) и сообщение об ошибке
        res.status(403).send('Access forbidden. You do not have permission to access this resource.');
    } else {
        // Возвращаем ресурс или его содержимое, если есть разрешения
        res.send('Welcome! You have access to the restricted resource.');
    }
});


// Обработчик GET запроса, возращающий код 406
app.get('/get-endpoint406', (req, res) => {
    // Предположим, что клиент запрашивает только JSON данные
    const acceptHeader = req.headers.accept;
    
    // Проверяем заголовок Accept клиента
    if (!acceptHeader || acceptHeader !== 'application/json') {
        // Возвращаем статус 406 (Not Acceptable) и сообщение об ошибке
        res.status(406).send('Not Acceptable. This endpoint only supports application/json format.');
    } else {
        // Возвращаем JSON данные
        res.json({ message: 'This is the resource in JSON format' });
    }
});


// Обработчик для GET запроса к /timeout, возращающий код 408
app.get('/timeout', (req, res) => {
    // Установка задержки в 10 секунд для симуляции истечения времени ожидания
    setTimeout(() => {
        // Возвращаем статус 408 (Request Timeout) и сообщение об ошибке
        res.status(408).send('Request Timeout. Server did not receive a timely response.');
    }, 10000); // Задержка в 10 секунд (10000 миллисекунд)
});


// Обработчик для GET запроса, возращающий код 410
app.get('/deleted-resource', (req, res) => {
    // Возвращаем статус 410 (Gone) и сообщение об ошибке
    res.status(410).send('Gone. The requested resource is no longer available.');
});


// Обработчик для GET запроса, возращающий код 411
app.post('/post-data', (req, res) => {
    // Проверяем наличие заголовка Content-Length в запросе
    if (!req.get('Content-Length')) {
        // Возвращаем статус 411 (Length Required) и сообщение об ошибке
        res.status(411).send('Length Required. Content-Length header is required.');
    } else {
        // Выводим тело запроса
        console.log(req.body);
        res.send('Data received successfully.');
    }
});


// Для примера, будем использовать простую переменную для хранения данных
let resourceVersion = 1;
// Обработчик для PUT запроса к /update-resource
app.put('/update-resource', (req, res) => {
    // Проверяем условие предусловия (пример: версия ресурса)
    const clientVersion = parseInt(req.headers['if-match']);
    
    if (!clientVersion || clientVersion !== resourceVersion) {
        // Возвращаем статус 412 (Precondition Failed) и сообщение об ошибке
        res.status(412).send('Precondition Failed. Resource version does not match.');
    } else {
        // Увеличиваем версию ресурса и возвращаем успешный ответ
        resourceVersion++;
        res.send('Resource updated successfully.');
    }
});



// Используем middleware для ограничения размера тела запроса до 1MB
app.use('/upload-data', bodyParser.json({ limit: '1kb' }));

// Обработчик для POST запроса к /upload-data
app.post('/upload-data', (req, res) => {
    // Выводим тело запроса (в данном случае, сервер принимает любые данные)
    console.log(req.body);
    res.send('Data uploaded successfully.');
});

app.get('/resp505', (req, res) => {
    res.status(200).send('All OK');
});

app.get('/resp505', (req, res) => {
    res.status(200).send('All OK');
});

app.all('/resp505', (req, res) => {
    // Возвращаем статус 501 (Not Implemented) и сообщение об ошибке
    res.status(501).send('Not Implemented. The server does not support the requested method.');
});


// Обработчик для GET запроса к /timeout, возращающий код 410
app.get('/deleted-resource', (req, res) => {
    // Возвращаем статус 410 (Gone) и сообщение об ошибке
    res.status(410).send('Gone. The requested resource is no longer available.');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
