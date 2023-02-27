/** @jsx h */
import { h } from 'preact';
import { tw } from '@twind';
import { getBlogPosts } from '../utils/getBlogPosts.ts';
import type { SiteRoute } from '../utils/generateSitemap.ts';
import type { BlogPostMetadata } from '../utils/generateBlogPostsFile.ts';
import unslugText from '../utils/unslugText.ts';

function BlogPost({ post }: { post: BlogPostMetadata }) {
    return (
        <div className={tw`bg-red-200  `}>
            <h2 className={tw`text-xl`}>{post?.title ?? unslugText(post?.slug)}</h2>

            {JSON.stringify(post)}
        </div>
    );
}

export default function BlogPostList({ posts }: { posts: BlogPostMetadata[] }) {
    return (
        <div>
            {posts.map((p) => (
                <BlogPost post={p} />
            ))}
        </div>
    );
}
