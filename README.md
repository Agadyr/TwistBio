# Biocad

## Стек

- Стейтменеджеры - **[TanStack Query](https://tanstack.com/query/v4/docs/react/quick-start), [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)**
- Работа с формами - **[react-hook-form](https://react-hook-form.com/get-started)** & **[yup](https://www.npmjs.com/package/yup)**
- Сборка **[Vite](https://vitejs.dev/)**

## CI

Адрес бэкенда задается при помощи переменной окружения VITE_API_URL

## Скрипты

##### Установка зависимостей

```shell script
yarn
```

##### Установка husky для pre-push-хука (обязательно)

```shell script
yarn prepare
```

##### Production сборка

```shell script
yarn build:prod
```

##### Development сборка

```shell script
yarn build:dev
```

##### Запуск сервера для разработки

```shell script
yarn dev
```

##### Запуск линтера

```shell script
yarn lint
```

```shell script
yarn lint:css
```

##### Запуск prettier для проекта

```shell script
yarn format
```

### Инструкция для запуска фронта с локальным бэком (для бэкендеров)

1. Устанавливаем NodeJS https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04-ru
2. Устанавливаем yarn

```shell script
npm install --global yarn
```

3. Запускаем бэкенд-приложение локально на 8000 порту
4. Устанавливаем зависимости:

```shell script
yarn install
```

5. Запускаем фронт (ждать минут 5):

```shell script
yarn local-backend
```

6. Заходим http://localhost:3000/

## Структура

- **\_templates** - шаблоны hygen
- **public** - статичный контент
- **src** - все исходники
  - **assets** - глобальные стили (scss), шрифты, изображения
  - **components** - папка с общими компонентами приложения
    - modals - модальные окна
    - template - компоненты, относящиеся к общему каркасу сайта
  - **config** - конфигурационные файлы
  - **constants** - константы
  - **context** - контексты
  - **hocs** - компоненты высшего порядка - подключение прелоадера, предзагрузка информации, etc
  - **hooks** - кастомные хуки
  - **interfaces** - общие интерфейсы приложения
  - **layouts** - лейауты
  - **mock** - моковые данные
  - **modules** - общие модули между стримами
  - **packages** - модули, которые можно вынести в отдельные пакеты
  - **pages** - страницы приложения
  - **routes** - роуты
  - **ui** - компоненты без бизнес-логики
  - **utils** - вспомогающие функции

**_В UI-компонентах разрешаются импорты только из папок constants и utils_**

## Модульная архитектура

Приложение разделено на модули, которые хранятся в папках **modules**. Каждая папка - отдельная фича, внутри следующая структура:

- **api**
  - endpoints - эндпойнты для этой фичи
  - methods - методы api для этой фичи
  - interfaces - интерфейсы, касающиеся именно api
  - index - по умолчанию экспортируются только api-методы и интерфейсы
- **accesses** - хуки, касающиеся управлением доступом к загрузке ресурсов по фиче
- **components** - компоненты для фичи
- **handlers** - хуки, касающиеся фичи, но не касающиеся запросов к серверу
- **helpers** - вспомогательные функции для фичи, но не хуки
- **interfaces** - интерфейсы фичи, не касающиеся api
  - common - общие интерфейсы фичи, используемые в компонентах
  - queries - интерфейсы, используемые в папке queries, так же могут использоваться в api-методах для типизации принимаемых этими методами аргументов
- **queries** - хуки для react-query
  - types - enum для ключей в queries-хуках
- **constants** - какие-либо статичные данные для фичи
- **store** - файлы для какого-то внутреннего стора компонента
- **requests** - если одни и те же запросы используются в нескольких хуках useQuery, то такие запросы следует выносить в эту папку, оформляя их как хуки. Пример - _src/logics/forecast/requests/useRequestForecast.ts_ Экспортироваться из таких хуков должно 3 поля:

```typescript
{
  createQueryFn, // функция, которая возвращает функцию для использования в useQuery
    queryOptions, // опции, используемые в useQuery
    enabled // boolean - есть ли доступ для того чтобы делать запрос
}
```

## API запросы

В **endpoints.ts** задаются эндпойнты:

```typescript
import { createEndpoint } from 'config/api'
import { OneParamEndpointConstructor } from 'interfaces/api.interfaces'

interface Endpoints {
  getSelection: OneParamEndpointConstructor
}

export const selectionsEndpoints: Endpoints = {
  getSelection: (selectionId) => createEndpoint(`/demand/selections/:selectionId`, { selectionId }),
}
```

А в **methods.ts** - методы:

````typescript
import { axios } from 'config/axios'
import { Streams } from 'constants/streams'
import { GetOneResponse } from 'interfaces/api.interfaces'
import { selectionsEndpoints } from './endpoints'
import { Selection } from './interfaces'

const highlightPageOutline = async (comparisonId: number, pageId: number): GetOneResponse<ComparisonOutlineResponse> =>
  (await axios.post(comparisonPageEndpoints.outline(comparisonId, pageId))).data.data

## Работа с TanStack Query

Хук useQueryClient, useInfiniteQuery следует импортировать из packages/react-query.

Если получать queryClient через кастомный хук useQueryClient, то в setQueryData и setQueriesData, можно не возвращать новое значение, а мутировать предыдущее, так как в эти функции встроен immer.js.

Хук useInfiniteQuery адаптирован под систему пагинации приложения.

В объект meta можно передавать параметр error, который принимает следующие значения:

Ошибка пришедшая по api будет проигнорирована и в toast.error будет выведена переданная ошибка (она же будет возвращена из хука в параметре error):

```typescript
error: string
// или
meta: {
  error: {
    message: string
    showToast: true
  }
}
````

Ошибка пришедшая по api будет проигнорирована, toast.error выведен не будет, а из хука будет возвращена переданная ошибка в параметре error:

```typescript
meta: {
  error: {
    message: string
    showToast: false
  }
}
```

Ошибка пришедшая по api будет возвращена из хука в параметре error, toast.error выведен не будет:

```typescript
meta: {
  error: {
    showToast: false
  }
}
```

Поведение по умолчанию: ошибка пришедшая по api будет возвращена из хука в параметре error, toast.error будет выведен:

```typescript
meta: {
  error: undefined
}
// или
meta: {
  error: {
    showToast: true
  }
}
```

Для запросов с пагинацией следует использовать хуки **useInfiniteQuery** и usePaginateQuery:

```typescript
const { data, isLoading, isFetched, fetchNextPage, hasNextPage } = useInfiniteQuery(
  [DataSourcesQueries.EmptyDataSources],
  ({ pageParam }) => dataSourcesApi.getDataSources(false, { page: pageParam }),
  {
    enabled,
    meta: {
      error: {
        message: errorsNoData[getLang()]?.dataSources,
        showToast: false,
      },
    },
  },
)
```

```typescript
const {
  data,
  isLoading,
  currentPage,
  isRefetching,
  pagination,
  fetchPage,
  setCurrentPage,
  refetchPage,
  refetchCurrentPage,
  removeOtherPages,
  reloadPages,
} = usePaginateQuery({
  queryKey: [DelistingQueries.DelistingTable],
  queryFn: ({ pageParam }) => delistingApi.getDelistingTable(filters, { page: pageParam }),
  pageSize: statusDashboardPerPage,
})
```

## Интернационализация

Изменить системный язык сайта можно в `src/config/systemLang.ts`

Все словари находятся в папке `src/locale`

### Добавление переводов

Для добавления перевода для новой фичи нужно создать файлы json c переводами в папках `src/local/{lang}` и подключить эти файлы в индексные файлы, находящиеся в этих же папках.

#### Использование перевода

Обычный текст:

```typescript jsx
import { useTranslate } from 'config/i18n'

const translate = useTranslate()

return <span>{translate('menu.data')}</span>
```

Вставка текста в jsx:

```json
{
  "helloEasy": "Привет, я  – <1>Jenius</1>.<2></2>Я предсказываю будущее и помогу тебе быстрее и точнее сделать прогноз продаж. Но сначала нужно авторизоваться."
}
```

```typescript jsx
import { TaggedText } from '@ayub-begimkulov/i18n'
import { useTranslate } from 'config/i18n'

const translate = useTranslate()

return (
  <TaggedText
    tags={{
      1: (text) => <span className="strong">{text}</span>,
      2: () => <br />,
    }}
    text={translate('helloEasy')}
  />
)
```

Вставка переменных в текст (поддерживается только camelCase):

```json
{
  "hello": "Привет, {{name}}"
}
```

```typescript jsx
import { useTranslate } from 'config/i18n'

const translate = useTranslate()

return <span>{translate('hello', { name: profile.firstName })}</span>
```

Использование перевода вне компонента:

```typescript
import { i18n } from 'config/i18n'

i18n.get('sellIn')
```

#### Переключение языка

Переводы для конкретного языка грузятся асинхронно.

```typescript jsx
import { useLang } from 'config/i18n'

const setLang = useLang((state) => state.setLang)
setLang('ru') // 'ru' | 'en'
```

#### Получение текущего языка

Вне компонента:

```typescript
import { getLang } from 'config/lang'

getLang()
```

В компоненте:

```typescript
import { useLang } from 'config/i18n'

const lang = useLang((state) => state.lang)
```

Подробнее об интернационализации, использовании плюральных форм других возможностях: https://www.npmjs.com/package/@ayub-begimkulov/i18n

## Изменение параметров графика

Палитра для графиков хранится тут: `src/constants/colors.ts`

## Обработка ошибок API

В src/modules/apiConfig.ts создан конфиг для обработки ошибок, который подключен к axios в виде интерцептора.

Возможные опции

- **notFoundStatus**: _number_ - Статус когда ресурс не найден (по умолчанию: 404)
- **notValidStatus**: _number_ - Статус когда ошибка валидации (по умолчанию: 422)
- **initialError**: _Error_ - Ошибка по умолчанию (по умолчанию `{ message: 'Ошибка', code: 'error' }`)
- **notFoundError**?: _Error_ - Ошибка когда ресурс не найден
- **notValidError**?: _Error_ - Ошибка валидации
- **getMessageErrorApi**: _(responseError: AxiosResponse) => string | undefined_ - Функция для получения ошибки (по умолчанию берется поле detail из ответа)
- **getCodeErrorApi**: _(responseError: AxiosResponse) => string | undefined_- Функция для получения кода ошибки (по умолчанию берется поле code из ответа)
- **getValidationErrors**: _(responseError: AxiosResponse) => Record<string, string> | null | undefined_ - Функция для парсинга ошибок валидации. Работа по умолчанию описана ниже.

Работа функции getValidationErrors по умолчанию: Объект вида

```json
{
  "title": ["This field is required."],
  "description": ["This field is required."]
}
```

парсится в

```json
{
  "title": "This field is required.",
  "description": "This field is required."
}
```

#### Что требуется для обработки ошибок:

Экспортируем нужные функции

- errorInterceptor - интерцептор для подключения к axios
- createApiError - функция для создания кастомных ошибок в api-методах

```typescript
export const apiTypingErrors = new ApiTypingErrors()
export const { errorInterceptor, createApiError } = apiTypingErrors
```

```typescript
axios.interceptors.response.use((response) => response, errorInterceptor)
```

#### Создание кастомных ошибок в api-методах c помощью функции **createApiError**

```typescript
import { createApiError } from 'modules/api'
import { axios } from 'modules/axios'

const getAll = async (params: Pagination): GetAllResponse<UserServer> => {
  const { data: response } = await axios.request<GetAllData<UserServer>>({
    method: 'GET',
    url: endpoints.users.getAll(),
    params,
  })
  if (!response) {
    throw createApiError({ message: 'Нет ответа' })
  }
  return response
}
```

#### Свой тип ошибок

```typescript
export const apiTypingErrors = new ApiTypingErrors<TypeError, ErrorFromServer>()
```

- **TypeError** - тип возвращаемой ошибки
- **ErrorFromServer** - тип ошибки с сервера

## Code style

- Для соблюдения единого стиля кода есть eslint, для форматирования - prettier, для стилей stylelint
- Стоит pre-commit hook с валидацией и форматированием (убедитесь, что он включен в вашем редакторе кода)

## Особенности

Для хранения состояния сервера используется Tanstack Query, для любого другого состояния - Zustand. Для синхронизации стейта с Local Storage используется persist из zustand/middleware.

По умолчанию все ответы сервера из snake_case преобразуются в camelCase. C запросами к серверу - в обратном направлении. Таким образом мы избегаем использования snake_case во фронтенде.

Нельзя использовать navigator.clipboard, потому что он доступен только в HTTPS, а внутренний контур Danone работает по HTTP. Вместо этого для копирования текста в буфер обмена нужно использовать функцию copy из packages/helper.

## Конфигурация

**VSCode**: https://wiki.spectr.dev/pages/viewpage.action?pageId=10649610

**Webstorm**: https://wiki.spectr.dev/pages/viewpage.action?pageId=20350442
