import fileinclude from "gulp-file-include";
import webpHtmlNosvg from "gulp-webp-html-nosvg";
import versionNumber from "gulp-version-number";
//import pug from "gulp-pug";

export const html = () => {
    return app.gulp.src(app.path.src.html) // Копируем содержимое ОТСЮДА
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "HTML",
                message: "Error: <%= error.message %>"
            })
        ))
        .pipe(fileinclude()) // Обработка директив @@include в html-файлах
        // .pipe(pug({ // Вместо include'ов используем шаблонизатор Pug
        //     pretty: true, // Сжатие HTML файла
        //     verbose: true, // Показывать в терминале какой файл обработан
        // }))
        .pipe(app.plugins.replace(/@img\//g, 'img/')) // Обрабатываем пути изображений (Плагин Path autocomplete для VSC)
        .pipe( // Всё кроме svg, обрабатываем в webp (Имена файлов изображений не должны содержать пробелов)
            app.plugins.if(
                app.isBuild,
                webpHtmlNosvg()
            )
        )
        .pipe( // Версионирование css и js, чтобы избегать проблем с кэшированием 
            app.plugins.if(
                app.isBuild,
                versionNumber({
                    'value': '%DT%',
                    'append': {
                        'key': '_v',
                        'cover': 0,
                        'to': [
                            'css',
                            'js',
                        ]
                    },
                    'output': {
                        'file': 'gulp/version.json'
                    }
                })
            )
        )
        .pipe(app.gulp.dest(app.path.build.html)) // Копируем содержимое СЮДА
        .pipe(app.plugins.browsersync.stream()); // Browser sync обновляет страницу
}