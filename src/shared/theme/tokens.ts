// Changes will not be reflected live. Restart the watch/build process.
type colors = {
    lightBlue: string,
    paleLightBlue: string,
    green: string,
    gray: string,
    lightGray: string
};

// Switching modes is not supported, it's only dark mode for now.
const darkColors: colors = {
    lightBlue: '#0991E0',
    paleLightBlue: '#54ADE0',
    green: '#12c841',
    gray: 'rgb(30, 30, 30)',
    lightGray: '#ffffff1f'
};

export const tokens = {
    colors: darkColors,
    transitions: {
        fast: '150ms'
    },
    borders: {
        borderRadius: '4px'
    }
};
