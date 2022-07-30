
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import nl from 'javascript-time-ago/locale/nl.json'

export const initTimeAgo = () => {
    TimeAgo.addDefaultLocale(en)
    TimeAgo.addLocale(nl)
}

