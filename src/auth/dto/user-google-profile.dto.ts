import ThirdPartyDTO from './transform-imp';
import FullUpdateUserDto from 'src/users/dto/update-user.dto';

export default class UserGoogleProfileDTO extends ThirdPartyDTO {
  name: string;
  picture: string;
  email: string;

  constructor(dto: any) {
    super();
    this.name = dto.name;
    this.picture = dto.picture;
    this.email = dto.email;
  }

  toCreateUserDTO(): {
    email: string;
    name: string;
    imageURL: string;
  } {
    return {
      email: this.email,
      name: this.name,
      imageURL: this.picture,
    };
  }

  makeCreateUserDto(): FullUpdateUserDto {
    let dto = new FullUpdateUserDto();
    dto.email = this.email;
    dto.fullname = this.name;
    dto.imageURL = this.picture;
    return dto;
  }
}
