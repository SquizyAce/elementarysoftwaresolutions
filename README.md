# elementarysoftwaresolutions


### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Установка
npm install

### Запуск

npm run serve

### Стек проекта Vue.js 2.6.11 и Firebase 8.10.1
Без авторизации возможно находится только на странице мониторинга курсов валют
тестовый пользователь email - test@mail.com password - 123456, можно 
зарегистрировать нового.

### Использовал плагины:
moment.js,
money.js,
materializecss,
Vuelidate,

### Исполнения БД и Бекэнда:
Использовал firebase realtime database и auth для бд и авторизации
Скриншот БД - https://imgur.com/UEDzq6U
Получение данных курса валют происходит через https://www.cbr-xml-daily.ru/
В бд хранятся данные по курсам, каждый запрос данных на сайте выполняется проверка
по разнице во времени, если разница превышает 20 минут в БД перезаписываются актуальные
данные, если ресурс с курсом перестанет отвечать будет отображаться последняя 
сохраненная копия курса в БД - (lastCheck)
