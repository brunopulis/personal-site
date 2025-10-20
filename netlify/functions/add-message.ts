import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error('Missing SUPABASE_URL or SUPABASE_ANON_KEY environment variables')
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Método não permitido' }
  }

  const { name, message } = JSON.parse(event.body)

  const { data, error } = await supabase
    .from('guestbook')
    .insert([{ name, message }])
    .select()

  if (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify(data[0]),
  }
}
