# HTTP 

## Информационные ответы

### 100 Continue
### Промежуточный ответ, он указывает, что клиент должен продолжить запрос или игнорировать этот ответ, если запрос уже завершен.
### Продемонстрирован при помощи собтсвенного сервер
![Alt-текст](https://github.com/VPG1/JS-Practice-HTTP/blob/main/images/postman100.png)
![Alt-текст](https://github.com/VPG1/JS-Practice-HTTP/blob/main/images/wireshark100.png)



### 101 Switching Protocols
### Этот код отправляется в ответ на заголовок запроса Upgrade от клиента и указывает протокол, на который переключается сервер.
### Продемонстрирован при помощи собтсвенного сервер
![Alt-текст](https://github.com/VPG1/JS-Practice-HTTP/blob/main/images/postman101.png)

### 102 Processing
### Сервер получил и обрабатывает запрос, но ответа пока нет.
### HTTP статус-код 102 предполагает, что клиент не ожидает тела ответа. Вместо этого, он используется для уведомления клиента о том, что сервер продолжает обработку запроса. В Postman не будет видно содержимого тела ответа, но запрос будет выполнен.
![Alt-текст](https://github.com/VPG1/JS-Practice-HTTP/blob/main/images/wireshark102.png)

### 103 Early Hints
### Этот код в первую очередь предназначен для использования с заголовком Link, позволяя пользовательскому агенту начать предварительную загрузку ресурсов или осуществить предварительное соединение к источнику ресурсов, пока сервер готовит ответ.
### HTTP статус-код 103 предполагает, что клиент не ожидает тела ответа. Вместо этого, он используется для уведомления клиента о том, что сервер продолжает обработку запроса. В Postman не будет видно содержимого тела ответа, но запрос будет выполнен.
![Alt-текст](https://github.com/VPG1/JS-Practice-HTTP/blob/main/images/wireshark103.png)


## Успешные ответы
### 200 Ok
### Запрос успешно выполнен.
### Продемонстрован при помощи GET запроса к Weather Api
![Alt-текст](https://github.com/VPG1/JS-Practice-HTTP/blob/main/images/wireshark200.png)

### 201 Created
### Запрос выполнен успешно, и в результате был создан новый ресурс. Обычно это ответ, отправляемый на запросы POST или PUT.
### Продемонстрирован при помощи собтсвенного сервер.

### 202 Accepted
### Запрос получен, но еще не обработан. Это «уклончивый» ответ, поскольку в HTTP нет возможности позже отправить асинхронный ответ с результатом обработки запроса. Этот код предназначен для случаев, когда запрос обрабатывается другим процессом или сервером, а также для пакетной обработки.
### Продемонстрирован при помощи собтсвенного сервер. Через пять секунд будет выведено сообщения о конце обработки данных.
![Alt-текст](https://github.com/VPG1/JS-Practice-HTTP/blob/main/images/postman202.png)

### 203 Non-Authoritative Information
### Возвращенные метаданные не полностью совпадают с теми, которые доступны на исходном сервере, а получены из другого источника. Чаще всего это используется для зеркал или резервных копий ресурсов. За исключением таких случаев предпочтительнее использовать ответ 200 OK.
### Продемонстрирован при помощи собтсвенного сервер.
![Alt-текст](https://github.com/VPG1/JS-Practice-HTTP/blob/main/images/postman203.png)

### 204 No Content
### Для этого запроса нет содержимого для отправки, но заголовки ответа могут быть полезны. Пользовательский агент может использовать их для обновления закешированных заголовков, полученных ранее для этого ресурса.
### Продемонстрирован при помощи собтсвенного сервер.
![Alt-текст](https://github.com/VPG1/JS-Practice-HTTP/blob/main/images/postman204.png)

### 205 Reset Content
### Сообщает пользовательскому агенту, что необходимо сбросить отображение документа, который отправил этот запрос.
### Продемонстрирован при помощи собтсвенного сервер. В ответ на информацию в json. Возращает пустое тело.
![Alt-текст](https://github.com/VPG1/JS-Practice-HTTP/blob/main/images/postman205.png)


### 206 Partial Content
### Этот код ответа используется, когда от клиента отправляется заголовок Range для запроса только части ресурса.
### Продемонстрирован при помощи собтсвенного сервер. Передает часть видео в ответ.
![Alt-текст](https://github.com/VPG1/JS-Practice-HTTP/blob/main/images/postman206.png)


## Сообщения о перенаправлении
### 300 Multiple Choices
### У запроса более одного возможного ответа. Пользовательский агент или пользователь должен выбрать один из них. Не существует стандартизированного способа выбора одного из ответов, но рекомендуется использовать HTML-ссылки на возможные варианты, чтобы у пользователя была возможность выбора.
### Продемонстрирован при помощи собтсвенного сервер. В ответе содержится json с ссылками на другие эндпоинты.

### 301 Moved Permanently
### URL-адрес запрошенного ресурса был изменен навсегда. Новый URL-адрес указан в ответе.
### Продемонстрирован при помощи собтсвенного сервер. Перенапрвляет с old эндпоинта на new эндпоинт

### 302 Found
### URI запрошенного ресурса был временно изменен. В будущем могут быть внесены дальнейшие изменения в URI. Следовательно, этот же URI должен использоваться клиентом в будущих запросах.
### Продемонстрирован при помощи собтсвенного сервер. Перенапрвляет с old эндпоинта на new эндпоинт


### 303 See Other
### Клиенту необходимо получить запрошенный ресурс по другому URI с помощью запроса GET.
### Продемонстрирован при помощи собтсвенного сервер. При POST запросе перенаправляет на другой эндпоинт с GET запросом

### 304 Not Modified
### Этот код используется для целей кэширования. Он сообщает клиенту, что ответ не был изменен, поэтому клиент может продолжать использовать кэшированную версию ответа.
### Продемонстрирован при помощи собтсвенного сервер. В случае если Etag совпадает отпавляем 304 иначе 200.


### 307 Temporary Redirect
### Клиенту необходимо получить запрошенный ресурс по другому URI тем же методом, который использовался в предыдущем запросе. Он имеет ту же семантику, что и код ответа 302 Found, за исключением того, что пользовательский агент не должен изменять используемый метод: если в первом запросе использовался POST, то POST должен использоваться и во втором запросе.
### Продемонстрирован при помощи собтсвенного сервер. Перенапрвляет с old эндпоинта на new эндпоинт


### 308 Permanent Redirect
### Ресурс теперь находится по другому URI, указанному в заголовке ответа Location. Он имеет ту же семантику, что и код ответа 301 Moved Permanently, за исключением того, что пользовательский агент не должен изменять используемый метод: если в первом запросе использовался POST, то POST должен использоваться и во втором запросе.
### Продемонстрирован при помощи собтсвенного сервер. Перенапрвляет с old эндпоинта на new эндпоинт


## Ошибки клиента (400 – 499)
### 400 Bad Request
### Продемонстрован при помощи GET запроса к Weather Api
### https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10000&appid=ce15bbbdbb3e29755de95d36bd2595e4

### 401 Unauthorized
### Продемонстрован при помощи GET запроса к Weather Api
### https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10&appid=ce15bbbdbb3e29755de95d36bd2595e

### 403 Forbidden
### Продемонстрирован при помощи собтсвенного сервер. 

### 404 Not Found
### Продемонстрован при помощи GET запроса к Weather Api
### https://api.openweathermap.org/data/2.5/weather?q=Londn&appid=ce15bbbdbb3e29755de95d36bd2595e4

### 405 Method Not Allowed
### Продемонстрован при помощи PUT запроса к Weather Api
### https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=100&appid=ce15bbbdbb3e29755de95d36bd2595e4

### 406 Not Acceptable
### Продемонстрирован при помощи собтсвенного сервер. Проверяет загаловок accept.


### 408 Request Timeout
### Продемонстрирован при помощи собтсвенного сервер. Через 10 секунд возращает код 408.

### 410 Gone
### Продемонстрирован при помощи собтсвенного сервер.

### 411 Length Required
### Продемонстрирован при помощи собтсвенного сервер. Если поля заголовка Content-length нет, то 411, иначе 200.

### 412 Precondition Failed
### Продемонстрирован при помощи собтсвенного сервер. В зависимости от поля заголовка If-match.

### 413 Payload Too Large
### Продемонстрирован при помощи собтсвенного сервер. Если размер тела превышает 1 мб, то сервер отправляет 413.

### 416 Range Not Satisfiable
### Продемонстрирован при помощи собтсвенного сервер. Если некорректный поля заголовка range

### Ошибки сервера (500 – 599)
### 500 Internal Server Error
### Продемонстрирован при помощи собтсвенного сервер. Если видео нет на сервере код ответа 500.

### 501 Not Implemented
### Продемонстрирован при помощи собтсвенного сервер. Если запрос не GET или HEAD, то возращает 501.
