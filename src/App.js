import React, { Component } from "react";
import {
  Button,
  Menu,
  Dropdown,
  Segment,
  Form,
  Header,
  Input
} from "semantic-ui-react";

import sagemath from "./providers/sagemath";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hillMatrixLength: 3,
      hillMatrix: "[1,0,1],[0,1,1],[2,2,3]",
      hillClearText: "LAMAISONBLANCHE",
      hillResult: "",
      vigenereClearText: "THECATINTHEHAT",
      vigenereKey: "ABCDEFGHIJKLMN",
      vigenereKeyLength: 14,
      vigenereResult: ""
    };
  }

  onHillCipherClick = async () => {
    const code = `S = AlphabeticStrings()\nE = HillCryptosystem(S,${
      this.state.hillMatrixLength
    })\nR = IntegerModRing(26)\nM = MatrixSpace(R,${
      this.state.hillMatrixLength
    },${this.state.hillMatrixLength})\nA = M([${
      this.state.hillMatrix
    }])\ne = E(A)\nresult=e(S('${this.state.hillClearText}'))\nprint(result)`;
    console.log(code);
    const response = await sagemath.post(
      `/service?code=${encodeURIComponent(code)}`
    );
    this.setState({ hillResult: response.data.stdout });
    console.log(response.data.stdout);
  };

  onVigenereCipherClick = async () => {
    const code = `S = AlphabeticStrings()\nE = VigenereCryptosystem(S,${
      this.state.vigenereKeyLength
    })\nK = S('${this.state.vigenereKey}' )\ne = E(K)\nresult=e(S('${
      this.state.vigenereClearText
    }'))\nprint(result)`;
    console.log(code);
    const response = await sagemath.post(
      `/service?code=${encodeURIComponent(code)}`
    );
    this.setState({ vigenereResult: response.data.stdout });
    console.log(response.data.stdout);
  };

  render() {
    return (
      <div className="App">
        <Menu color="blue" inverted size="large">
          <Menu.Item name="sagemath" onClick={this.handleItemClick} />

          <Menu.Menu position="right">
            <Dropdown item text="Cipher">
              <Dropdown.Menu>
                <Dropdown.Item>Hill</Dropdown.Item>
                <Dropdown.Item>Vigenere</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Menu>
        </Menu>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Segment style={{ flex: "0.3" }} raised>
            <Header>Hill Cipher</Header>
            <Form>
              <Form.Field>
                <label>Clear text</label>
                <Input
                  onChange={e =>
                    this.setState({ hillClearText: e.target.value })
                  }
                  fluid
                  placeholder="e.g. EXAMPLETEXT"
                />
              </Form.Field>
              <Form.Field>
                <label>Square matrix length</label>
                <Input
                  onChange={e =>
                    this.setState({ hillMatrixLength: e.target.value })
                  }
                  fluid
                  placeholder="e.g. 2"
                />
              </Form.Field>
              <Form.Field>
                <label>Matrix</label>
                <Input
                  onChange={e => this.setState({ hillMatrix: e.target.value })}
                  fluid
                  placeholder="e.g. [1,1],[2,3]"
                />
              </Form.Field>
              <Button onClick={this.onHillCipherClick} primary type="submit">
                Cipher
              </Button>
              <Form.Field style={{ paddingTop: 10 }}>
                <Input value={this.state.hillResult} fluid />
              </Form.Field>
            </Form>
          </Segment>
        </div>
        <p />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Segment style={{ flex: "0.3" }} raised>
            <Header>Vigenere Cipher</Header>
            <Form>
              <Form.Field>
                <label>Clear text</label>
                <Input
                  onChange={e =>
                    this.setState({ vigenereClearText: e.target.value })
                  }
                  fluid
                  placeholder="e.g. EXAMPLETEXT"
                />
              </Form.Field>
              <Form.Field>
                <label>Key length</label>
                <Input
                  onChange={e =>
                    this.setState({ vigenereKeyLength: e.target.value })
                  }
                  fluid
                  placeholder="e.g. 2"
                />
              </Form.Field>
              <Form.Field>
                <label>Key</label>
                <Input
                  onChange={e => this.setState({ vigenereKey: e.target.value })}
                  fluid
                  placeholder="e.g. KEYTEXT"
                />
              </Form.Field>
              <Button
                onClick={this.onVigenereCipherClick}
                primary
                type="submit"
              >
                Cipher
              </Button>
              <Form.Field style={{ paddingTop: 10 }}>
                <Input value={this.state.vigenereResult} fluid />
              </Form.Field>
            </Form>
          </Segment>
        </div>
      </div>
    );
  }
}

export default App;
