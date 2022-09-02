import {createClient} from "@supabase/supabase-js";

const supabaseUrl = "https://aedfqiauonnulefjeeql.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFlZGZxaWF1b25udWxlZmplZXFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTA3MDI2MjYsImV4cCI6MTk2NjI3ODYyNn0.qPnWC-hOtpE6xL1TV5Q7-FtWinPC2PjJfc7mJEuBu_s";
const supabase =  createClient(supabaseUrl,supabaseAnonKey);

export {supabase};