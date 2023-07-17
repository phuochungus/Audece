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
    const favouriteProducts = req.user.favouriteProducts.map((e) => {
      return e.product._id.toString();
    });

    return next
      .handle()
      .pipe(map((data) => this.markFavouriteProduct(favouriteProducts, data)));
  }

  private markFavouriteProduct(
    favouriteProductIds: string[],
    dataResponse: any,
  ) {
    if (dataResponse.constructor === Array) {
      for (let index in dataResponse)
        this.checkAndMarkFavourite(dataResponse[index], favouriteProductIds);
    } else {
      this.checkAndMarkFavourite(dataResponse, favouriteProductIds);
    }
    return dataResponse;
  }

  private checkAndMarkFavourite(productItem: any, favouriteProductIds: any[]) {
    const _id: string = productItem._id.toString();
    if (favouriteProductIds.includes(_id)) productItem.isFavourite = true;
    else productItem.isFavourite = false;
  }
}
