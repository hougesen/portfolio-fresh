import { parseMarkdown } from 'https://esm.sh/mrkdwny@0.7.2';
import { getBlogPosts } from './getBlogPosts.ts';

export interface BlogPostMetadata {
    slug: string;
    created: Date;
    [key: string]: string | Date | number;
}

async function generateBlogPostsFile() {
    const parsedPosts: BlogPostMetadata[] = [];

    const blogPosts = await getBlogPosts();

    for (let i = 0; i < blogPosts.length; i += 1) {
        try {
            const slug = blogPosts[i].loc.replace('/blog/', '');
            const { metadata } = parseMarkdown(await Deno.readTextFile(`.${blogPosts[i]?.loc}.md`));

            parsedPosts.push({
                slug,
                created: blogPosts[i].lastmod,
                updated: blogPosts[i].lastmod,
                ...metadata,
            });
        } catch (error) {
            console.error(`Error parsing ${blogPosts[i].loc}`, error);
        }
    }

    parsedPosts.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());

    await Deno.writeTextFile('./static/posts.json', JSON.stringify(parsedPosts));
}

generateBlogPostsFile();
