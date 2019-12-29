import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {Div100vh} from './Div100vh'

ReactDOM.render(
  <TestApp />,
  document.getElementById("root")
);

export function TestApp() {
  const { Wrapper, ToggleWrapper } = useWrapperType();

  return (
    <div>
      <Wrapper>
        <div style={{ flex: "auto" }}>
          <h1>The Div100vh component demo</h1>
          <h2>Toggle</h2>
          <ToggleWrapper />
          <h2>Details</h2>
          <p>If you use <code>{"<div style={{height: '100vh'}}>"}</code>, mobile browsers will likely cover the bottom of the page with navigation panel. <code>Div100vh</code> React component helps to avoid the issue.</p>
          <p>There could also be issues with input fields related to virtual keyboard popping up, so here's an input field for a test. Focus on it, then an un-focus:
          <input
            placeholder="Try me"
            // https://stackoverflow.com/q/2989263/5274538
            style={{ fontSize: "16px" , marginLeft: '1rem', padding: '0.5rem'}}
          />
          </p>
        </div>
        <ElementAtRiskExample />
      </Wrapper>
      <BelowTheFold />
    </div>
  );
}

const RegularDiv: React.FC = ({ children }) => (
  <div style={{ height: "50vh", display: "flex", flexDirection: "column" }}>
    {children}
  </div>
);

// Yields Div100vh or a regular div (to use as a wrapper later in TestApp), and the Toggle component to toggle between the two
function useWrapperType() {
  const [wrapperType, setWrapperType] = useState<"a regular div with height 100vh" | "Div100vh component">(
    "Div100vh component"
  );
  const Wrapper = wrapperType === "Div100vh component" ? Div100vh : RegularDiv;
  const otherWrapperType =
    wrapperType === "Div100vh component" ? "a regular div with height 100vh" : "Div100vh component";

  function toggle() {
    setWrapperType(otherWrapperType);
  }

  const ToggleWrapper: React.FC = () => (
    <p>
      You are currently testing <i>{wrapperType}</i>. <span onClick={toggle} style={{ cursor: "pointer", color: "red" }}>Click here</span> to try <i>{otherWrapperType}</i>.
    </p>
  );
  return { Wrapper, ToggleWrapper };
}

function ElementAtRiskExample() {
  return <div data-e2e-id="element-at-risk" style={{textAlign: 'center'}}><button style={{backgroundColor: 'green', color: 'white', fontSize: 18, borderRadius: '5px', border: 'none', padding: '0.5rem'}}>an example of important UI element *</button></div>
}

function BelowTheFold() {
  return <div style={{backgroundColor: 'white', padding: '1rem'}}>
  * Chances are this button was cropped or rendered completely covered. BTW, this element should be completely below the fold when the page just loaded, it's here for testing purposes as well.
</div>
}