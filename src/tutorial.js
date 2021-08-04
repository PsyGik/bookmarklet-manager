import { Accordion, Card } from 'react-bootstrap';

export const Tutorial = () => {
  return (
    <Card>
      <Card.Header as="h5">FAQs:</Card.Header>
      <Accordion flush>
        <Accordion.Item eventKey="0">
          <Accordion.Header>What do bookmarklets do?</Accordion.Header>
          <Accordion.Body>
            <span>
              A bookmarklet is a "one-click" tool which adds functionality to
              the browser, such as modifying the appearance of a web page,
              querying a search engine with search terms provided by previously
              selected text, or submitting the current page to a translation or
              blogging service.
            </span>
            <ul>
              <li>They do basic tasks on clicking.</li>
              <li>
                They are universal, i.e. they usually work on any browser, and
                whatever the platform, mobile or desktop.
              </li>
              <li>They are managed like any bookmarks.</li>
            </ul>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>How do I install a bookmarklet?</Accordion.Header>
          <Accordion.Body>
            <ul>
              <li>
                Drag the bookmarklet from the page to your Bookmarks Toolbar. It
                should appear on the toolbar.
              </li>
            </ul>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>How do I use a bookmarklet?</Accordion.Header>
          <Accordion.Body>
            <span>All you have to do is: </span>
            <ul>
              <li>
                Navigate to the page where you want your bookmarklet to apply
                to.
              </li>
              <li> Click the bookmarklet on your Bookmarks Toolbar. </li>
            </ul>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Card.Footer className="text-muted">
        <a href="https://support.mozilla.org/en-US/kb/bookmarklets-perform-common-web-page-tasks">
          More Info
        </a>
      </Card.Footer>
    </Card>
  );
};
