import axios from 'axios';

import { NextRequest, NextResponse } from 'next/server';

type Data = {
  userId: string;
  scheduleId: number;
  rsvp: string;
};

export async function POST(request: NextRequest) {
  try {
    const requestInfo: Data = await request.json();

    const { data } = await axios.get(
      'https://scd.sos.org/api/SLI/updateRSVP?userId=' +
        requestInfo.userId +
        '&scheduleId=' +
        requestInfo.scheduleId +
        '&rsvp=' +
        requestInfo.rsvp,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in /api/rsvp:', error);
    return NextResponse.json(
      { error: 'Failed to update rsvp info' },
      { status: 500 },
    );
  }
}
