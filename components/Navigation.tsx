/** @jsx h */
import { h } from 'preact';
import { tw } from '@twind';

export default function Navigation() {
    return (
        <div class={tw`py-4 text__flip text-3xl`}>
            <a href='/'>mads hougesen</a>
        </div>
    );
}
