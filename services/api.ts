import { WaitlistFormData } from '../types';
import { GOOGLE_SCRIPT_URL } from '../constants';

export const submitToGoogleSheet = async (data: WaitlistFormData): Promise<boolean> => {
  if (GOOGLE_SCRIPT_URL === 'INSERT_YOUR_GOOGLE_SCRIPT_URL_HERE') {
    console.warn('Google Script URL is not configured. Simulating success.');
    return new Promise((resolve) => setTimeout(() => resolve(true), 1000));
  }

  try {
    // We use 'no-cors' because Google Apps Script web apps do not support CORS preflight checks easily
    // This means the response will be opaque, but the POST request will succeed.
    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json', // Note: GAS often prefers text/plain to avoid preflight
      },
      // GAS `doPost(e)` parses `e.postData.contents`. 
      // Sometimes sending as text/plain ensures no OPTIONS request is made.
      body: JSON.stringify(data)
    });
    return true;
  } catch (error) {
    console.error('Error submitting form:', error);
    return false;
  }
};
