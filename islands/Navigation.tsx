/** @jsx h */
import { h } from 'preact';
import { tw } from '@twind';

export default function Navigation() {
    return (
        <div class={tw`flex py-4`} style={{ filter: 'invert(1)' }}>
            <a href='/'>
                <img src='/logo.png' alt='Mads Hougesen Logo' />
            </a>
        </div>
    );
}
