import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map } from 'rxjs';

@Injectable()
export class MarkUserFavouriteProductsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    let req = context.switchToHttp().getRequest();
    const favouriteProducts = req.user.favouriteProducts.map((e) =>
      e.product._id.toString(),
    );
    return next
      .handle()
      .pipe(map((data) => this.markFavouriteProduct(favouriteProducts, data)));
  }

  private markFavouriteProduct(
    favouriteProductIds: string[],
    dataResponse: any,
  ) {
    if (dataResponse.productIds) {
      let data = dataResponse.productIds;
      for (let index in data) {
        const _id: string = data[index]._id.toString();
        if (favouriteProductIds.includes(_id)) data[index].isFavourite = true;
        else data[index].isFavourite = false;
      }
    } else {
      let data = dataResponse;
      for (let index in data) {
        const _id: string = data[index]._id.toString();
        if (favouriteProductIds.includes(_id)) data[index].isFavourite = true;
        else data[index].isFavourite = false;
      }
    }
    return dataResponse;
  }
}
