import { FormGroup } from "@angular/forms";

export class GenericGlobalValidator{
    constructor(private validationMessages:{[key:string]:{[key:string]:string}}){} 
   
    public createErrorMessages(container:FormGroup,isFormSubmitted?:boolean):{[key:string]:string}{
        //constante qui contient les erreurs a retouner
        const errorMessages={}; 
        for(const controlName in container.controls){
            //verifie si la cle prise par la boucle for est dans notre formulaire
            if(container.controls.hasOwnProperty(controlName)){
                //sauvegarde du control dans une variable
                const selectedControl =  container.controls[controlName]

                //verifie si dans l'ensemble des erreur trouver il y'a le controlName
                if(this.validationMessages[controlName]){
                    //on reinitialise errorMessage pour n'afficher que l'erreur courante
                    //todo errorMessages[controlName]= '';

                    //se rassure que le message s'affiche quand l'utilisateur essaie d'entrer un element
                    //(si le champ a ete toucher et si il contient des erreurs)
                    if((selectedControl.dirty || selectedControl.touched || isFormSubmitted ) && selectedControl.errors){
                       //parcourir l'ensemble des erreur trouver et le afficher
                       Object.keys(selectedControl.errors).map((errorMessageKey:string)=>{

                        //on verifie si la cle et le message d'erreur vont de pair
                        if(this.validationMessages[controlName][errorMessageKey]){
                           //todo errorMessages[controlName] += this.validationMessages[controlName][errorMessageKey]+ ' ';
                        }
                       })
                    }
                }
            }
        }
      return errorMessages;
    }

    public getErrorsLength(container: FormGroup): number {
        let errorLength = 0;
        for (const controlKey in container.controls) {
          if (container.controls.hasOwnProperty(controlKey)) {
            if (container.controls[controlKey].errors) {
             //errorLength += Object.keys(container.controls[controlKey].errors).length;
              console.log(errorLength);
            }
          }
        }
        return errorLength;
      }
}
