// import { Container, Header, Content, Footer, FooterTab, Button, Icon, Typography, Box, Grid, Link, Checkbox, FormControlLabel, TextField, TextArea, Avatar} from 'native-base'
import { Container, Content, Form, Item, Input, Label, Button, Text, H3, CheckBox } from 'native-base';


const LogIn = () => {

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

return (
<Container>
  <Content>
    <H3 style={{ alignSelf: "center", marginTop: 8 }}>Sign In</H3>
    <Form>
      <Item floatingLabel>
        <Label>Email</Label>
        <Input autoCompleteType='email' autoFocus={true} />
      </Item>
      <Item floatingLabel last>
        <Label>Password</Label>
        <Input secureTextEntry={true} />
      </Item>
      <CheckBox style={{ marginTop: 10 }} checked={true} color='primary' />
      <Text style={{ alignSelf: "center", marginTop: 10 }}>Remember me</Text>
      <Button block style={{ marginTop: 20 }}>
        <Text>Sign In</Text>
      </Button>
      <Button transparent style={{ alignSelf: "center", marginTop: 20 }}>
        <Text>Forgot password?</Text>
      </Button>
      <Button transparent style={{ alignSelf: "center", marginTop: 20 }}>
        <Text>Don't have an account? Sign Up</Text>
      </Button>
    </Form>
  </Content>
</Container>
)

  }
export default LogIn;
