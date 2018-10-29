
/**
 * run test script in node 
 */

import Entries from '../../config/entries'

let entries = new Entries()

let entry = entries.getEntries()

let css = entries.getCssExtractPlugins()


let html = entries.getHtmlTplPlugins()
