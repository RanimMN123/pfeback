// dto/createorder.dto.ts
export class CreateOrderDto {
  clientId: number;  // Assurez-vous que clientId existe
  items: { productId: number, quantity: number }[];  // Assurez-vous que `items` est bien formé

  // Exemple de validation via class-validator (facultatif mais utile)
}
