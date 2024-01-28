import EmailTemplate from '../../../../components/email-template'
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import * as React from 'react';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request:NextRequest) {
  try {
    const body = await request.json()
    const {email,name,message} = body

    const { data, error } = await resend.emails.send({
      from: 'Web Mail<web-mail@s-soumyakanta.com>',
      to: ['mr.ssoumyakanta@gmail.com'],
      subject: "Mail From Website - s-soumyakanta.com",
      react: EmailTemplate({ name:name ,email:email, message:message}) as React.ReactElement,
    });

    if (error) {
      return NextResponse.json({ error });
    }

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error });
  }
}