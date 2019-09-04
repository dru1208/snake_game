import { fromEvent, interval, empty } from "rxjs"

const keyDown$ = fromEvent(document, "keydown")
const ticker$ = interval(600)
const end$ = empty()

export { keyDown$, ticker$, end$ }