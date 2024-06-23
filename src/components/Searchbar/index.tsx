import { HiRefresh } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import Button, { IconButton } from "~/components/Buttons";
import TextField from "~/components/TextField";
import routes from "~/router/routes";
import {
  Container,
  Actions,
} from "./Searchbar.styles";
import { useState } from "react";
import { maskCPF, validateCPF } from "~/utils/cpf-utils";
import { useQueryClient } from "@tanstack/react-query";
import { SearchBarProps, InputData } from "./Searchbar.types";

const MAX_FORMATED_CPF_LENGTH = 14;

export const SearchBar = ({ handleSearch }: SearchBarProps) => {
  const [inputData, setInputValue] = useState<InputData>({ value: '', error: '' });
  const history = useHistory();
  const queryClient = useQueryClient()


  const goToNewAdmissionPage = () => {
    history.push(routes.newUser);
  };

  const handleChage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = event.target.value;

    setInputValue({
      ...inputData,
      value: maskCPF(searchText)
    });

    if (!validateCPF(searchText) && searchText.length < MAX_FORMATED_CPF_LENGTH && searchText.length !== 0) return

    // if (!validateCPF(searchText) && searchText.length === MAX_FORMATED_CPF_LENGTH) {
    //   setInputValue({
    //     ...inputData,
    //     error: 'CPF inválido'
    //   });

    //   return
    // };

    handleSearch(searchText);
  }

  const refetch = () => {
    queryClient.invalidateQueries({ queryKey: ['registrations'] });
  }

  return (
    <Container>
      <TextField placeholder="Digite um CPF válido" onChange={handleChage} value={inputData.value} maxLength={MAX_FORMATED_CPF_LENGTH} />
      <Actions>
        <IconButton aria-label="refetch" onClick={refetch}>
          <HiRefresh />
        </IconButton>
        <Button onClick={() => goToNewAdmissionPage()}>Nova Admissão</Button>
      </Actions>
    </Container>
  );
};
