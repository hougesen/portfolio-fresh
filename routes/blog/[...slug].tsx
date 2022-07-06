/** @jsx h */
/** @jsxFrag Fragment */
import { h } from 'preact';
import { tw } from '@twind';
import Navigation from '../../components/Navigation.tsx';
import { Handlers, PageProps } from '$fresh/server.ts';
import SiteHead from '../../islands/SiteHead.tsx';
import { parseMarkdown, IMarkdown } from 'https://esm.sh/mrkdwny@latest';

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

            const { metadata, html } = parseMarkdown(fileContent);

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
            <SiteHead />

            <Navigation />

            <article
                class={tw`prose lg:prose-lg mx-auto container`}
                dangerouslySetInnerHTML={{ __html: props?.data?.html }}
            ></article>
        </div>
    );
}
