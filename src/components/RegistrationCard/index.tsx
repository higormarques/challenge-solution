import { ButtonSmall } from "~/components/Buttons";
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
import { RegistrationCardProps } from "./RegistrationCard.types";

const RegistrationCard = (props: RegistrationCardProps) => {
  return (
    <Card>
      <IconAndText>
        <HiOutlineUser />
        <h3>{props.data.employeeName}</h3>
      </IconAndText>

      <IconAndText>
        <HiOutlineMail />
        <p>{props.data.email}</p>
      </IconAndText>

      <IconAndText>
        <HiOutlineCalendar />
        <span>{props.data.admissionDate}</span>
      </IconAndText>

      <Actions>
        <ButtonSmall bgcolor="rgb(255, 145, 154)" >Reprovar</ButtonSmall>
        <ButtonSmall bgcolor="rgb(155, 229, 155)">Aprovar</ButtonSmall>
        <ButtonSmall bgcolor="#ff8858">Revisar novamente</ButtonSmall>

        <HiOutlineTrash />
      </Actions>
    </Card>
  );
};

export default RegistrationCard;
