import { Injectable } from '@nestjs/common';
import { UpdateAddressDTO } from './dto/update-address.dto';
import { extend } from 'lodash';

@Injectable()
export class MeService {
  async updateAddress(userDoc: any, updateAddressDto: UpdateAddressDTO) {
    extend(userDoc, updateAddressDto);
    await userDoc.save();
  }
}
