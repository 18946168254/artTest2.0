import { MessageBox, Indicator } from 'mint-ui'

export const Confirm = function (str, suc) {
  MessageBox.confirm(str).then(suc)
}
export const Loading = {
  open: () => Indicator.open(),
  close: () => Indicator.close()
}
