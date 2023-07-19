// Вспомогательный объект для формирования URL
const url = {
    baseURL: 'https://api.ipgeolocation.io/timezone',
    apiKey: '32bcd4a6e4b548968e7afcdb682ac679',
    getURL: function (lat, lon) {
        return `${this.baseURL}?apiKey=${this.apiKey}&lat=${lat}&long=${lon}`;
    }
}

const geoPositionErrorMessage1 = 'Информация о местоположении недоступна';

const timezone = document.querySelector('.task22_4');
const button = document.querySelector('.j-btn-timezone');

// Callback функция для обработки события нажатия кнопки.
const initAction = _ => {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
            position => uploadAndAppendTimezoneDataInView(position.coords), 
            appendErrorGeopositionInfo
        );
    } else {
        appendErrorGeopositionInfo();
    }
}

// Вспомогательный метод для получения текстового контейнера.
const getTextConteiner1 = message => {
    const result = document.createElement('p');
    result.innerHTML = message;
    return result;
}

// Callback функция для добаления сообщения об ошибки получения координат местоположения пользователя.
const appendErrorGeopositionInfo1 = _ => {
    const result = getTextConteiner1(geoPositionErrorMessage1);
    timezone.appendChild(result);
}

// Ассинхронный метод для получения данных о времени по координатам.
const uploadAndAppendTimezoneDataInView = async ({ latitude, longitude }) => {
    const data = await fetch(url.getURL(latitude, longitude))
        .then(res => res.json());

    const timezoneView = getTextConteiner1(`Ваша временная зона: ${ data.timezone }`);
    const dateAndTimeView = getTextConteiner1(`Ваше местное время: ${ data.date_time_txt }`);
    
    timezone.appendChild(timezoneView);
    timezone.appendChild(dateAndTimeView);
}


// Навешиваем событие на кнопку.
button.addEventListener('click', initAction);