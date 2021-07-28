export interface MealIngredient {
  ingredient_name: string
  amount: number
  kcal: number
}

export interface Meal {
  id: number
  name: string
  type: string
  kcal: number
  ingredients: MealIngredient[]
}
