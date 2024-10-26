import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    
    const response = await fetch('http://localhost:8000/analyze-emotion', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to analyze emotion' },
      { status: 500 }
    );
  }
}