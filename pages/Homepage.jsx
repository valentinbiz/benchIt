
import { Container, Content, H3, Text, Button, Image } from 'native-base';

import park from "../creativeAssets/image_processing20201103-8805-fkmj5v.png";

const HomePage = ({ navigation }) => {
  return (
    <Container>
      <Content>
        <H3 style={{ alignSelf: "center", marginTop: 8 }}> BenchIt </H3>
        <Text style={{ alignSelf: "center", marginTop: 8 }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus,
          voluptate numquam. Reiciendis reprehenderit minus rerum quibusdam odit
          pariatur quasi fugiat mollitia quas!
        </Text>
        <Image source={park} style={{ width: 300, height: 200, alignSelf: "center", marginTop: 8}} />
        <Button block style={{ alignSelf: "center", marginTop: 8 }}
            onClick={() => navigation.navigate("SignUp", { name: "Jane" })}>
            <Text>Sign up</Text>
        </Button>
        <Text style={{ alignSelf: "center", marginTop: 8 }}>or</Text>
        <Button block style={{ alignSelf: "center", marginTop: 8 }}
            onClick={() => navigation.navigate("LogIn", { name: "Jane" })}>
            <Text>Log in</Text>
        </Button>
      </Content>
    </Container>
  );
};

export default HomePage;
