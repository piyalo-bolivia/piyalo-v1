import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const supabase = createRouteHandlerClient({ cookies });
  const data = await request.json();

  const { email, password, user_metadata } = data;

  const { data: signUpData, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: user_metadata
    }
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(signUpData);
}
