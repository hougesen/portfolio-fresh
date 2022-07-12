import type { SiteRoute } from './generateSitemap.ts';

let blogPosts: SiteRoute[] = [];

export async function getBlogPost(): Promise<SiteRoute[]> {
    if (blogPosts?.length) {
        return blogPosts;
    }

    const posts: SiteRoute[] = [];

    const files = Deno.readDir('./blog');

    for await (const file of files) {
        console.log({ file });
        if (file?.isFile && file?.name?.includes('.md')) {
            const fileStats = await Deno.stat(`./blog/${file.name}`);

            posts.push({
                loc: `/blog/${file.name.replace('.md', '')}`,
                lastmod: fileStats?.mtime ?? new Date(),
            });

            console.log('inside if ', posts);
        }
    }

    blogPosts = posts;
    console.log('getBlogPosts', blogPosts);
    return blogPosts;
}
