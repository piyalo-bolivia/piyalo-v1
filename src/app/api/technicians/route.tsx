import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  const supabase = createRouteHandlerClient({ cookies });
  const { searchParams } = new URL(request.url);
  
  const serviceId = searchParams.get('service');
  const zone = searchParams.get('zone');

  let query = supabase
    .from('technicians')
    .select(`
      id, 
      full_name, 
      specialty, 
      rating, 
      zones, 
      schedule, 
      description, 
      verified,
      technician_services!inner(service_id)
    `)
    .eq('status', 'approved')
    .order('rating', { ascending: false });

  if (serviceId) {
    query = query.eq('technician_services.service_id', serviceId);
  }

  if (zone) {
    query = query.contains('zones', [zone]);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching technicians:', error);
    return NextResponse.json({ error: 'Failed to fetch technicians' }, { status: 500 });
  }

  return NextResponse.json(data);
}
