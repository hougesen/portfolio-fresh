import type { SiteRoute } from './generateSitemap.ts';

let blogPosts: SiteRoute[] = [];

export async function getBlogPosts(): Promise<SiteRoute[]> {
    if (blogPosts?.length) {
        return blogPosts;
    }

    const posts: SiteRoute[] = [];

    const files = Deno.readDir('./blog');

    for await (const file of files) {
        if (file?.isFile && file?.name?.includes('.md')) {
            const fileStats = await Deno.stat(`./blog/${file.name}`);

            posts.push({
                loc: `/blog/${file.name.replace('.md', '')}`,
                lastmod: fileStats?.mtime ?? new Date(),
            });
        }
    }

    blogPosts = posts;

    return blogPosts;
}
