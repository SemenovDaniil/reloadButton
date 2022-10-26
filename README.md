# reloadButton

Позволяет запускать выполнение reload-tasks даже пользователям без лицензии.

Работает через header-авторизацию.
Для этого нужна специально настроенная virtual-proxy.

Инструкция по настройке прокси: https://community.qlik.com/t5/Qlik-Sense-Documents/How-to-access-QRS-Repository-from-Load-Script/ta-p/1484264

Для запуска таска у пользователя должна быть одна из ролей, которая дает такую возможность. Пример настройки такой роли: https://community.qlik.com/t5/Official-Support-Articles/Qlik-Sense-Security-rules-needed-to-call-task-start-and-result/ta-p/1717434

Так же пример security rules можно посмотреть ниже. После чего выдаем пользователю созданную роль.

В самом экстеншене необходимо указать в соответствующих полях раздела "Request configuration"
1. Server host в формате https://server.host
2. Virtual proxy (header) prefix - prefix вашей virtual proxy настроенной на header-аутентификацию
3. Name of user parametres in request - соответствует параметру Header authentication header name в настройках virtual proxy
4. User Id - id ранее настроенного пользователя у которого есть полномочия на запуск таска
5. Task Id - id таска, который необходимо запустить. Посмотреть можно в qmc/tasks -> ID


Для ограничения доступа пользователям к запуску, необходимо в условии вычисления (Дополнения -> Обработка данных -> Условие вычисления) прописать соответствующее выражение.

## Описание необходимых security rules

1. Для запуска и просмотра статуса таска:

Name: #Custom. Task admin
Resource filter: App_*,ReloadTask*, ExecutionResult_*, ExecutionSession_*, externalProgramTask_*
Actions: Read, Update
Conditions: ((user.roles="TaskAdmin"))
Context: Only in qmc

2. Для просмотра связанных тасков

Name: #Custom. Task chain viewer
Resource filter: SchemaEvent*, CompositeEvent*
Actions: Read
Conditions: ((user.roles="TaskAdmin"))
Context: Only in qmc
