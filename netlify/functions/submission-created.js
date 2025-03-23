exports.handler = async function(event, context) {
  try {
    // The payload is inside form_submission.payload for Netlify Forms
    const body = JSON.parse(event.body);
    const payload = body.payload || body;
    
    console.log("Form submission received:", payload);
    
    // Identify which form was submitted
    const formName = payload.form_name || 'Unknown form';
    console.log(`Form name: ${formName}`);
    
    // You could add additional logic here, such as sending emails, 
    // saving to a database, or other processing
    
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        received: true,
        message: "Form submission successfully processed",
        form: formName
      }),
    };
  } catch (error) {
    console.error("Error processing form submission:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        received: false,
        error: "Error processing form submission",
        message: error.message
      }),
    };
  }
}; 