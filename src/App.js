import { useCallback, useEffect, useState } from 'react';
import { Button, Card, Alert, Container, Row, Col } from 'react-bootstrap';
import './styles.css';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css'; //Example style, you can use another
import { Checkbox } from './checkbox';
const { minify } = require('terser');
import { TERSER_CONFIG, SPECIAL_CHARACTERS } from './configs';
import { Copier } from './copier';
import { ForkMe } from './fork-me';
import { Tutorial } from './tutorial';
import { Presets } from './presets';

const style = {
  fontFamily: '"Fira code", "Fira Mono", monospace'
};

const sampleCode = `let style = document.createElement("style");
document.head.appendChild(style);
let sheet = style.sheet;
sheet.insertRule("h1 { color:blue }", 0);`;

export default function App() {
  const [code, setCode] = useState(sampleCode);
  const [generatedCode, setGeneratedCode] = useState('');
  const [options, setOptions] = useState({
    encode: false,
    iife: true,
    minify: true
  });

  const updateOption = (type, enable) => {
    setOptions({ ...options, [type]: enable });
  };

  const encode = (minified) => {
    let minifiedCode = '';
    SPECIAL_CHARACTERS.forEach(function (char) {
      let charRegex = new RegExp(char, 'g');
      minifiedCode = minified.replace(
        charRegex,
        encodeURIComponent(char.replace(/\\/g, ''))
      );
    });
    return minifiedCode;
  };

  const generate = useCallback(async () => {
    let minifiedCode = code;
    try {
      // Step 2: Minify/Uglify Code
      if (options.minify)
        minifiedCode = (await minify(minifiedCode, TERSER_CONFIG)).code;
      // Step 2: Wrap in IIFE
      if (options.iife) minifiedCode = `(function(){${minifiedCode}})()`;
      // Step 3: Encode Special Characters
      if (options.encode) minifiedCode = encode(minifiedCode);
      // Step 4: Wrap in `javascript:`
      minifiedCode = `javascript:${minifiedCode}`;
      setGeneratedCode(minifiedCode);
    } catch (error) {
      console.error(error);
      setGeneratedCode(`// Failed to generate
      Line ${error.line.toLocaleString()}: ${error.message}`);
    }
  }, [code, options.encode, options.iife, options.minify]);

  return (
    <Container fluid="md">
      <ForkMe />
      <h1 className="text-center title">Bookmarklet Generator</h1>
      <Col>
        <section>
          <Card>
            <Card.Header as="h5">Options:</Card.Header>
            <Card.Body>
              <Checkbox
                label={`URL-encode reserved characters: [space], %, ", <, >, #, @, &, ?`}
                type="encode"
                checked={options.encode}
                onChecked={updateOption}
              />
              <Checkbox
                label="Isolate within an unnamed function (anonymizing function, IIFE, immediately-invoked function expression)."
                type="iife"
                checked={options.iife}
                onChecked={updateOption}
              />
              <Checkbox
                label="Minify using Terser"
                type="minify"
                checked={options.minify}
                onChecked={updateOption}
              />
            </Card.Body>
            <Card.Footer className="text-muted">
              <Presets setPreset={setCode} />
            </Card.Footer>
          </Card>
        </section>
      </Col>
      <Row>
        <Col lg={true}>
          <section>
            <Card>
              <Card.Header as="h5">Input JavaScript:</Card.Header>
              <Card.Body>
                <Alert variant="info">
                  Enter your JavaScript below and Click on Generate Bookmarklet.
                </Alert>

                <Editor
                  textareaClassName="code-container"
                  preClassName="code-container"
                  value={code}
                  onValueChange={(code) => setCode(code)}
                  highlight={(code) => highlight(code, languages.js)}
                  padding={10}
                  style={style}
                />
              </Card.Body>
              <Card.Footer className="text-muted">
                <Button variant="primary" onClick={generate}>
                  Generate Bookmarklet
                </Button>
              </Card.Footer>
            </Card>
          </section>
        </Col>
        <Col lg={true}>
          <section>
            <Card>
              <Card.Header as="h5">Output Preview:</Card.Header>
              <Card.Body>
                <Editor
                  textareaClassName="code-container code-preview"
                  preClassName="code-container code-preview"
                  value={generatedCode}
                  readOnly={true}
                  highlight={(code) => highlight(code, languages.js)}
                  padding={10}
                  style={style}
                />
              </Card.Body>
              <Card.Footer className="text-muted">
                <Copier code={generatedCode} />
              </Card.Footer>
              <Card.Footer className="text-muted">
                {generatedCode && (
                  <a variant="link" href={generatedCode}>
                    Click to test OR Drag to your Bookmarks Bar
                  </a>
                )}
              </Card.Footer>
            </Card>
          </section>
        </Col>
      </Row>
      <section>
        <Tutorial />
      </section>
    </Container>
  );
}
