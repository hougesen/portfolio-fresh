import { getBlogPosts } from './getBlogPosts.ts';
export interface SiteRoute {
    loc: string;
    lastmod: Date;
}
async function generateSitemap() {
    const baseDomain = 'https://mhouge.dk';

    const routes: SiteRoute[] = [];

    routes.push({
        loc: '/',
        lastmod: new Date(),
    });

    routes.push(...(await getBlogPosts()));

    let xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
    let textSitemap = '';

    for (let i = 0; i < routes.length; i += 1) {
        textSitemap += baseDomain + routes[i].loc + '\n';

        xml += `<url><loc>${baseDomain + routes[i].loc}</loc><lastmod>${
            routes[i]?.lastmod?.toISOString() ?? new Date()?.toISOString()
        }</lastmod></url>`;
    }

    xml += '</urlset>';

    await Deno.writeTextFile(`./static/sitemap.xml`, xml).catch((error) =>
        console.error('Error creating sitemap.xml', error)
    );

    await Deno.writeTextFile(`./static/urllist.txt`, textSitemap).catch((error) =>
        console.error('Error creating urllist.txt', error)
    );
}

generateSitemap();
