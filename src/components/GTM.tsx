'use client';

import Script from 'next/script'

export default function GTM({GTM_ID} : {GTM_ID: string}){

    return (
        <>
            <Script strategy="afterInteractive" 
                src={`https://www.googletagmanager.com/gtag/js?id=${GTM_ID}`}/>
            <Script id='google-analytics' strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('consent', 'default', {
                    'analytics_storage': 'denied'
                });
                
                gtag('config', '${GTM_ID}', {
                    page_path: window.location.pathname,
                });
                `,
                }}
            />
        </>
)}