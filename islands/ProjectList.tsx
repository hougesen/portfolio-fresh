/** @jsx h */
import { h } from 'preact';
import { tw } from '@twind';
import { IProject } from '../routes/index.tsx';
import Project from './Project.tsx';

export default function ProjectList({ projects }: { projects: IProject[] }) {
    return (
        <section>
            <h1 class={tw`lowercase text-4xl lg:text-5xl font-bold mb-4  text__flip`}>Projects</h1>

            <div class={tw`grid grid-cols-1 lg:grid-cols-3 gap-8`}>
                {projects.map((project) => (
                    <Project project={project} />
                ))}
            </div>
        </section>
    );
}
