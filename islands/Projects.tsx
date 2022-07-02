/** @jsx h */
import { h } from 'preact';
import { tw } from '@twind';
import { IProject } from '../routes/index.tsx';

function Project({ project }: { project: IProject }) {
    return (
        <section class={tw`w-full bg-white p-4 flex flex-col border border-solid border-[#101010]`}>
            <div class={tw`flex`}>
                <a href={project?.url ?? project?.homepageUrl} target='_blank' rel='noreferrer noopener'>
                    <h2 class={tw`text-xl font-semibold mb-1 lowercase`}>{project.name}</h2>
                </a>
            </div>

            <p class={tw`pb-2`}>{project.description}</p>

            <div class={tw`flex mt-auto`}>
                {project.languages.map((language) => (
                    <p
                        key={language.name}
                        class={tw`text-sm mr-2 rounded-sm	px-2 py-1 text-white`}
                        style={{
                            'background-color': language.color,
                        }}
                    >
                        {language.name}
                    </p>
                ))}
            </div>
        </section>
    );
}

export default function Projects({ projects }: { projects: IProject[] }) {
    return (
        <div>
            <h1 class={tw`uppercase text-4xl lg:text-5xl font-bold mb-4`}>Projects</h1>

            <div class={tw`grid grid-cols-1 lg:grid-cols-3 gap-8`}>
                {projects.map((project) => (
                    <Project project={project} />
                ))}
            </div>
        </div>
    );
}
