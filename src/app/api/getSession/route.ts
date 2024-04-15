import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const nickname = request.nextUrl.searchParams.get("nickname")
  if (nickname == null) {
    return NextResponse.json({ id: 0 })
  }
  const supabase = createClient("https://yqeyhicubfxkflrnhlrt.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlxZXloaWN1YmZ4a2Zscm5obHJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc1NTE0NTksImV4cCI6MjAxMzEyNzQ1OX0.WcKiNUkPmeSl8Zf48oB2lU0Fl16X_4FZO5rujN_-W_0");
  const { data, error } = await supabase
    .from('authServReq')
    .select("*")
    .eq("nickname", nickname)
    .order('id', { ascending: false })

  if (data != null) {
    return NextResponse.json(data[0]);
  } else {
    return NextResponse.json({ id: 0 })
  }
}
