#mod.dictionary - Компонента справочника
## Описание
Поиск элементов в справочниках json.

По умолчанию все справочники беруться с использованием библиотеки angular-resource
из каталога текущего приложения по url = '/models/:name.json'
рекомендуется при сборке приложения (app) создавать каталог models внутри папки src для
данных json
Это значение задано в файле настроек:

    mod:
      dictionary:
        url:
          default: '/models/:name.json'


где :name это имя словаря dictionaryName.
Если шаблон url оканчиваеться на json то путь относителен каталога текущего приложения app,
иначе полный путь.

То есть при вызове справочник по имени dictionaryName с использование фильтра:

    {{ key | dictionary:dictionaryName }}

или с использованием метода

    dictionaryRest.get(dictionaryName)

произойдет загрузка любого json файла из текущего каталога приложения (app), к примеру

   app/arm/Z1y8zSB/models/:name.json

Если же справочник не является локальным файлом, а представляется собой rest сервис, то
в файл настроек необходимо добавить соответствующую запись, для данного словаря

    mod:
      dictionary:
        url:
          default: '/models/:name.json'
          systems: '/api/rest/:name'

Таким образом для при обращении {{ key | dictionary:'systems' }}
или dictionaryRest.get('systems') подгрузиться справочник systems, уже не из каталога приложения
а с rest-сервера.

# Поиск элементов в справочниках json заданного как массив простых объектов

## Структура справочника словаря dictionary
Справочник должен представлять из себя массив объектов следующей структуры

    [
        {
            "code": "portal",
            "value": "Портал"
        },
        {
            "code": "webservice",
            "value": "Веб-сервис"
        },
        {
            "code": "external",
            "value": "Внешняя система"
        }
    ]
Где ключ(key) равно "code", значение(value) равно "value" заданы как значения по умолчанию.
Значения непосредственно могут быть заданы при вызовах функций или фильтров.
А так же заданы по умолчанию в файле настроек.
    mod:
      dictionary:
        field:
          key: code
          value : value

## Фильтр dictionary - Поиск в справочнике по ключу
  Варианты вызова фильтра:

      {{ key | dictionary:'dictionaryName' }}
      {{ key | dictionary:'dictionaryName':'valueField' }}
      {{ key | dictionary:'dictionaryName':'valueField':'defaultValue' }}
      {{ key | dictionary:'dictionaryName':{'keyField':'valueField'}  }}
      {{ key | dictionary:'dictionaryName':{'keyField':'valueField'}:'defaultValue'  }}

  Поиск в справочнике dictionaryName (заданный как массив объектов)
  Нужного объекта по ключу keyField и возвращение его поля valueField
  если не найден объект то defaultValue

  Если keyField или valueField не заданы то они беруться из значений по умолчанию, заданного в файле настроек

  фильтр равносилен функции:

    dictionaryArray.getItem(dictionaryRest.get(dictionaryName), key, 'valueField', defaultValue);
    dictionaryArray.getItem(dictionaryRest.get(dictionaryName), key, {'keyField':'valueField'}, defaultValue);

# Поиск элементов в справочниках json заданного как массив с ключем в виде регулярного выражения
## Структура справочника словаря dictionaryReg
Справочник должен представлять из себя массив объектов следующей структуры:

    [
      {
          "reg":"^Status_[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\\.xml$",
          "value":"Файл статуса"
      },
      {
          "reg": "^type-map\\.properties$",
          "value": "Содержимое папки"
      },
      {
          "reg": "^.{1,}\\.pdf$",
          "value": "PDF документ"
      },
      {

    ]

Где ключ(reg) равно "reg", значение(value) равно "value" заданы как значения по умолчанию.
Значения непосредственно могут быть заданы при вызовах функций или фильтров.
А так же заданы по умолчанию в файле настроек.
    mod:
      dictionary:
        field:
          reg: reg
          value : value

## Фильтр dictionaryReg - Поиск в справочнике по маске регулярного выражения
  Варианты вызова фильтра:

    {{ key | dictionaryReg:'dictionaryName' }}
    {{ key | dictionaryReg:'dictionaryName':'valueField' }}
    {{ key | dictionaryReg:'dictionaryName':'valueField':'defaultValue' }}
    {{ key | dictionaryReg:'dictionaryName':{'regField':'valueField'} }}
    {{ key | dictionaryReg:'dictionaryName':{'regField':'valueField'}:'defaultValue' }}

  Поиск в справочнике dictionaryName (заданный как массив объектов), по маске регулярного выражения,
  заданного ключем в поле keyField нужного объекта
  И возвращение  его поля valueField
  если не найден объект то defaultValue

  Если regField или valueField не заданы то они беруться из значений по умолчанию, заданного в файле настроек

  фильтр равносилен функции:

    dictionaryArray.geReg(dictionaryRest.get(dictionaryName), key, 'valueField', defaultValue);
    dictionaryArray.getReg(dictionaryRest.get(dictionaryName), key, {'regField':'valueField'}, defaultValue);


# Поиск элементов в справочниках json заданного как объект
Такие структуры не рекомендуются к использованию
## Структура справочника словаря dictionaryMap
Справочник должен представлять из себя объект, подобного вида:

    {
      "003": "Миллиметр",
      "004": "Сантиметр",
      "005": "Дециметр",
      "006": "Метр",
      "008": "Километр",
      "009": "Мегаметр",
      "047": "Морская миля",
      "050": "Квадратный миллиметр",
      "051": "Квадратный сантиметр",
      "053": "Квадратный дециметр",
      "055": "кв.м.",
      "058": "т.кв.м.",
      "059": "га",
      "061": "кв.км.",
      "109": "ар (100 м2)",
      "359": "Сутки",
      "360": "Неделя",
      "361": "Декада",
      "362": "Месяц",
      "364": "Квартал",
      "365": "Полугодие",
      "366": "Год",
      "383": "р.",
      "384": "тыс.р.",
      "385": "млн.р.",
      "386": "млрд.р.",
      "1000": "Неопределено",
      "1001": "Значение отсутствует",
      "1002": "Рублей за кв. метр",
      "1003": "Рублей за ар",
      "1004": "Рублей  за гектар",
      "1005": "Иные"
    }

## Фильтр dictionaryMap

    {{ key | dictionaryMap:'dictionaryName' }}
    {{ key | dictionaryMap:'dictionaryName',:'defaultValue' }}

  Поиск в справочнике dictionaryName (заданный как объект, где элементы ключ:значение)
  Нужного элемента по заданному ключу и возвращение его значения
  если не найдено поле то defaultValue

  фильтр равносилен функции:

       return dictionaryArray.getMapItem(dictionaryRest.get(name,true), key, defaultValue);



# Значения по умолчанию
Значения по умолчанию empty и loading задаются в файле настроек

    mod:
      dictionary:
        value:
          empty: null  # if true show key, if string value show string
          loading: '...'

#Встроенные справочники

## Фильтр dictionaryBytes
 Конвертация байт в килобайты, мегобайты и т.д
## Фильтр dictionaryBase64
 Раскодировка из base64
## Фильтр dictionaryRuble
  Конвертация копеек в рубле
## Фильтр dictionaryShortName
  Обрезка длинных имен файлов