/** @jsx h */
import { h } from 'preact';
import { tw } from '@twind';
import Navigation from '../components/Navigation.tsx';
import ProjectList from '../islands/ProjectList.tsx';
import Hero from '../islands/Hero.tsx';
import SiteHead from '../islands/SiteHead.tsx';
import Contact from '../components/Contact.tsx';
import { Handlers, PageProps } from '$fresh/server.ts';

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

export const handler: Handlers<User | null> = {
    async GET(_, ctx) {
        const resp = await fetch('https://api.github.com/graphql', {
            method: 'POST',
            headers: {
                // NOTE: Remember to set this
                authorization: `Bearer ${Deno.env.get('PERSONAL_ACCESS_TOKEN')} `,
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
        });

        const unparsedUser: UnparsedUser = await resp.json();

        const parsedUser = unparsedUser ? parseUserData(unparsedUser) : { projects: [] };

        if (!parsedUser?.projects) {
            parsedUser.projects = [];
        }

        parsedUser.projects.unshift({
            name: 'Strongr',
            description: 'Fitness tracker web app made using Nuxt (TypeScript), Express & MongoDB. ',
            languages: [
                {
                    color: '#41b883',
                    name: 'Vue',
                },
                {
                    color: '#f1e05a',
                    name: 'JavaScript',
                },
            ],
            homepageUrl: 'https://stron.gr/',
        });

        return ctx.render(parsedUser);
    },
};

export default function Home({ data }: PageProps<User>) {
    return (
        <div class={tw`w-full container mx-auto py-6 px-12 flex flex-col gap-12 text-[#101010]`}>
            <SiteHead />

            <Navigation />

            <Hero />

            <ProjectList projects={data.projects} />

            <Contact />
        </div>
    );
}
