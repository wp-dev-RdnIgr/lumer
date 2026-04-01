var SUPABASE_URL = 'https://cnswkvifvywkjadbsjfd.supabase.co';
var SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNuc3drdmlmdnl3a2phZGJzamZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUwMjY1MzMsImV4cCI6MjA5MDYwMjUzM30.u05IFU13TsxGPlnRokUeIxEr0bNn5wBgaAl_cRRqYO0';

function doGet() {
  return HtmlService.createTemplateFromFile('index')
    .evaluate()
    .setTitle('Madeira Trip Planner')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

/**
 * Server-side function to fetch all data from Supabase.
 * Called from client via google.script.run.getAllData()
 */
function getAllData() {
  var headers = {
    'apikey': SUPABASE_ANON_KEY,
    'Authorization': 'Bearer ' + SUPABASE_ANON_KEY
  };
  var options = {
    'method': 'get',
    'headers': headers,
    'muteHttpExceptions': true
  };

  var categories = JSON.parse(
    UrlFetchApp.fetch(SUPABASE_URL + '/rest/v1/categories?select=*&order=sort_order.asc', options).getContentText()
  );
  var attractions = JSON.parse(
    UrlFetchApp.fetch(SUPABASE_URL + '/rest/v1/attractions?select=*&order=sort_order.asc', options).getContentText()
  );
  var presets = JSON.parse(
    UrlFetchApp.fetch(SUPABASE_URL + '/rest/v1/presets?select=*&order=sort_order.asc', options).getContentText()
  );
  var presetDays = JSON.parse(
    UrlFetchApp.fetch(SUPABASE_URL + '/rest/v1/preset_days?select=*&order=day_number.asc', options).getContentText()
  );
  var images = JSON.parse(
    UrlFetchApp.fetch(SUPABASE_URL + '/rest/v1/attraction_images?select=*&order=sort_order.asc', options).getContentText()
  );

  return {
    categories: categories,
    attractions: attractions,
    presets: presets,
    presetDays: presetDays,
    images: images
  };
}
