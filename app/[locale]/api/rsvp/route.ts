import axios from 'axios';

import { NextRequest, NextResponse } from 'next/server';

type Data = {
  userId: string;
  scheduleId: number;
  rsvp: string;
};

export async function POST(request: NextRequest) {
    const data: Data = await request.json();
    console.log(data.rsvp);

    return NextResponse.json({ success: true }, { status: 200 });
}
