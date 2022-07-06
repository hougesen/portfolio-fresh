import { IS_BROWSER } from '$fresh/runtime.ts';
import { Configuration, setup } from 'twind';
export * from 'twind';
import typography from 'https://esm.sh/@twind/typography@0.0.2';

export const config: Configuration = {
    darkMode: 'class',
    mode: 'silent',

    plugins: {
        ...typography({
            className: 'prose', // Defaults to 'prose'
        }),
    },
};

if (IS_BROWSER) setup(config);
