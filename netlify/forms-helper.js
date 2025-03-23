/**
 * Helper utilities for Netlify Forms integration with Next.js
 */

/**
 * Handles form submission to Netlify
 * @param {string} formName - The name of the form as defined in the hidden form
 * @param {object} values - Form values object
 * @returns {Promise} - Fetch promise
 */
export async function submitToNetlify(formName, values) {
  // Fallback for testing/development environments
  if (process.env.NODE_ENV === 'development') {
    console.log('Development mode: Form would be submitted to Netlify', {
      formName,
      values
    });
    // Return a mock successful response for development
    return {
      ok: true,
      text: async () => 'Development mode - form not actually submitted'
    };
  }

  // Ensure all values are strings for proper URL encoding
  const formValues = Object.fromEntries(
    Object.entries(values).map(([key, value]) => {
      // Handle boolean values (checkboxes)
      if (typeof value === 'boolean') {
        return [key, value ? 'yes' : 'no'];
      }
      // Handle null/undefined
      if (value === null || value === undefined) {
        return [key, ''];
      }
      // Convert to string
      return [key, String(value)];
    })
  );

  // Add honeypot field to prevent spam (Netlify automatically checks this)
  formValues['bot-field'] = '';

  try {
    // Submit to Netlify Forms
    return fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        'form-name': formName,
        ...formValues
      }).toString()
    });
  } catch (error) {
    console.error('Error submitting form to Netlify:', error);
    throw error;
  }
}

/**
 * Checks if the current environment is a Netlify preview
 * @returns {boolean}
 */
export function isNetlifyPreview() {
  return typeof window !== 'undefined' && 
    window.location.hostname.includes('netlify.app');
} 