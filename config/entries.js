import glob from 'glob'
import HtmlWebpackPlugin from 'html-webpack-plugin'

function fnUtils(arr, callback) {
    for (let i = arr.length; i > 0; i--) {
        callback.call(this, arr[i - 1])
    }
}

export default class Entries {
    constructor() {
        this.entriesPath = [
            './src/static/js/*.js'
        ]
        this.htmlPath = [
            './src/view/page/*.html'
        ]
    }
    // 根据需要解析的入口路径生成webpack entry配置
    getEntries() {
        const entries = {}
        let entryName
        fnUtils(this.entriesPath, (path) => {
            glob.sync(path).forEach((filePath) => {
                const arr = filePath.split('/');
                const fileName = arr[4];
                entryName = fileName.split('.')[0];
                entries[entryName] = filePath;
            })
        })
        return entries
    }

    // 根据需要解析的模板路径得到对应plugin实例数组
    getHtmlTplPlugins() {
        const htmlTpls = []
        let entryName
        fnUtils(this.htmlPath, (path) => {
            glob.sync(path).forEach((filePath) => {
                const arr = filePath.split('/');
                const fileName = arr[4];
                entryName = fileName.split('.')[0];
                htmlTpls.push(new HtmlWebpackPlugin( {
                    template: filePath,
                    filename: 'view/' + entryName + '.html',
                    inject: true,
                    hash: false,
                    chunksSortMode: 'manual',
                    chunks: [entryName]
                }))
            })
        })
        return htmlTpls
    }
}
