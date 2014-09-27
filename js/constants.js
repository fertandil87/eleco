angular.module('diarioApp')
    .constant('RSS', [
    {
        name: 'Portada',
        url: '/portada',
        link: 'http://www.eleco.com.ar/rss/0/tapa.xml',
        template: 'partials/rss.html',
        controller: 'RssCtrl'
    },
    {
        name: 'Política',
        url: '/politica',
        link: 'http://www.eleco.com.ar/rss/rss/1/poltica.xml',
        template: 'partials/rss.html',
        controller: 'RssCtrl'
    },
    {
        name: 'Policiales',
        url: '/policiales',
        link: 'http://www.eleco.com.ar/rss/rss/2/policiales.xml',
        template: 'partials/rss.html',
        controller: 'RssCtrl'
    },
    {
        name: 'Deportes',
        url: '/deportes',
        link: 'http://www.eleco.com.ar/rss/rss/3/deportes.xml',
        template: 'partials/rss.html',
        controller: 'RssCtrl'
    },
    {
        name: 'Interés General',
        url: '/interes-general',
        link: 'http://www.eleco.com.ar/rss/rss/4/inters_general.xml',
        template: 'partials/rss.html',
        controller: 'RssCtrl'
    },
    {
        name: 'Sociales',
        url: '/sociales',
        link: 'http://www.eleco.com.ar/rss/rss/7/sociales.xml',
        template: 'partials/rss.html',
        controller: 'RssCtrl'
    },
    {
        name: 'Necrológicas',
        url: '/necrologicas',
        link: 'http://www.eleco.com.ar/rss/rss/8/necrolgicas.xml',
        template: 'partials/rss.html',
        controller: 'RssCtrl'
    }]);    