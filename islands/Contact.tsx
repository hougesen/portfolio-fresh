/** @jsx h */
import { h } from 'preact';
import { tw } from 'twind';
import Icons from './Icons.tsx';

export default function Contact() {
    return (
        <section class={tw`pb-12 grid grid-cols-1 lg:grid-cols-2`}>
            <div class={tw`contact-text my-auto `}>
                <h1 class={tw`uppercase text-4xl lg:text-5xl font-bold mb-4`}>Wanna get in touch?</h1>

                <p class={tw`text-xl`}>I am always available for exciting discussions</p>

                <div class={tw`flex items-center gap-2 my-2`}>
                    <svg viewBox='0 0 512 384' xmlns='http://www.w3.org/2000/svg' width='20' height='100%'>
                        <path
                            d='M464 0c26.5 0 48 21.49 48 48 0 15.1-7.1 29.3-19.2 38.4L275.2 249.6a32.1 32.1 0 0 1-38.4 0L19.2 86.4C7.113 77.3 0 63.1 0 48 0 21.49 21.49 0 48 0h416ZM217.6 275.2a63.9 63.9 0 0 0 76.8 0L512 112v208c0 35.3-28.7 64-64 64H64c-35.35 0-64-28.7-64-64V112l217.6 163.2Z'
                            fill='currentColor'
                        />
                    </svg>

                    <a href='mailto:mads@mhouge.dk' class={tw`underline text-xl`}>
                        mads@mhouge.dk
                    </a>
                </div>

                <div class={tw`flex items-center gap-2 mb-4`}>
                    <svg viewBox='0 0 304 416' width='20' height='100%' xmlns='http://www.w3.org/2000/svg'>
                        <path
                            d='M152 .801C68.496.801.8 68.496.8 152.001c0 30.098 6.71 49.609 22.398 72.801l128.8 190.4 128.8-190.4c15.691-23.191 22.398-42.703 22.398-72.801 0-83.504-67.695-151.2-151.2-151.2H152Zm0 78.398c37.113 0 67.199 30.086 67.199 67.199S189.113 213.597 152 213.597s-67.199-30.086-67.199-67.199S114.887 79.199 152 79.199Z'
                            fill='currentColor'
                        />
                    </svg>

                    <p class={tw`text-xl`}>Odense, Danmark</p>
                </div>

                <Icons />
            </div>

            <div class={tw`ml-auto email-icon hidden lg:block`}>
                <svg viewBox='0 0 629 605' xmlns='http://www.w3.org/2000/svg' width='100%' height='100%'>
                    <path
                        d='m20 605 223-176 71 60 72-60 223 176H20ZM0 588V243l222 170L0 588Zm92-299-77-61 55-42V77h139L314 0l106 77h139v109l55 42-77 61V99H92v190Zm537-46L407 413l222 175V243Z'
                        fill='currentColor'
                    />
                </svg>
            </div>
        </section>
    );
}
