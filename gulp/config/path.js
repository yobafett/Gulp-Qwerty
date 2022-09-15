// Получаем имя папки проекта
import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve());

const buldFolder = './dist';
const srcFolder = './src';

export const path = {
    build: { // Куда билдим
        js: `${buldFolder}/js/`,
        css: `${buldFolder}/css/`,
        html: `${buldFolder}/`,
        images: `${buldFolder}/img/`,
        fonts: `${buldFolder}/fonts/`,
        files: `${buldFolder}/files/`, // Так же можно использовать rootFolder
    },
    src: { // Откуда билдим
        js: `${srcFolder}/js/app.js`,
        images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp}`,
        svg: `${srcFolder}/img/**/*.svg`,
        scss: `${srcFolder}/scss/style.scss`,
        html: `${srcFolder}/*.html`, //.pug
        files: `${srcFolder}/files/**/*.*`,
        svgicons: `${srcFolder}/svgicons/*.svg`,
    },
    watch: { // Какие папки мониторим 
        js: `${srcFolder}/js/**/*.js`,
        scss: `${srcFolder}/scss/**/*.scss`,
        html: `${srcFolder}/**/*.html`, //.pug
        images: `${srcFolder}/img/**/*.{jpg,jpeg,png,svg,gif,ico,webp}`,
        files: `${srcFolder}/files/**/*.*`,
    },
    clean: buldFolder,
    buldFolder: buldFolder,
    srcFolder: srcFolder,
    rootFolder: rootFolder,
    ftp: 'test', // remote ftp folder
};