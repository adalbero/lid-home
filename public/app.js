const APP = 'lid-home:1.0';

function appOpen(url) {
  appLog('open: ' + url);
  window.open(url, '_blank');
}

function appLink(url) {
  appLog('link: ' + url);
  window.location.href = url;
}

function appLog(text) {
  if ('firebase' in window) {
    firebase.analytics().logEvent('lid_home_event', { value: text, app: APP });
  } else {
    console.log(text);
  }
}
