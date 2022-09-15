import del from 'del';
export const reset = () => {
    return del(app.path.clean);
    /* 
    Удаляет папку билда, 
    прежде чем закидывать туда новые файлы, 
    чтобы туда не попадали удаленные в src файлы
    */
}