import TextField from "~/components/TextField";
import {
  Container,
  Card
} from "./NewUser.styles";
import { HiOutlineArrowLeft } from "react-icons/hi";
import Button, { IconButton } from "~/components/Buttons";
import { useHistory } from "react-router-dom";
import routes from "~/router/routes";

const NewUserPage = () => {
  const history = useHistory();
  const goToHome = () => {
    history.push(routes.dashboard);
  };

  return (
    <Container>
      <Card>
        <IconButton onClick={() => goToHome()} aria-label="back">
          <HiOutlineArrowLeft size={24} />
        </IconButton>
        <TextField placeholder="Nome" label="Nome" />
        <TextField placeholder="Email" label="Email" type="email" />
        <TextField placeholder="CPF" label="CPF" />
        <TextField label="Data de admissão" type="date" />
        <Button onClick={() => { }}>Cadastrar</Button>
      </Card>
    </Container>
  );
};

export default NewUserPage;
