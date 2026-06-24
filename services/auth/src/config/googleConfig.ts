

import { google } from "googleapis";

const GOOGLE_CLIENT_ID = '782402135436-gfmqhiu01bnc30ns6b2eq0a9m0r34dv1.apps.googleusercontent.com';
const GOOGLE_SECRET = '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';
const FRONTEND_URL = 'http://localhost:5173'; // adjust to your frontend URL

export const oauth2client=new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_SECRET,
    "postmessage"
);
