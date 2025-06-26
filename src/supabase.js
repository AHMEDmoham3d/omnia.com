// src/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mldvuzkrcjnltzgwtpfc.supabase.co'; // استبدله بالرابط بتاعك لو مختلف
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1sZHZ1emtyY2pubHR6Z3d0cGZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA5Mjg4MjYsImV4cCI6MjA2NjUwNDgyNn0.idcUACM1z8IPkYdpV-oT_R1jZexmC25W7IMZaFvooUc'; // دا الـ anon key بتاعك

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
