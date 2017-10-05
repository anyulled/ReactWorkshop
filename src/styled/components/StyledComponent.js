//@flow
import * as React from "react";
import styled from "styled-components";

const randomColor = (): string => `#${Math.random().toString(16).substr(-6)}`;

const Card = styled.div`
  padding: 20px;
  text-align: center;
  color: black;
  background-color: ${props => props.color}`;

const Container = styled.div`
  padding: 20px
`;

class StyledComponent extends React.Component<{}, { color: string }> {
    constructor() {
        super();
        this.state = {color: "skyblue"};
        this.handleRandomizeColor = this.handleRandomizeColor.bind(this);
    }

    handleRandomizeColor = (): void => {
        this.setState({color: randomColor()});
    };

    render(): React.Node {
        const {state: {color}} = this;
        return (
            <Container>
                <Card color={color}>
                    <input type={"button"} value={"Randomize Color"} onClick={this.handleRandomizeColor}/>
                </Card>
            </Container>
        );
    }
}

export default StyledComponent;
