/** @jsx h */
import { h } from 'preact';
import { Head } from '$fresh/runtime.ts';
import { asset } from '$fresh/runtime.ts';

interface HeadProps {
    title?: string;
    description?: string;
    image?: string;
    path?: string;
}

export default function SiteHead({ title, description, image, path }: HeadProps) {
    return (
        <Head>
            <title>{title ?? 'Mads Hougesen | Software Developer'}</title>

            <meta name='title' content={title ?? 'Mads Hougesen | Software Developer'} />

            <meta
                name='description'
                content={
                    description ??
                    'Software developer from Denmark. Lover of all things programming - but  always learning new stuff.'
                }
            />

            <meta property='og:type' content='website' />
            <meta property='og:url' content={path ?? 'https://mhouge.dk/'} />
            <meta property='og:title' content={title ?? 'Mads Hougesen | Software Developer'} />
            <meta
                property='og:description'
                content={
                    description ??
                    'Software developer from Denmark. Lover of all things programming - but  always learning new stuff.'
                }
            />
            <meta property='og:image' content={image ?? 'https://mhouge.dk/mads-hougesen-image.png'} />

            <meta property='twitter:card' content='summary_large_image' />
            <meta property='twitter:url' content={path ?? 'https://mhouge.dk/'} />
            <meta property='twitter:title' content={title ?? 'Mads Hougesen | Software Developer'} />
            <meta
                property='twitter:description'
                content={
                    description ??
                    'Software developer from Denmark. Lover of all things programming - but  always learning new stuff.'
                }
            />
            <meta property='twitter:image' content={image ?? 'https://mhouge.dk/mads-hougesen-image.png'} />

            <link rel='stylesheet' href={asset('/style.css')} />

            <link rel='preconnect' href='https://fonts.googleapis.com' />
            <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='true' />
            <link
                href='https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700&family=Open+Sans&display=swap'
                rel='stylesheet'
            />
        </Head>
    );
}
