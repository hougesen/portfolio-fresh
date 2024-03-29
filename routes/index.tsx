/** @jsx h */
import { h } from 'preact';
import { tw } from '@twind';
import Navigation from '../components/Navigation.tsx';
import ProjectList from '../islands/ProjectList.tsx';
import Hero from '../islands/Hero.tsx';
import Contact from '../components/Contact.tsx';
import { Handlers, PageProps } from '$fresh/server.ts';
import { Head, asset } from '$fresh/runtime.ts';

interface UnparsedUser {
    data: {
        user: {
            pinnedItems: {
                nodes: {
                    name: string;
                    languages: {
                        nodes: {
                            name: string;
                            color: string;
                        }[];
                    };
                    description: string;
                    homepageUrl: string;
                    url: string;
                }[];
            };
        };
    };
}

export interface IProject {
    name: string;
    description: string;
    languages: {
        name: string;
        color: string;
    }[];
    url?: string;
    homepageUrl?: string;
}

export interface User {
    projects: IProject[];
}

const parseUserData = (unparsed: UnparsedUser): User => {
    return {
        projects:
            unparsed?.data?.user?.pinnedItems?.nodes?.map((n) => ({
                name: n?.name,
                description: n?.description,
                homepageUrl: n?.homepageUrl,
                url: n?.url,
                languages: n?.languages?.nodes ?? [],
            })) ?? [],
    };
};

let lastUpdatedProjects = new Date(0);
let userDate: User | null = null;

export const handler: Handlers<User | null> = {
    async GET(_, ctx) {
        if (userDate?.projects?.length && new Date().getTime() - lastUpdatedProjects.getTime() < 4 * 3600) {
            return ctx.render(userDate);
        }

        const resp = await fetch('https://api.github.com/graphql', {
            method: 'POST',
            headers: {
                // NOTE: Remember to set this
                authorization: `Bearer ${Deno.env.get('PERSONAL_ACCESS_TOKEN')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `
                    query GET_PROJECTS {
                        user(login: "Hougesen") {
                            pinnedItems(first: 6) {
                                nodes {
                                    ... on Repository {
                                        name
                                        languages(
                                            first: 3
                                            orderBy: { field: SIZE, direction: DESC }
                                        ) {
                                            nodes {
                                                color
                                                name
                                            }
                                        }
                                        description
                                        homepageUrl
                                        url
                                    }
                                }
                            }
                        }
                    }
                `,
            }),
        }).catch(() => undefined);

        const unparsedUser: UnparsedUser = resp ? await resp.json() : null;

        const parsedUser = unparsedUser ? parseUserData(unparsedUser) : { projects: [] };

        if (!parsedUser?.projects) {
            parsedUser.projects = [];
        }

        lastUpdatedProjects = new Date();
        userDate = parsedUser;

        return ctx.render(parsedUser);
    },
};

export default function Home({ data }: PageProps<User>) {
    return (
        <div class={tw`w-full container mx-auto py-6 px-12 flex flex-col gap-12 text-[#101010] !lowercase`}>
            <Head>
                <title>{'Mads Hougesen | Software Developer'}</title>

                <meta name='title' content={'Mads Hougesen | Software Developer'} />

                <meta
                    name='description'
                    content={
                        'Software developer from Denmark. Lover of all things programming - but  always learning new stuff.'
                    }
                />

                <meta property='og:type' content='website' />
                <meta property='og:url' content={'https://mhouge.dk/'} />
                <meta property='og:title' content={'Mads Hougesen | Software Developer'} />
                <meta
                    property='og:description'
                    content={
                        'Software developer from Denmark. Lover of all things programming - but  always learning new stuff.'
                    }
                />
                <meta property='og:image' content={'https://mhouge.dk/mads-hougesen-image.png'} />

                <meta property='twitter:card' content='summary_large_image' />
                <meta property='twitter:url' content={'https://mhouge.dk/'} />
                <meta property='twitter:title' content={'Mads Hougesen | Software Developer'} />
                <meta
                    property='twitter:description'
                    content={
                        'Software developer from Denmark. Lover of all things programming - but  always learning new stuff.'
                    }
                />
                <meta property='twitter:image' content={'https://mhouge.dk/mads-hougesen-image.png'} />

                <link rel='stylesheet' href={asset('/style.css')} />

                <link rel='preconnect' href='https://fonts.googleapis.com' />
                <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='true' />
                <link
                    href='https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700&family=Open+Sans&display=swap'
                    rel='stylesheet'
                />

                <script async src='https://www.googletagmanager.com/gtag/js?id=UA-45233401-2'></script>
                <script>
                    {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}
gtag('js',new Date());gtag('config','UA-45233401-2')`}
                </script>
            </Head>

            <Navigation />

            <Hero />

            <ProjectList projects={data.projects} />

            <Contact />
        </div>
    );
}
