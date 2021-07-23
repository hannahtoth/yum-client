let APIURL = '';

switch (window.location.hostname) {
    case 'localhost' || '127.0.0.1':

    APIURL = 'http://localhost:3001';
    break;

    case 'jbl-yum-server.herokuapp.com':

    APIURL = 'https://jbl-yum-server.herokuapp.com'
}

export default APIURL;