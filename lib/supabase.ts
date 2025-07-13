import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fgdzbweqzsyfoaimrneg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZnZHpid2VxenN5Zm9haW1ybmVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIxNjMwMzMsImV4cCI6MjA2NzczOTAzM30.UZ27ty8ywU_mn-KNR_PtHy3xB5VJcIBzfIVb4iAkgEY';

export const supabase: SupabaseClient = createClient(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false, 
    },
  }
);
