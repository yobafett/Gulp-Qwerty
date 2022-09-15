export const copy = () => {
    return app.gulp.src(app.path.src.files) // Копируем содержимое ОТСЮДА
        .pipe(app.gulp.dest(app.path.build.files)) // Копируем содержимое СЮДА
}