import moment from 'moment'

moment.locale('zh-cn');

function commonHandle(date, format) {
    if (date) {
        return moment(date).format(format)
    }
    return ''
}

/**
 * 2020年1月7日 22:52
 * @param o
 * @returns {*|string}
 */
export function dateFormat_lll(o) {
    return commonHandle(o, 'lll')
}