/** @jsx h */
import { h } from 'preact';
import { tw } from '@twind';
import { IProject } from '../routes/index.tsx';

function Project({ project }: { project: IProject }) {
    return (
        <section class={tw`w-full bg-white p-4 flex flex-col border border-solid border-[#101010] min-h-[12rem]`}>
            <div class={tw`flex`}>
                <a href={project?.url ?? project?.homepageUrl} target='_blank' rel='noreferrer noopener'>
                    <h2 class={tw`text-xl font-semibold mb-1 lowercase text-[#101010]`}>{project.name}</h2>
                </a>
            </div>

            <p class={tw`pb-2 text-[#101010]`}>{project.description}</p>

            <div class={tw`flex mt-auto`}>
                {project.languages.map((language) => (
                    <div
                        class={tw`text-sm mr-2 rounded-sm px-2 py-1 `}
                        style={{
                            'background-color': language.color,
                        }}
                    >
                        <p
                            key={language.name}
                            style={{
                                color: language.color,
                                filter: 'brightness(10%)',
                            }}
                        >
                            {language.name}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default function Projects({ projects }: { projects: IProject[] }) {
    return (
        <div>
            <h1 class={tw`uppercase text-4xl lg:text-5xl font-bold mb-4  text_flip`}>Projects</h1>

            <div class={tw`grid grid-cols-1 lg:grid-cols-3 gap-8`}>
                {projects.map((project) => (
                    <Project project={project} />
                ))}
            </div>
        </div>
    );
}
