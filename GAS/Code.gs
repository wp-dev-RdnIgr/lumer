function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('Lumer - Transporte de Carga & Motoentrega')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * Returns the stored API key from Script Properties.
 * To set it: File > Project Settings > Script Properties > Add:
 *   Key: OPENAI_API_KEY
 *   Value: your-api-key
 */
function getApiKeyStatus() {
  var key = PropertiesService.getScriptProperties().getProperty('OPENAI_API_KEY');
  return { hasKey: !!key };
}

function setApiKey(apiKey) {
  PropertiesService.getScriptProperties().setProperty('OPENAI_API_KEY', apiKey);
  return { success: true };
}

function generateText(params) {
  var apiKey = PropertiesService.getScriptProperties().getProperty('OPENAI_API_KEY');

  if (!apiKey) {
    return {
      success: false,
      error: 'API key not configured. Please set your OpenAI API key first.'
    };
  }

  var messages = [];

  if (params.systemPrompt && params.systemPrompt.trim() !== '') {
    messages.push({
      role: 'system',
      content: params.systemPrompt
    });
  }

  messages.push({
    role: 'user',
    content: params.userPrompt
  });

  var payload = {
    model: params.model || 'gpt-4o-mini',
    messages: messages,
    temperature: parseFloat(params.temperature) || 0.7,
    max_tokens: parseInt(params.maxTokens) || 1024,
    top_p: parseFloat(params.topP) || 1.0,
    frequency_penalty: parseFloat(params.frequencyPenalty) || 0.0,
    presence_penalty: parseFloat(params.presencePenalty) || 0.0
  };

  if (params.stop && params.stop.trim() !== '') {
    payload.stop = params.stop.split(',').map(function(s) { return s.trim(); });
  }

  var options = {
    method: 'post',
    contentType: 'application/json',
    headers: {
      'Authorization': 'Bearer ' + apiKey
    },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };

  try {
    var response = UrlFetchApp.fetch('https://api.openai.com/v1/chat/completions', options);
    var json = JSON.parse(response.getContentText());

    if (json.error) {
      return {
        success: false,
        error: json.error.message
      };
    }

    return {
      success: true,
      text: json.choices[0].message.content,
      usage: {
        prompt_tokens: json.usage.prompt_tokens,
        completion_tokens: json.usage.completion_tokens,
        total_tokens: json.usage.total_tokens
      },
      model: json.model,
      finish_reason: json.choices[0].finish_reason
    };
  } catch (e) {
    return {
      success: false,
      error: e.toString()
    };
  }
}
