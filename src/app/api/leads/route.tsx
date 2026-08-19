import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const supabase = createRouteHandlerClient({ cookies });
  const data = await request.json();

  // Insert lead into database
  const { data: insertedLead, error } = await supabase
    .from('leads')
    .insert([{
      service: data.service,
      name: data.name,
      phone: data.phone,
      address: data.address,
      reference: data.reference,
      urgency: data.urgency,
      status: 'pending'
    }])
    .select()
    .single();

  if (error) {
    console.error('Error inserting lead:', error);
    return NextResponse.json({ error: 'Failed to submit lead' }, { status: 500 });
  }

  return NextResponse.json({ success: true, lead: insertedLead });
}
