import { Theme, useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './styles/vars.css'
import './styles/sponsors.css'

const theme: Theme = {
  ...DefaultTheme,
  // Layout() {
  //   return h(DefaultTheme.Layout, null, {
  //     'home-features-after': () => h(HomeSponsors),
  //     'aside-ads-before': () => h(AsideSponsors),
  //   })
  // },

  enhanceApp({ app }) {},

  // TODO: real date
  // setup() {
  //   const { lang } = useData()
  //   watchEffect(() => {
  //     if (typeof document !== 'undefined') {
  //       document.cookie = `nf_lang=${lang.value}; expires=Sun, 1 Jan 2023 00:00:00 UTC; path=/`
  //     }
  //   })
  // },
}

export default theme
