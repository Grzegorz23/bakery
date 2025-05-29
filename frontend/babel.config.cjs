module.exports = {
    presets: [
        '@babel/preset-env',
        '@babel/preset-typescript',
        ['@babel/preset-react', { runtime: 'automatic' }] // For JSX transform
    ],
    plugins: ['@babel/plugin-syntax-jsx']
};
