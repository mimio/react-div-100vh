import React from "react";
import convertStyle from "./convertStyle";
import getWindowHeight from "./getWindowHeight";

class Div100vh extends React.Component {
  state = {
    style: {},
  };

  // On mount and window resize converts rvh values to px (if there are any).
  // Also, adds `height: 100rvh` if height is not specified at all
  updateStyle = () => {
    const convertedStyle = convertStyle(this.props.style, getWindowHeight());
    this.setState({ style: convertedStyle });
  };

  componentDidMount() {
    this.updateStyle();
    window.addEventListener("resize", this.updateStyle);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateStyle);
  }

  render() {
    const { as: Element, forwardedRef, ...props } = this.props;
    // previously this was <Element /> so you can specify what type of node to use
    // but I couldn't figure out how to get the ref to work properly with that syntax
    if (Element) {
      const style = props.style
        ? { ...this.state.style, ...props.style }
        : this.state.style;
      return <Element ref={forwardedRef} {...props} style={style} />;
    }
    return <div ref={forwardedRef} {...props} style={this.state.style} />;
  }
}

export default React.forwardRef((props, ref) => (
  <Div100vh forwardedRef={ref} {...props} />
));
