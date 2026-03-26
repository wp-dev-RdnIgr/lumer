function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('Lumer - Transporte de Carga & Motoentrega')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
