// Configuration - Vercel deployment URL
const API_URL = 'https://sahara-git-main-akankshas-projects-55127cf0.vercel.app/api/summarize';

/**
 * Called when Gmail add-on is opened
 */
function buildAddOnHome(e) {
  const card = CardService.newCardBuilder()
    .setHeader(CardService.newCardHeader()
      .setTitle('Email Summarizer')
      .setSubtitle('Get AI-powered email summaries'))
    .addSection(CardService.newCardSection()
      .setHeader('How to use')
      .addWidget(CardService.newTextParagraph()
        .setText('Open any email to see its summary automatically.')))
    .build();
  
  return [card];
}

/**
 * Called when a Gmail message is opened
 */
function onGmailMessageOpen(e) {
  try {
    const messageId = e.gmail.messageId;
    const accessToken = e.gmail.accessToken;
    GmailApp.setCurrentMessageAccessToken(accessToken);
    
    const message = GmailApp.getMessageById(messageId);
    const subject = message.getSubject();
    const body = message.getPlainBody();
    
    // Show loading card first
    const loadingCard = createLoadingCard(subject);
    
    // Fetch summary (this is synchronous in Apps Script)
    let summary;
    try {
      summary = fetchSummary(body);
    } catch (apiError) {
      Logger.log('API Error: ' + apiError.toString());
      return createErrorCard('Failed to fetch summary. Please check your API configuration.');
    }
    
    // Show summary card
    const summaryCard = createSummaryCard(subject, summary);
    
    return summaryCard;
  } catch (error) {
    Logger.log('Error: ' + error.toString());
    return createErrorCard('Failed to load summary: ' + error.toString());
  }
}

/**
 * Fetch summary from API
 */
function fetchSummary(emailText) {
  try {
    const payload = {
      text: emailText,
      options: {
        bullets: 3
      }
    };
    
    const options = {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify(payload),
      muteHttpExceptions: true
    };
    
    const response = UrlFetchApp.fetch(API_URL, options);
    const responseCode = response.getResponseCode();
    
    if (responseCode !== 200) {
      const errorText = response.getContentText();
      Logger.log('API Error: ' + errorText);
      throw new Error('API returned ' + responseCode);
    }
    
    const data = JSON.parse(response.getContentText());
    return data.summary || 'No summary available';
  } catch (error) {
    Logger.log('Fetch error: ' + error.toString());
    throw error;
  }
}

/**
 * Create loading card
 */
function createLoadingCard(subject) {
  return CardService.newCardBuilder()
    .setHeader(CardService.newCardHeader()
      .setTitle('Loading Summary...'))
    .addSection(CardService.newCardSection()
      .addWidget(CardService.newTextParagraph()
        .setText('Summarizing: ' + subject)))
    .build();
}

/**
 * Create summary card
 */
function createSummaryCard(subject, summary) {
  return CardService.newCardBuilder()
    .setHeader(CardService.newCardHeader()
      .setTitle('Email Summary')
      .setSubtitle(subject))
    .addSection(CardService.newCardSection()
      .setHeader('Summary')
      .addWidget(CardService.newTextParagraph()
        .setText(summary)))
    .build();
}

/**
 * Create error card
 */
function createErrorCard(errorMessage) {
  return CardService.newCardBuilder()
    .setHeader(CardService.newCardHeader()
      .setTitle('Error'))
    .addSection(CardService.newCardSection()
      .addWidget(CardService.newTextParagraph()
        .setText(errorMessage)))
    .build();
}

/**
 * Test function - Run this manually to test the add-on
 * Check logs in: View > Logs OR Executions tab
 */
function testAddOn() {
  // Force output by throwing if there's an error
  try {
    Logger.log('=== TEST STARTED ===');
    Logger.log('API URL: ' + API_URL);
    
    const testText = 'This is a test email for the summarizer add-on. We need to test if the API is working correctly.';
    Logger.log('Test text: ' + testText);
    Logger.log('Calling fetchSummary...');
    
    const summary = fetchSummary(testText);
    
    Logger.log('=== SUCCESS ===');
    Logger.log('Summary received: ' + summary);
    Logger.log('Length: ' + summary.length);
    
    // Also return so it shows in execution result
    return 'SUCCESS! Summary: ' + summary;
    
  } catch (error) {
    Logger.log('=== ERROR ===');
    Logger.log('Error message: ' + error.message);
    Logger.log('Error toString: ' + error.toString());
    Logger.log('Error name: ' + error.name);
    if (error.stack) {
      Logger.log('Stack: ' + error.stack);
    }
    // Re-throw to see error in execution
    throw error;
  }
}

/**
 * Simple test - just check API URL
 */
function testAPIURL() {
  Logger.log('API_URL = ' + API_URL);
  return 'API URL is: ' + API_URL;
}

