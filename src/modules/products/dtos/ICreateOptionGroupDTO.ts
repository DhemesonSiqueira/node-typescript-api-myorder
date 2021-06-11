export default interface ICreateOptionGroupDTO {
  restaurant_id: string;
  name: string;
  description: string;
  required: boolean;
  max_quantity: number;
  min_quantity: number;
  product_id: string;
}
