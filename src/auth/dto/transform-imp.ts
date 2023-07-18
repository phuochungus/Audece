import { CreateUserDto } from 'src/users/dto/create-user.dto';
import FullUpdateUserDto from 'src/users/dto/update-user.dto';

export default abstract class ThirdPartyDTO {
  abstract email: string;
  abstract makeCreateUserDto(): FullUpdateUserDto;
}
