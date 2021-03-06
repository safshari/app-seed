import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { EnplugService } from '../services/enplug.service';
import { Asset } from '@enplug/dashboard-sdk';


@Injectable()
export class AssetResolver implements Resolve<Asset<any>> {

  constructor(private enplug: EnplugService) { }

  resolve(route: ActivatedRouteSnapshot) {
    return new Promise<Asset<any>>((resolve, reject) => {
      const assetId = route.params.id;
      if (assetId) {
        this.enplug.account.getAssets<any>().then(assets => {
          const foundAsset = assets.find( ({Id}) => Id === assetId);
          if (foundAsset) {
            resolve(foundAsset);
          } else {
            reject(null);
          }
        }, error => {
          reject(error);
        });
      }
    });
  }
}
