import { useState } from "react";
import Button, { ButtonSmall } from "~/components/Buttons";
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
import Dialog from "~/components/Dialog";
import useUpdateRegistration from "~/hooks/useUpdateRegistration";
import useDeleteRegistration from "~/hooks/useDeleteRegistration";
import { RegistrationStatus } from "~/types/enums";


const RegistrationCard = ({ data }: RegistrationCardProps) => {
  const { employeeName, email, admissionDate, id } = data;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogData, setDialogData] = useState<DialogData>({ title: '', message: '', status: '' });

  const actions: Record<string, string> = {
    [RegistrationStatus.Review]: 'revisar novamente',
    [RegistrationStatus.Approved]: 'aprovar',
    [RegistrationStatus.Reproved]: 'reprovar',
  }

  const { title, message } = dialogData;

  const updateMutation = useUpdateRegistration();
  const deleteMutation = useDeleteRegistration();

  const handleDialog = (status: string) => {
    setDialogData({
      title: actions[status].toUpperCase(),
      message: `Você tem certeza que deseja ${actions[status]} esta inscrição?`,
      status
    })
    setIsDialogOpen(true);
  }

  const handleUpdateStatus = () => {
    updateMutation.mutate({ ...data, status: dialogData.status });
  };

  const handleDeleteRegistration = () => {
    deleteMutation.mutate(id);
  };

  return (
    <>
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
          <ButtonSmall bgcolor="rgb(255, 145, 154)" onClick={() => handleDialog(RegistrationStatus.Reproved)}>Reprovar</ButtonSmall>
          <ButtonSmall bgcolor="rgb(155, 229, 155)" onClick={() => handleDialog(RegistrationStatus.Approved)}>Aprovar</ButtonSmall>
          {data.status !== 'REVIEW' && <ButtonSmall bgcolor="#ff8858" onClick={() => handleDialog(RegistrationStatus.Review)}>Revisar novamente</ButtonSmall>}

          <HiOutlineTrash onClick={handleDeleteRegistration} />
        </Actions>
      </Card>

      <Dialog title={title} isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <p>{message}</p>
        <Button onClick={handleUpdateStatus}>Confirmar</Button>
      </Dialog>
    </>
  );
};

export default RegistrationCard;
