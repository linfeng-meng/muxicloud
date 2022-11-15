// translate router.meta.title, be used in breadcrumb sidebar tagsview
import i18n from '@/lang'
import Cookies from 'js-cookie'

export function generateTitle(title) {
  const hasKey = this.$te(`route['${title}']`)

  if (hasKey) {
    // $t :this method from vue-i18n, inject in @/lang/index.js
    const translatedTitle = this.$t(`route['${title}']`)

    return translatedTitle
  }
  return title
}

export function translate (localeKey) {
  const locale = Cookies.get('language')
  const hasKey = i18n.te(`route['${localeKey}']`, locale)  // 使用i18n的 te 方法来检查是否能够匹配到对应键值
  const translatedStr = i18n.t(`route['${localeKey}']`) 
  if (hasKey) {
      return translatedStr
  }
  return localeKey
}

