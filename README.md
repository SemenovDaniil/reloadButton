# reloadButton

Позволяет запускать выполнение reload-tasks даже пользователям без лицензии.

Работает черех header-авторизацию.
Для этого нужна специально настроенная virtual-proxy.

Инструкция по настройке прокси: https://community.qlik.com/t5/Qlik-Sense-Documents/How-to-access-QRS-Repository-from-Load-Script/ta-p/1484264

Для запуска таска у пользователя должна быть одна из ролей, которая дает такую возможность. Пример настройки такой роли: https://community.qlik.com/t5/Official-Support-Articles/Qlik-Sense-Security-rules-needed-to-call-task-start-and-result/ta-p/1717434

В самом экстеншене необходимо указать в соответствующих полях раздела "Request configuration"
1. Server host в формате https://server.host
2. Virtual proxy (header) prefix - prefix вашей virtual proxy настроенной на header-аутентификацию
3. Name of user parametres in request - соответствует параметру Header authentication header name в настройках virtual proxy
4. User Id - id ранее настроенного пользователя у которого есть полномочия на запуск таска
5. Task Id - id таска, который необходимо запустить. Посмотреть можно в qmc/tasks -> ID


Для ограничения доступа пользователям к запуску, необходимо в условии вычисления (Дополнения -> Обработка данных -> Условие вычисления) прописать соответствующее выражение.
