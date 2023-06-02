import { Pipe, PipeTransform } from "@angular/core";
@Pipe({
    name:'relaceComma'
})
export class PipeRecomma implements PipeTransform{
   transform(value: string):string{
       if(!!value){
        return value.replace(/,/g, '.');
       }else{
        return '';
       }
   }
}