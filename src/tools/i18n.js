
import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
 
// 以下为语言包单独设置的场景，单独设置时语言包需单独引入
const messages = {
  'zh': require('../assets/i18n/zh'),   // 中文语言包
  'en': require('../assets/i18n/en'), // 英文语言包
  silentTranslationWarn: true   
}
 

// 最后 export default，这一步肯定要写的。
export default new VueI18n({
  locale : localStorage.getItem('lang')||'en', // set locale 默认显示英文
  messages : messages, // set locale messages
  silentTranslationWarn: true
})