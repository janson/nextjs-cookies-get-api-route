import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const COOKIE_NAME = '_api_route_cookie_';
const VALUES = ['control', 'variantA', 'variantB'] as const;

export const GET = async (): Promise<NextResponse> => {
  const cookieStore = cookies();
  console.log(cookieStore.getAll());
  const cookie = cookieStore.get(COOKIE_NAME);

  if (cookie) {
    console.log(`Value found in cookie: ${cookie.value}`);
    return NextResponse.json({ [COOKIE_NAME]: cookie.value });
  }

  console.log('Value not found in cookie.');
  const randomValue = VALUES[(Math.floor(Math.random() * VALUES.length))]
  console.log(`Selecting random value: ${randomValue}`);
  cookies().set(COOKIE_NAME, randomValue, {
    maxAge: 60 * 60 * 24 * 365, // 1 year
  });
  return NextResponse.json({ [COOKIE_NAME]: randomValue });
};

export const dynamic = 'force-dynamic';
