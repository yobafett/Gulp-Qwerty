// Основной модуль Gulp
import gulp from 'gulp';
// Импорт путей 
import { path } from './gulp/config/path.js';
// Импорт общих плагинов
import { plugins } from './gulp/config/plugins.js';

// Передаем значения в глобальную переменную
global.app = {
    isBuild: process.argv.includes('--build'),
    isDev: !process.argv.includes('--build'),
    path: path,
    gulp: gulp,
    plugins: plugins,
}

// Импорт задач
import { copy } from './gulp/tasks/copy.js';
import { reset } from './gulp/tasks/reset.js';
import { html } from './gulp/tasks/html.js';
import { server } from './gulp/tasks/server.js';
import { scss } from './gulp/tasks/scss.js';
import { js } from './gulp/tasks/js.js';
import { images } from './gulp/tasks/images.js';
import { otfToTtf, ttfToWoff, fontsStyle } from "./gulp/tasks/fonts.js";
import { svgSprive } from "./gulp/tasks/svgSprive.js";
import { zip } from "./gulp/tasks/zip.js";
import { ftp } from "./gulp/tasks/ftp.js";

// Наблюдатель за изменениями в файлах
function watcher() {
    gulp.watch(path.watch.files, copy);
    gulp.watch(path.watch.html, html);
    gulp.watch(path.watch.scss, scss);
    gulp.watch(path.watch.js, js);
    gulp.watch(path.watch.images, images);
}

// Спрайт лист из svg иконок (Запускается отдельно)
export { svgSprive };

// Последовательные задачи, для которых важен порядок
const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);

// Параллельные задачи, для которых не важна очередность выполнения
const mainTasks = gulp.parallel(copy, html, scss, js, images);
const watchingTasks = gulp.parallel(watcher, server);

// Построение сценария выполнения задач
const dev = gulp.series(reset, fonts, mainTasks, watchingTasks);
const build = gulp.series(reset, mainTasks);
const deployZIP = gulp.series(reset, mainTasks, zip);
const deployFTP = gulp.series(reset, mainTasks, ftp);

// Экспорт сценариев
export { dev };
export { build };
export { deployZIP }; // Не делает архив, нужно разобраться
export { deployFTP }; // Не тестировалось

// Выполнение задачи по-умолчанию
gulp.task('default', dev);