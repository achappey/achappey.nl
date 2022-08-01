
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import nl from 'javascript-time-ago/locale/nl.json'

export const initTimeAgo = () => {
    TimeAgo.setDefaultLocale(en.locale)
    TimeAgo.addLocale(en)
    TimeAgo.addLocale(nl)
}

