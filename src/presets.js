import { FloatingLabel, Form } from 'react-bootstrap';

const PRESETS = [
  {
    id: 0,
    label: 'Substitutions',
    code: `document.body.innerHTML = document.body.innerHTML.replace(/bookmarklet/g, 'awesome bookmarklet');`
  },
  {
    id: 1,
    label: 'Custom Search Engine',
    code: `window.location='http://www.google.com/search?q='+window.getSelection()`
  },
  {
    id: 2,
    label: 'Clear Site Data',
    code: `localStorage.clear();
sessionStorage.clear();
var c = document.cookie.split("; "); 
for (i in c) { 
document.cookie =/^[^=]+/.exec(c[i])[0]+"=;expires=Thu, 01 Jan 1970 00:00:00 GMT"; 
};`
  },
  {
    id: 3,
    label: 'Highlight all elements in div',
    code: `let style = document.createElement("style");
document.head.appendChild(style);
let sheet = style.sheet;
sheet.insertRule("div { outline: 1px dotted red !important; }", 0);`
  },
  {
    id: 4,
    label: 'Zap Styles',
    code: `var i, x;
for (i = 0; (x = document.styleSheets[i]); ++i) x.disabled = true;`
  },
  {
    id: 5,
    label: 'Show class count with tags',
    code: `var anchor = {},
    classes = [],
    i,
    element,
    elementClass,
    k,
    doc,
    result =
            "<table border=1><thead><tr><th>#</th><th>Tag</th><th>className</th></tr></thead>";
for (i = 0; (element = document.getElementsByTagName("*")[i]); ++i)
if ((elementClass = element.className)) {
  k = element.tagName + "." + elementClass;
  anchor[k] = anchor[k] ? anchor[k] + 1 : 1;
}
for (k in anchor) classes.push([k, anchor[k]]);
classes.sort();
for (i in classes)
result +=
       "<tr><td>" +
       classes[i][1] +
       "</td><td>" +
       classes[i][0].split(".").join("</td><td>") +
       "</td></tr>";
result += "</table>";
doc = open().document;
doc.write(result);
doc.close();`
  }
];
export const Presets = ({ setPreset }) => {
  const onPresetSelected = (event) => {
    const id = event.target.value;
    if (id) setPreset(PRESETS[id].code);
  };

  return (
    <FloatingLabel
      controlId="floatingSelect"
      label="Pick an existing bookmarklet">
      <Form.Select
        aria-label="Floating label select example"
        onChange={onPresetSelected}>
        <option>Select Preset</option>
        {PRESETS.map((preset) => (
          <option key={preset.id} value={preset.id}>
            {preset.label}
          </option>
        ))}
      </Form.Select>
    </FloatingLabel>
  );
};
