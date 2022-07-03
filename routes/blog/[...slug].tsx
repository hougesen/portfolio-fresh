/** @jsx h */
/** @jsxFrag Fragment */
import { h } from 'preact';
import { tw } from '@twind';
import Navigation from '../../components/Navigation.tsx';
import { Handlers, PageProps } from '$fresh/server.ts';
import SiteHead from '../../islands/SiteHead.tsx';
import { parseMarkdown, IArticle } from '../../utils/parseMarkdown.tsx';

export const handler: Handlers<IArticle> = {
    async GET(_req, ctx) {
        const slug = ctx.params.slug;
        const url = new URL(`../../blog/${ctx.params.slug}.md`, import.meta.url);

        if (slug === '') {
            return new Response('', {
                status: 307,
                headers: { location: '/' },
            });
        }

        try {
            const fileContent = await Deno.readTextFile(url);

            const { metadata, article } = parseMarkdown(fileContent);

            const res = ctx.render({
                article,
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

export default function Article(props: PageProps<IArticle>) {
    return (
        <div class={tw`w-full container mx-auto py-6 px-6 lg:px-12 flex flex-col gap-12 text-[#101010]`}>
            <SiteHead
                title={
                    props?.data?.metadata?.title
                        ? props?.data?.metadata?.title + ' | Mads Hougesen'
                        : 'Mads Hougesen | Software Developer'
                }
            />

            <Navigation />

            <article class={tw`prose`}>{props.data.article}</article>
        </div>
    );
}
