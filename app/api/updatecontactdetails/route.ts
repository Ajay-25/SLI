// app/api/updatecontactdetails/route.ts
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { data } = await axios.post(
      'https://scd.sos.org/api/SLI/updateSevadarSLIContactInfo',
      body,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in /api/updatecontactdetails:', error);
    return NextResponse.json(
      { error: 'Failed to update contact info' },
      { status: 500 }
    );
  }
}
