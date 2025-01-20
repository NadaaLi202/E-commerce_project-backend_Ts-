import refactorService from "../refactor.service";
import { Coupons } from "./coupon.interface";
import couponSchema from "./coupon.schema";



class CouponsService {


  getAllCoupons =  refactorService.getAll<Coupons>(couponSchema);
  addCoupon = refactorService.createOne<Coupons>(couponSchema);
  getCouponById = refactorService.getOneById<Coupons>(couponSchema);
  updateCoupon = refactorService.updateOne<Coupons>(couponSchema);
  deleteCoupon = refactorService.deleteOne<Coupons>(couponSchema);
}

const couponsService = new CouponsService();

export default couponsService;