import { createClient } from "@supabase/supabase-js";


const Url = 'https://hvzrbfjvsheuvxnrvpcv.supabase.co'
const Key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2enJiZmp2c2hldXZ4bnJ2cGN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg3NjUyMDEsImV4cCI6MjAzNDM0MTIwMX0.gGyu7oZqojf2vvilHsNXZtAKotjO2OChAx6UTq61IjI'


export const Supabase = createClient(
    Url,
    Key
)