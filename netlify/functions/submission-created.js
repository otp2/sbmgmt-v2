exports.handler = async function(event, context) {
  try {
    console.log('Received form submission event');
    console.log('Event headers:', event.headers);
    
    // The payload is inside form_submission.payload for Netlify Forms
    const body = JSON.parse(event.body);
    console.log('Full event body:', body);
    
    const payload = body.payload || body;
    console.log("Extracted payload:", payload);
    
    // Identify which form was submitted
    const formName = payload.form_name || 'Unknown form';
    console.log(`Form name: ${formName}`);
    
    // You could add additional logic here, such as sending emails, 
    // saving to a database, or other processing
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ 
        received: true,
        message: "Form submission successfully processed",
        form: formName,
        timestamp: new Date().toISOString()
      }),
    };
  } catch (error) {
    console.error("Error processing form submission:", error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ 
        received: false,
        error: "Error processing form submission",
        message: error.message,
        timestamp: new Date().toISOString(),
        stack: process.env.NODE_ENV !== 'production' ? error.stack : undefined
      }),
    };
  }
}; 