import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthentificationService } from './authentification.service';
import { ChargementService } from './chargement.service';
import { StorageService } from './stockage.service';

@Injectable({
  providedIn: 'root'
})
export class DonneesStockerService{

  public enteteAccueil="Forodokotoro";
  public enteteMarche="Marché";
  public enteteAgriculture="Agriculture";
  public enteteTransporteur="Transporteurs"

  public showMenu = new BehaviorSubject<boolean>(false);
  public showMenu$ = this.showMenu.asObservable();

//utiliser pour mettre à jour les données de l'entete en fonction des pages
  public headerTitle = new BehaviorSubject<any>(null);
  public headerTitle$ = this.headerTitle.asObservable();

  //Les données de champ de l'user Actuel en fonction des differentes redirections
  public lesChampsDeLuserActuel = new BehaviorSubject<any>(null);
  public lesChampsDeLuserActuel$ = this.lesChampsDeLuserActuel.asObservable();

  //index champ actuel
  public indexChampActuel = new BehaviorSubject<any>(null);
  public indexChampActuel$ = this.indexChampActuel.asObservable();

  
  //detail de cultive actuel
  public detailCultive = new BehaviorSubject<any>([]);
  public detailCultive$ = this.detailCultive.asObservable();


  
  //le role de l'user
  public rolesUser = new BehaviorSubject<any>(null);
  public rolesUser$ = this.rolesUser.asObservable();


  
  //le role de l'user
  public nombreDeNotificationNonLu = new BehaviorSubject<any>(null);
  public nombreDeNotificationNonLu$ = this.nombreDeNotificationNonLu.asObservable();


  
  //le role de l'user
  public photoProfil = new BehaviorSubject<any>(null);
  public photoProfil$ = this.photoProfil.asObservable();

  pageActuel = "FORODOKOTORO";

  currentUrl= "";
  resultatFermetureCompte: any;
 

  getpageActuel(){
    return this.pageActuel;
  }

  setpageActuel(valeur:string){
     this.pageActuel = valeur;
  }

  getCurrentUrl(){
    return this.currentUrl;
  }


  setCurrentUrl(valeur:string){
     this.currentUrl = valeur;
  }



  public reccupererTitreAccueil(){
    this.headerTitle.next("FORODOKOTORO");
  }
  public reccupererTitreAgriculture(){
    this.headerTitle.next("AGRICULTURE");
  }
  public reccupererTitreMarche(){
    this.headerTitle.next("MARCHE");
  }
  public reccupererTitreTransporteur(){
    this.headerTitle.next("TRANSPORTS");
  }
  public reccupererTitreCommaute(){
    this.headerTitle.next("CONSEILS");
  }


  
  
 

  constructor(private userService: AuthentificationService, private chargementService: ChargementService, private storageService : StorageService,private router : Router,
    ) {
      this.photoProfil.next(this.storageService.getUser().photo);

     }




    //fermerture de compte d'un utilisateur
  fermerUnCompte(currentUserId:any){
    Swal.fire({
      text: 'Etes vous sûr de fermer votre compte',
      showDenyButton: true,
      // showCancelButton: true,
      confirmButtonText: 'Fermer',
      denyButtonText: `Annuler`, 
      heightAuto:false,
      position:'center'
    }).then((result) => {
      if (result.isConfirmed) {  
        const user = {
          "etat":false,
          "sesouvenir":false
        }

        this.chargementService.presentLoading();

        this.userService.modifierProfilUtilisateur(currentUserId, user).subscribe(value =>{
          this.resultatFermetureCompte = value;

          this.chargementService.dismissLoading();

          localStorage.clear();
          this.storageService.clean();
          this.router.navigateByUrl("/bienvenue"); 
        })
      } 
    })
  }


}
