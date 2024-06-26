import { useState } from "react";
import { Button, ButtonSmall, Dialog, Loading } from "~/components";
import {
  Card,
  IconAndText,
  Actions
} from "./RegistrationCard.styles";
import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineTrash,
} from "react-icons/hi";
import { RegistrationCardProps, DialogData } from "./RegistrationCard.types";
import useUpdateRegistration from "~/hooks/useUpdateRegistration";
import useDeleteRegistration from "~/hooks/useDeleteRegistration";
import { RegistrationStatus } from "~/types/enums";
import { useNotification } from "~/hooks/useNotification";


const RegistrationCard = ({ data }: RegistrationCardProps) => {
  const { employeeName, email, admissionDate, id, status: dataStatus } = data;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogData, setDialogData] = useState<DialogData>({ title: '', message: '', status: '' });

  const { notify } = useNotification();

  const DELETE_STATUS = 'DELETE';

  const actions: Record<string, string> = {
    [RegistrationStatus.Review]: 'revisar novamente',
    [RegistrationStatus.Approved]: 'aprovar',
    [RegistrationStatus.Reproved]: 'reprovar',
    [DELETE_STATUS]: 'excluir'
  }

  const { title, message, status } = dialogData;

  const { mutate: updateMutate, isPending: updateLoading } = useUpdateRegistration();
  const { mutate: deleteMutate, isPending: deleteLoading } = useDeleteRegistration();

  const handleDialog = (status: string) => {
    setDialogData({
      title: actions[status].toUpperCase(),
      message: `Você tem certeza que deseja ${actions[status]} esta inscrição?`,
      status
    })
    setIsDialogOpen(true);
  }

  const handleUpdateStatus = () => {
    setIsDialogOpen(false);

    updateMutate({ ...data, status: dialogData.status }, {
      onSuccess: () => {
        notify(`Solicitação para ${actions[dialogData.status]} finalizada com sucesso`, 'success');
      },
      onError: () => {
        notify(`Erro ao ${actions[dialogData.status]} a inscrição`, 'error');
      }
    });
  };

  const handleDeleteRegistration = () => {
    setIsDialogOpen(false);

    deleteMutate(id,
      {
        onSuccess: () => {
          notify('Inscrição excluída com sucesso', 'success');
        },
        onError: () => {
          notify('Erro ao excluir a inscrição', 'error');
        }
      }
    );
  };

  return (
    <>
      {(updateLoading || deleteLoading) && <Loading />}

      <Card>
        <IconAndText>
          <HiOutlineUser />
          <h3>{employeeName}</h3>
        </IconAndText>

        <IconAndText>
          <HiOutlineMail />
          <p>{email}</p>
        </IconAndText>

        <IconAndText>
          <HiOutlineCalendar />
          <span>{admissionDate}</span>
        </IconAndText>

        <Actions>
          {dataStatus === RegistrationStatus.Review && (
            <>
              <ButtonSmall bgcolor="rgb(255, 145, 154)" onClick={() => handleDialog(RegistrationStatus.Reproved)}>Reprovar</ButtonSmall>

              <ButtonSmall bgcolor="rgb(155, 229, 155)" onClick={() => handleDialog(RegistrationStatus.Approved)}>Aprovar</ButtonSmall>
            </>
          )}

          {dataStatus !== RegistrationStatus.Review && <ButtonSmall data-testid="revisar-novamente" bgcolor="#ff8858" onClick={() => handleDialog(RegistrationStatus.Review)}>Revisar novamente</ButtonSmall>}

          <HiOutlineTrash data-testid="trash-icon" onClick={() => handleDialog(DELETE_STATUS)} />
        </Actions>
      </Card>

      <Dialog title={title} isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <p>{message}</p>
        {status !== DELETE_STATUS
          ? <Button onClick={handleUpdateStatus}>Confirmar</Button>
          : <Button onClick={handleDeleteRegistration}>Excluir</Button>
        }
      </Dialog>
    </>
  );
};

export default RegistrationCard;
