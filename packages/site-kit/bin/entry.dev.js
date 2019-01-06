import { render } from "react-dom";
import { hot } from "react-hot-loader";
import Entry from "__webpack_entry__";

const HotStuff = hot(module)(Entry);

window.onload = () => {
  render(
    do { HotStuff },
    document.getElementsByTagName("body")[0].appendChild(
      document.createElement("div")
    )
  )
}
