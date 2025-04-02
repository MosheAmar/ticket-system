const Mixpanel = require("mixpanel")
const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN
export const mp = Mixpanel.init(MIXPANEL_TOKEN, { autocapture: true })