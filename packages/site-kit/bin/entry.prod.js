const Entry = require("__webpack_entry__").default;
const { render } = require("react-dom");

window.onload = () => {
  render(
    do { Entry },
    document.getElementsByTagName("body")[0].appendChild(
      document.createElement("div")
    )
  )
}
