/** @jsx h */
/** @jsxFrag Fragment */
import { h } from 'preact';
import { tw } from '@twind';
import Navigation from '../../components/Navigation.tsx';
import { Handlers, PageProps } from '$fresh/server.ts';
import { Head, asset } from '$fresh/runtime.ts';
import { parseMarkdown, IMarkdown } from 'https://esm.sh/mrkdwny@0.7.2';

const savedPages: { [key: string]: IMarkdown } = {};

export const handler: Handlers<IMarkdown> = {
    async GET(_req, ctx) {
        const slug = ctx.params.slug;
        const url = new URL(`../../blog/${ctx.params.slug}.md`, import.meta.url);

        if (slug === '') {
            return new Response('', {
                status: 307,
                headers: { location: '/' },
            });
        }

        if (savedPages[slug] !== undefined && savedPages[slug] !== null) {
            const res = ctx.render(savedPages[slug]);

            return res;
        }

        try {
            const fileContent = await Deno.readTextFile(url);

            const { metadata, html } = parseMarkdown(fileContent, {
                elements: {
                    p: { class: 'text__flip' },
                    img: {
                        style: 'text-align: center; margin: auto; border-radius: 0.25rem;',
                    },
                    code: {
                        class: 'text__flip--reverse bg__flip',
                        style: 'border-radius: 1px; padding: 1rem; margin-top: 1rem; margin-bottom: 1rem;',
                    },
                    a: { class: 'text__flip' },
                    strong: { class: 'text__flip' },
                    em: { class: 'text__flip' },
                    h1: { class: 'text__flip' },
                    h2: { class: 'text__flip' },
                    h3: { class: 'text__flip' },
                    h4: { class: 'text__flip' },
                    h5: { class: 'text__flip' },
                    h6: { class: 'text__flip' },
                },
            });

            savedPages[slug] = {
                html,
                metadata,
            };

            const res = ctx.render({
                html,
                metadata,
            });

            return res;
        } catch (error) {
            return new Response('404 - Post not found', {
                status: 404,
            });
        }
    },
};

export default function BlogPost(props: PageProps<IMarkdown>) {
    return (
        <div class={tw`w-full container mx-auto py-6 px-6 lg:px-12 flex flex-col gap-12 text-[#101010]`}>
            <Head>
                <title>{props?.data?.metadata?.title?.toString() ?? 'Mads Hougesen | Software Developer'}</title>

                <meta
                    name='title'
                    content={props?.data?.metadata?.title?.toString() ?? 'Mads Hougesen | Software Developer'}
                />

                <meta
                    name='description'
                    content={
                        props?.data?.metadata?.description?.toString() ??
                        'Software developer from Denmark. Lover of all things programming - but  always learning new stuff.'
                    }
                />

                <meta property='og:type' content='website' />
                <meta property='og:url' content={'https://mhouge.dk/'} />
                <meta
                    property='og:title'
                    content={props?.data?.metadata?.title?.toString() ?? 'Mads Hougesen | Software Developer'}
                />
                <meta
                    property='og:description'
                    content={
                        props?.data?.metadata?.description?.toString() ??
                        'Software developer from Denmark. Lover of all things programming - but  always learning new stuff.'
                    }
                />
                <meta
                    property='og:image'
                    content={props?.data?.metadata?.image?.toString() ?? 'https://mhouge.dk/mads-hougesen-image.png'}
                />

                <meta property='twitter:card' content='summary_large_image' />
                <meta property='twitter:url' content={'https://mhouge.dk/'} />
                <meta
                    property='twitter:title'
                    content={props?.data?.metadata?.title?.toString() ?? 'Mads Hougesen | Software Developer'}
                />
                <meta
                    property='twitter:description'
                    content={
                        props?.data?.metadata?.description?.toString() ??
                        'Software developer from Denmark. Lover of all things programming - but  always learning new stuff.'
                    }
                />
                <meta
                    property='twitter:image'
                    content={props?.data?.metadata?.image?.toString() ?? 'https://mhouge.dk/mads-hougesen-image.png'}
                />

                <link rel='stylesheet' href={asset('/style.css')} />

                <link rel='preconnect' href='https://fonts.googleapis.com' />
                <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='true' />
                <link
                    href='https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700&family=Open+Sans&display=swap'
                    rel='stylesheet'
                />
            </Head>

            <Navigation />

            <article
                class={tw`prose lg:prose-lg mx-auto container`}
                dangerouslySetInnerHTML={{ __html: props?.data?.html }}
            ></article>
        </div>
    );
}
