/** @jsx h */
import { h } from 'preact';
import { tw } from '@twind';
import { IProject } from '../routes/index.tsx';

export default function Project({ project }: { project: IProject }) {
    return (
        <div
            class={tw`w-full bg-[#f7f7f7] p-4 flex flex-col border-2 rounded border-solid border-[#101010] min-h-[12rem] dark:(border-[#f7f7f7]) project`}
        >
            <div class={tw`flex`}>
                <a href={project?.url ?? project?.homepageUrl} target='_blank' rel='noreferrer noopener'>
                    <h2 class={tw`text-xl font-semibold mb-1 lowercase text-[#101010]`}>{project.name}</h2>
                </a>
            </div>

            <p class={tw`pb-2 text-[#101010]`}>{project.description}</p>

            <div class={tw`flex mt-auto`}>
                {project.languages.map((language) => (
                    <div
                        class={tw`text-sm mr-2 rounded-sm px-2 py-1 /* text__flip--reverse */ bg__flip  `}
                        style={{
                            'background-color': language.color,
                        }}
                    >
                        <p
                            key={language.name}
                            style={{
                                color: '#fff',
                                textShadow: '4px 4px 8px ' + language.color,
                                //      color: language.color,
                                //   filter: 'brightness(10%)',
                                //    filter: 'invert(1) brightness(50%)',
                            }}
                        >
                            {language.name}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
