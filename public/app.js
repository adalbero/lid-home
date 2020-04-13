const APP = 'lid-home:2.0';

function appOpen(url) {
  appLog('open: ' + url);
  window.open(url, '_blank');
}

function appLink(url) {
  appLog('link: ' + url);
  window.location.href = url;
}

function appLog(text) {
  try {
    if ('firebase' in window) {
      firebase
        .analytics()
        .logEvent('lid_home_event', { value: text, app: APP });
      return;
    }
  } catch (ex) {}

  console.log(text);
}
