interface UserCategoryType {
    retaurant: string;
    category: number;
}

interface UserType {
    _id: string;
    name: string;
    email: string;
    userCategories: UserCategoryType[];
    password?: string;
    createdAt: Date;
    updatedAt: Date;
}

export type { UserType };
