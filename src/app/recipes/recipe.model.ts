export class Recipe {
    constructor(
        public id:string,
        public userId:string,
        public title:string,
        public description:string,
        public imageUrl:string,
        public ingredients:string[],
        public cookingTime:number,
        public isFavourite:boolean
    ){}
}