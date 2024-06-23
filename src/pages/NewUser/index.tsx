import TextField from "~/components/TextField";
import { Container, Card } from "./NewUser.styles";
import { HiOutlineArrowLeft } from "react-icons/hi";
import Button, { IconButton } from "~/components/Buttons";
import { useHistory } from "react-router-dom";
import routes from "~/router/routes";
import { useForm, SubmitHandler } from "react-hook-form";
import { validateCPF, maskCPF } from "~/utils/cpf-utils";
import useAddRegistration from "~/hooks/useAddRegistration";
import { RegistrationStatus } from "~/types/enums";
import { RegistrationFormPayload } from "~/types/types";

const NewUserPage = () => {
  const history = useHistory();
  const mutation = useAddRegistration();

  const goToHome = () => {
    history.push(routes.dashboard);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<RegistrationFormPayload>();


  const handleCPFChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const maskedCPF = maskCPF(event.target.value);
    setValue('cpf', maskedCPF, { shouldValidate: true });
  };

  const onSubmit: SubmitHandler<RegistrationFormPayload> = (data) => {
    const formatedData = {
      ...data,
      cpf: data.cpf.replace(/[.-]/g, ''),
      admissionDate: new Date(data.admissionDate).toLocaleDateString('pt-BR'),
      status: RegistrationStatus.Review,
    }

    mutation.mutate(formatedData);

    if (mutation.isSuccess) goToHome();
    if (mutation.isError) alert('Erro ao cadastrar usuário');
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <IconButton onClick={() => goToHome()} aria-label="back">
            <HiOutlineArrowLeft size={24} />
          </IconButton>

          <TextField
            id="employeeName"
            placeholder="Nome"
            label="Nome"
            error={errors.employeeName?.message}
            {...register("employeeName", {
              required: "Campo obrigatório",
              minLength: { value: 2, message: 'Nome deve conter pelo menos 2 letras' },
              validate: {
                hasSpace: value => /\s/.test(value) || 'Nome deve conter pelo menos um espaço',
                noStartingNumber: value => !/^\d/.test(value) || 'Nome não pode começar com um número',
              },
            })}
          />

          <TextField
            id="email"
            placeholder="E-mail"
            label="E-mail"
            type="email"
            error={errors.email?.message}
            {...register("email", {
              required: "Campo obrigatório",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: 'E-mail inválido',
              },
            })}
          />

          <TextField
            id="cpf"
            placeholder="CPF"
            label="CPF"
            error={errors.cpf?.message}
            {...register("cpf", {
              required: "Campo obrigatório",
              validate: value => validateCPF(value) || 'CPF inválido',
              onChange: handleCPFChange,
            })}
          />

          <TextField
            id="admissionDate"
            label="Data de admissão"
            type="date"
            pattern="\d{2}-\d{2}-\d{4}"
            error={errors.admissionDate?.message}
            {...register("admissionDate", {
              required: "Campo obrigatório",
              validate: {
                validDate: value => !isNaN(Date.parse(value)) || 'Data de admissão inválida',
              },
            })}
          />

          <Button type="submit">Cadastrar</Button>
        </Card>
      </form>
    </Container>
  );
};

export default NewUserPage;
