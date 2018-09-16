var points;
var center;
var myMap;

ymaps.ready(getCenterCoordinates);

function initMap() {
    myMap = new ymaps.Map("map", {
        // Координаты центра карты.
        // Порядок по умолчнию: «широта, долгота».
        // Чтобы не определять координаты центра карты вручную,
        // воспользуйтесь инструментом Определение координат.
        center: [center[1], center[0]],
        // Уровень масштабирования. Допустимые значения:
        // от 0 (весь мир) до 19.
        zoom: 9
    });
}

function drawPolygon() {

    // Создаем многоугольник, используя класс GeoObject.
    var myGeoObject = new ymaps.GeoObject({
        // Описываем геометрию геообъекта.
        geometry: {
            // Тип геометрии - "Многоугольник".
            type: "Polygon",
            // Указываем координаты вершин многоугольника.
            coordinates: [
                points.map(function (x) { return [x[1], x[0]] })
            ],
            // Задаем правило заливки внутренних контуров по алгоритму "nonZero".
            fillRule: "nonZero"
        },
        // Описываем свойства геообъекта.
        properties: {
            // Содержимое балуна.
            balloonContent: "Многоугольник"
        }
    }, {
            // Описываем опции геообъекта.
            // Цвет заливки.
            fillColor: '#00FF00',
            // Цвет обводки.
            strokeColor: '#0000FF',
            // Общая прозрачность (как для заливки, так и для обводки).
            opacity: 0.5,
            // Ширина обводки.
            strokeWidth: 5,
            // Стиль обводки.
            strokeStyle: 'shortdash'
        });

    myGeoObject.events.add(['click'], function (e) {
        alert(42);
    });

    // Добавляем многоугольник на карту.
    myMap.geoObjects.add(myGeoObject);
}

function getCenterCoordinates() {

    var request = new XMLHttpRequest();
    request.open("GET", "https://nominatim.openstreetmap.org/details.php?place_id=198100709&polygon_geojson=1&format=json", true);
    request.onreadystatechange = function (aEvt) {
        if (request.readyState == 4) {
            if (request.status == 200) {
                var data = JSON.parse(request.responseText);
                points = data.geometry.coordinates[0];
                center = data.centroid.coordinates;

                initMap();
                drawPolygon();
            }
            else {
                alert("Error loading page\n");
            }
        }
    };

    request.send();
}   