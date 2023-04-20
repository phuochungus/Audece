import UpdateUserDto from 'src/users/dto/update-user.dto';
import ThirdPartyDTO from './transform-imp';

type dto = {
  id: string;
  name: string;
  picture: Picture;
  email: string;
  birthday: string;
  gender: string;
  last_name: string;
  first_name: string;
};

export default class UserFacebookProfileDTO extends ThirdPartyDTO {
  name: string;
  picture: Picture;
  email: string;
  birthday: string;
  gender: string;

  constructor(user: dto) {
    super();
    this.name = user.name;
    this.picture = user.picture;
    this.email = user.email;
    this.birthday = user.birthday;
    this.gender = user.gender;
  }

  makeCreateUserDto(): UpdateUserDto {
    let dto = new UpdateUserDto();
    dto.birth = new Date(this.birthday);
    dto.email = this.email;
    dto.fullname = this.name;
    dto.imageURL = this.picture.data.url;
    return dto;
  }
}

export interface Picture {
  data: Data;
}

export interface Data {
  height: number;
  is_silhouette: boolean;
  url: string;
  width: number;
}
