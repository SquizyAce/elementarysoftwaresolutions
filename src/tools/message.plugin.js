import M from 'materialize-css'
export default { // создания кастомного плагина используя метод toast из css materialize для вывода сообщения более удобнее
    install(Vue, options){
        Vue.prototype.$message = function(html) {
            M.toast({html})
        }
        
        Vue.prototype.$error = function(html) {
            M.toast({html: `Ошибка: ${html}`})
        }
    }
}